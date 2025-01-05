import { get, post } from '@/http.ts';

export const fetchGPTResponse = async (input: string) => {
  const response = await get('/gpt/ask', { content: input });
  return response;
};
