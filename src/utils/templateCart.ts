const STORAGE_KEY = 'veltrix-template-cart'

export type CartTemplate = {
  categoryId: string
  templateId: string
  name: string
}

export function getTemplateCart(): CartTemplate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as CartTemplate[]) : []
  } catch {
    return []
  }
}

export function isTemplateInCart(categoryId: string, templateId: string): boolean {
  return getTemplateCart().some((t) => t.categoryId === categoryId && t.templateId === templateId)
}

export function addTemplateToCart(item: CartTemplate): boolean {
  try {
    const list = getTemplateCart()
    if (list.some((t) => t.categoryId === item.categoryId && t.templateId === item.templateId)) {
      return false
    }
    list.push(item)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    return true
  } catch {
    return false
  }
}
