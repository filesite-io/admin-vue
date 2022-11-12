import defaultSettings from '@/settings'

const title = defaultSettings.title || '嘉洛马'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
      return `${title} - ${pageTitle}`
  }
  return `${title}`
}
