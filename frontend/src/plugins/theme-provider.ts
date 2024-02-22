type Theme = 'light' | 'dark' | 'auto' | 'toggle'

const root = document.querySelector('body')

export const toggleTheme = (theme: Theme) => {
  const themes = {
    light: () => {
      if (root && root?.classList.contains('dark')) {
        root.classList.remove('dark')
      }
    },
    dark: () => {
      if (root && !root?.classList.contains('dark')) {
        root.classList.add('dark')
      }
    },
    toggle: () => {
      if (root) {
        root.classList.toggle('dark')
      }
    },
    auto: () => {
      const dark = window.matchMedia('(prefers-color-scheme: dark)')

      dark.matches ? themes.dark() : themes.light()
    }
  }

  if (theme in themes) {
    themes[theme]()
    localStorage.setItem('tabnews-theme', theme)
  }
}

export const verifyThemeSystem = () => {
  const theme: string | null = localStorage.getItem('tabnews-theme')

  toggleTheme((theme as Theme) || 'system')
}
