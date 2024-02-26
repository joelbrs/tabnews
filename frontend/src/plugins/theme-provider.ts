export type Theme = 'light' | 'dark' | 'auto' | 'toggle'

const root = document.querySelector('body')

export const toggleTheme = (theme: Theme) => {
  const themes = {
    light: () => {
      if (root && root?.classList.contains('dark')) {
        root.classList.remove('dark')
      }
      return 'light'
    },
    dark: () => {
      if (root && !root?.classList.contains('dark')) {
        root.classList.add('dark')
      }
      return 'dark'
    },
    toggle: () => {
      if (root) {
        root.classList.toggle('dark')
      }
      return 'toggle'
    },
    auto: () => {
      const dark = window.matchMedia('(prefers-color-scheme: dark)')

      dark.matches ? themes.dark() : themes.light()

      return 'auto'
    }
  }

  if (theme in themes) {
    const themeSetted = themes[theme]()
    localStorage.setItem('tabnews-theme', themeSetted)
  }
  return theme
}

export const verifyThemeSystem = () => {
  const theme: string | null = localStorage.getItem('tabnews-theme')

  return toggleTheme((theme as Theme) || 'auto')
}
