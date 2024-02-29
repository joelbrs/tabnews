export interface PostDTOOut {
  id: string
  title: string
  description: string
  created_at: Date
  updated_at: Date
  creator_id: string
  tabcoins: number
  font: string | null
}
