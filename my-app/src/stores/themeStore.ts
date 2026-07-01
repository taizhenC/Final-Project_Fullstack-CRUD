import { create } from 'zustand'

type ThemeMode = 'light' | 'dark'

type ThemeStore = {
  theme: ThemeMode
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light',
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
}))