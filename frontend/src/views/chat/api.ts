import { get } from '@/http.ts'

export const fetchGPTResponse = async (input: string) => {
  return await get<string>('/gpt/ask', { content: input })
}
