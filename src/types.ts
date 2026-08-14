export type SubItem = { label: string; badge?: string; path?: string }
export type NavItem = {
  label: string
  path: string
  mega?: {
    featured?: { title: string; desc: string; cta: string; ctaPath: string }
    columns: { heading: string; items: SubItem[] }[]
  }
}
export type ChatMessage = {
  id: number
  role: 'bot' | 'user'
  text: string
  suggestions?: string[]
  showDoctors?: boolean
  dept?: string
}
export type HospitalData = { name: string; dept: string; fee1st: string; feeRe: string; rxDrug: string; waitMin: number; rating: number; badge?: string }
