import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { login as loginAPI } from '../lib/api'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: async (email, password) => {
        try {
          const response = await loginAPI(email, password)
          const { user, token } = response
          localStorage.setItem('token', token)
          set({ user, token, isAuthenticated: true })
          return { success: true }
        } catch (error) {
          return { 
            success: false, 
            message: error.response?.data?.message || 'Login failed' 
          }
        }
      },
      
      logout: () => {
        localStorage.removeItem('token')
        set({ user: null, token: null, isAuthenticated: false })
      },
      
      setUser: (user) => set({ user }),
      
      initializeAuth: () => {
        const token = localStorage.getItem('token')
        if (token) {
          set({ token, isAuthenticated: true })
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated })
    }
  )
)
