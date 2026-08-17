const API_BASE_URL = "http://localhost:8080"

export const fetcher = async <T>(
  url: string,
  method?: "GET" | "POST",
  body?: Record<string, unknown>
): Promise<T> => {
  const options: RequestInit = {}

  if (method) {
    options.method = method
  }

  if (body) {
    options.body = JSON.stringify(body)
    options.headers = { "Content-Type": "application/json" }
  }

  const res = await fetch(`${API_BASE_URL}${url}`, options)

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`)
  }

  return res.json() as Promise<T>
}
