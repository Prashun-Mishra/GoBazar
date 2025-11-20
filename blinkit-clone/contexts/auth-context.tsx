"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User as UserType } from "@/types"

// Define a more permissive type for the auth context
interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: string;
  // Make other required fields optional
  addresses?: any[];
  createdAt?: string | Date;
}

interface AuthContextType {
  user: AuthUser | null
  sendOTP: (email: string) => Promise<{ success: boolean; message: string }>
  verifyOTP: (email: string, code: string) => Promise<{
    success: boolean;
    message: string;
    user?: AuthUser;
    token?: string;
    requiresRegistration?: boolean;
  }>
  register: (name: string, email: string, phone: string) => Promise<{
    success: boolean;
    message: string;
    user?: AuthUser;
    token?: string;
  }>
  logout: () => void
  isLoading: boolean
  isLoginModalOpen: boolean
  openLoginModal: () => void
  closeLoginModal: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const openLoginModal = () => setIsLoginModalOpen(true)
  const closeLoginModal = () => setIsLoginModalOpen(false)

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem("user")
    const savedToken = localStorage.getItem("auth-token")

    if (savedUser && savedToken) {
      try {
        const parsedUser = JSON.parse(savedUser)
        // Ensure the user has required fields
        if (parsedUser?.id && parsedUser?.email) {
          setUser({
            id: parsedUser.id,
            name: parsedUser.name || '',
            email: parsedUser.email,
            phone: parsedUser.phone || null,
            role: parsedUser.role || 'user',
            addresses: parsedUser.addresses || [],
            createdAt: parsedUser.createdAt || new Date().toISOString()
          })
          document.cookie = `auth-token=${savedToken}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax` // 7 days
        } else {
          console.error('Invalid user data in localStorage')
          localStorage.removeItem("user")
          localStorage.removeItem("auth-token")
        }
      } catch (error) {
        console.error("Failed to load user from localStorage:", error)
        localStorage.removeItem("user")
        localStorage.removeItem("auth-token")
      }
    }
    setIsLoading(false)
  }, [])

  const sendOTP = async (email: string): Promise<{ success: boolean; message: string }> => {
    console.log('[AuthContext] Sending OTP to:', email);
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.json();
      console.log('[AuthContext] Send OTP response:', { status: response.status, responseData });

      if (response.ok) {
        console.log('[AuthContext] OTP sent successfully to:', email);
        return {
          success: true,
          message: responseData.message || "OTP sent successfully"
        };
      }

      const errorMessage = responseData.error || responseData.message || "Failed to send OTP";
      console.error(`[AuthContext] Failed to send OTP: ${errorMessage}`);
      return {
        success: false,
        message: errorMessage
      };
    } catch (error) {
      console.error("[AuthContext] Send OTP failed:", error);
      return {
        success: false,
        message: "Network error. Please check your connection and try again."
      };
    } finally {
      setIsLoading(false);
    }
  }

  const verifyOTP = async (
    email: string,
    code: string
  ): Promise<{
    success: boolean;
    message: string;
    user?: AuthUser;
    token?: string;
    requiresRegistration?: boolean;
  }> => {
    console.log('[AuthContext] Verifying OTP for email:', email);
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const responseData = await response.json();
      console.log('[AuthContext] Verify OTP response:', {
        status: response.status,
        responseData
      });

      if (response.ok) {
        // Backend wraps response in { success, message, data: { token, user } }
        const { data, message } = responseData;

        if (data?.requiresRegistration) {
          console.log('[AuthContext] User needs to complete registration');
          return {
            success: true,
            message: message || "Please complete registration",
            requiresRegistration: true
          };
        }

        // Backend returns token and user inside data object
        if (data?.token && data?.user) {
          console.log('[AuthContext] OTP verification successful, logging in user:', data.user?.email);
          console.log('[AuthContext] User role from backend:', data.user?.role);

          // Sanitize user data before storing
          const userData: AuthUser = {
            id: data.user.id,
            name: data.user.name || '',
            email: data.user.email,
            phone: data.user.phone || null,
            role: data.user.role || 'USER',
            addresses: data.user.addresses || [],
            createdAt: data.user.createdAt || new Date().toISOString()
          };

          console.log('[AuthContext] Storing user data:', userData);

          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("auth-token", data.token);
          document.cookie = `auth-token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;

          console.log('[AuthContext] User stored in localStorage:', localStorage.getItem("user"));

          // Close modal on successful login
          closeLoginModal();

          return {
            success: true,
            message: message || "Login successful",
            user: userData,
            token: data.token
          };
        }
      }

      // If we get here, there was an error
      const errorMessage = responseData.error || responseData.message ||
        (response.status === 400 ? "Invalid OTP code" : "Verification failed");
      console.error(`[AuthContext] OTP verification failed: ${errorMessage}`);

      return {
        success: false,
        message: errorMessage
      };
    } catch (error) {
      console.error("[AuthContext] Verify OTP failed:", error);
      return {
        success: false,
        message: "Network error. Please check your connection and try again."
      };
    } finally {
      setIsLoading(false);
    }
  }

  const register = async (
    name: string,
    email: string,
    phone: string
  ): Promise<{
    success: boolean;
    message: string;
    user?: AuthUser;
    token?: string;
  }> => {
    console.log('[AuthContext] Registering user:', email);
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });

      const responseData = await response.json();
      console.log('[AuthContext] Register response:', { status: response.status, responseData });

      if (response.ok && responseData.data) {
        const { data, message } = responseData;
        console.log('[AuthContext] Registration successful, logging in user:', data.user?.email);

        const userData: AuthUser = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone || null,
          role: data.user.role || 'USER',
          addresses: data.user.addresses || [],
          createdAt: data.user.createdAt || new Date().toISOString()
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("auth-token", data.token);
        document.cookie = `auth-token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;

        // Close modal on successful registration
        closeLoginModal();

        return {
          success: true,
          message: message || "Registration successful",
          user: userData,
          token: data.token
        };
      }

      const errorMessage = responseData.error || responseData.message || "Registration failed";
      console.error(`[AuthContext] Registration failed: ${errorMessage}`);
      return {
        success: false,
        message: errorMessage
      };
    } catch (error) {
      console.error("[AuthContext] Register failed:", error);
      return {
        success: false,
        message: "Network error. Please check your connection and try again."
      };
    } finally {
      setIsLoading(false);
    }
  }

  const logout = () => {
    console.log('[AuthContext] Logging out user');
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("auth-token");
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    console.log('[AuthContext] User logged out successfully');
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        sendOTP,
        verifyOTP,
        register,
        logout,
        isLoading,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
