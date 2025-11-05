"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { OTPInput } from "@/components/ui/otp-input"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"
import { Loader2, Mail, ArrowLeft } from "lucide-react"

interface EmailOTPLoginProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export function EmailOTPLogin({ onSuccess, onCancel }: EmailOTPLoginProps) {
  const [step, setStep] = useState<'email' | 'otp' | 'details'>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isNewUser, setIsNewUser] = useState(false)
  const [countdown, setCountdown] = useState(0)
  
  const { sendOTP, verifyOTP, register, isLoading } = useAuth()

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    const result = await sendOTP(email)
    
    if (result.success) {
      toast.success(result.message)
      setStep('otp')
      setCountdown(60) // 60 second countdown
    } else {
      toast.error(result.message)
    }
  }

  const [isVerifying, setIsVerifying] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (otp.length !== 6) {
      toast.error('Please enter the complete 6-digit OTP')
      return
    }

    setIsVerifying(true)
    
    try {
      console.log('[EmailOTPLogin] Verifying OTP...')
      const result = await verifyOTP(email, otp)
      console.log('[EmailOTPLogin] OTP verification result:', result)
      
      if (result.success) {
        if (result.requiresRegistration) {
          console.log('[EmailOTPLogin] New user - showing registration form')
          toast.success('OTP verified! Please complete registration.')
          setStep('details')
        } else {
          console.log('[EmailOTPLogin] OTP verification successful - user logged in')
          toast.success('Login successful!')
          onSuccess?.()
        }
      } else {
        console.error('[EmailOTPLogin] OTP verification failed:', result.message)
        toast.error(result.message || 'Failed to verify OTP. Please try again.')
        setOtp('')
      }
      
    } catch (error) {
      console.error('[EmailOTPLogin] Error during OTP verification:', error)
      toast.error('An error occurred. Please try again.')
      setOtp('')
    } finally {
      setIsVerifying(false)
    }
  }

  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      toast.error('Please enter your name')
      return
    }

    if (!phone.trim()) {
      toast.error('Please enter your phone number')
      return
    }

    setIsRegistering(true)
    
    try {
      console.log('[EmailOTPLogin] Starting user registration...')
      
      const result = await register(name.trim(), email, phone.trim())
      console.log('[EmailOTPLogin] Registration result:', result)
      
      if (result.success) {
        console.log('[EmailOTPLogin] Registration successful')
        toast.success('Welcome to GoBazar!')
        onSuccess?.()
      } else {
        console.error('[EmailOTPLogin] Registration failed:', result.message)
        toast.error(result.message || 'Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('[EmailOTPLogin] Error during registration:', error)
      toast.error('An error occurred during registration. Please try again.')
    } finally {
      setIsRegistering(false)
    }
  }

  const handleResendOTP = async () => {
    if (countdown > 0) return
    
    const result = await sendOTP(email)
    
    if (result.success) {
      toast.success('OTP sent again')
      setCountdown(60)
      setOtp('')
    } else {
      toast.error(result.message)
    }
  }

  const handleBack = () => {
    if (step === 'otp') {
      setStep('email')
      setOtp('')
    } else if (step === 'details') {
      setStep('otp')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-primary/10 rounded-full">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">
          {step === 'email' && 'Sign in to GoBazar'}
          {step === 'otp' && 'Enter OTP'}
          {step === 'details' && 'Complete Your Profile'}
        </h2>
        <p className="text-gray-600">
          {step === 'email' && 'Enter your email to get started'}
          {step === 'otp' && `We've sent a 6-digit code to ${email}`}
          {step === 'details' && 'Just a few more details to get started'}
        </p>
      </div>

      {/* Email Step */}
      {step === 'email' && (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="h-12"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12" 
            disabled={isLoading || !email}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending OTP...
              </>
            ) : (
              'Send OTP'
            )}
          </Button>
        </form>
      )}

      {/* OTP Step */}
      {step === 'otp' && (
        <form onSubmit={handleVerifyOTP} className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-gray-600">Back to email</span>
          </div>

          <div className="space-y-4">
            <Label className="text-center block">Enter 6-digit OTP</Label>
            <OTPInput
              length={6}
              value={otp}
              onChange={setOtp}
              disabled={isLoading}
            />
          </div>

          <div className="text-center space-y-2">
            <Button 
              type="submit" 
              className="w-full h-12" 
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify OTP'
              )}
            </Button>

            <div className="text-sm text-gray-600">
              Didn't receive the code?{' '}
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={countdown > 0 || isLoading}
                className="text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* User Details Step */}
      {step === 'details' && (
        <form onSubmit={handleCompleteRegistration} className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-gray-600">Back to OTP</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isLoading}
                className="h-12"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12" 
            disabled={isLoading || !name.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Complete Registration'
            )}
          </Button>
        </form>
      )}

      {/* Cancel Button */}
      {onCancel && (
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="w-full"
          disabled={isLoading}
        >
          Cancel
        </Button>
      )}
    </div>
  )
}
