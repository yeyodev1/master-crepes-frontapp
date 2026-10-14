import { useI18n } from 'vue-i18n'
import { localizedPath, type Lang } from '@/seo'

// Keeps internal links in the current language: lp('/menu') → '/es/menu' when in Spanish
export const useLocalePath = () => {
  const { locale } = useI18n()
  const lp = (path: string) => localizedPath(path, locale.value as Lang)
  return { lp }
}
