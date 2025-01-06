export interface Message {
  role: string,
  content: string,
  refusal?: string,
  audio?: string,
  function_call?: string,
  tool_calls?: string
  timestamp?: number,
}

export interface User {
  username: string
  nickname: string
}
