import { redirect } from 'next/navigation'

export const paginationGuard = (page: number, lastPage: number, type: string, subType?: string) => {
  const params = new URLSearchParams()

  // Set type and subType parameters if they are provided
  if (type) {
    params.set('type', type)
  }

  if (subType) {
    params.set('subType', subType)
  }

  // Check if the current page exceeds the last page
  if (Number(page) > lastPage) {
    params.set('page', String(lastPage))
    const url = `products?${params.toString()}`
    redirect(url)
  }

  // Check if the current page is less than or equal to zero
  if (Number(page) <= 0) {
    params.set('page', '1')
    const url = `products?${params.toString()}`
    redirect(url)
  }
}
