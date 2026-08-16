const API_BASE_URL = "http://localhost:8080"

export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}${url}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`)
  }

  return res.json() as Promise<T>
}
