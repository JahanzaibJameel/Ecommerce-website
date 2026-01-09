import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types'

interface SessionStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // Actions
  login: (email: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
  setLoading: (loading: boolean) => void
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email: string) => {
        set({ isLoading: true })
        
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))
          
          // Mock user data
          const mockUser: User = {
            id: 'user_123',
            email,
            name: 'John Doe',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
            isGuest: false,
          }
          
          set({ 
            user: mockUser, 
            isAuthenticated: true,
            isLoading: false 
          })
          
          // Analytics event
          window.dispatchEvent(new CustomEvent('analytics-event', {
            detail: { type: 'user_login' }
          }))
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
      
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        })
      },
      
      setUser: (user) => set({ user, isAuthenticated: true }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'session-storage',
    }
  )
)