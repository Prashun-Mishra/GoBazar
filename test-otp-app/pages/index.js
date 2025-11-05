import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE = 'http://localhost:5000/api';

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      showMessage('Please enter your email', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      
      if (data.success) {
        setStep(2);
        showMessage('OTP sent successfully!');
      } else {
        showMessage(data.message || 'Failed to send OTP', 'error');
      }
    } catch (error) {
      showMessage('Network error. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      showMessage('Please enter a valid 6-digit OTP', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otp })
      });
      const data = await response.json();
      
      if (data.success) {
        setStep(3);
        showMessage('Login successful!');
      } else {
        showMessage(data.message || 'Invalid OTP', 'error');
      }
    } catch (error) {
      showMessage('Network error. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setOtp('');
    setStep(1);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>🔐 OTP Authentication</h1>
        
        {message.text && (
          <div className={`${styles.message} ${message.type === 'error' ? styles.error : ''}`}>
            {message.text}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleSendOTP} className={styles.form}>
            <h2>Enter Your Email</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className={styles.form}>
            <h2>Enter OTP</h2>
            <p>We've sent a 6-digit code to <strong>{email}</strong></p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="123456"
              maxLength={6}
              required
            />
            <div className={styles.buttonGroup}>
              <button type="button" onClick={() => setStep(1)} className={styles.secondary}>
                Back
              </button>
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className={styles.success}>
            <h2>🎉 Welcome!</h2>
            <p>You have successfully logged in as <strong>{email}</strong></p>
            <button onClick={resetForm} className={styles.secondary}>
              Logout
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
