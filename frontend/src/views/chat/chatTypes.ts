export interface Message {
  role: string,
  content: string,
  refusal?: string,
  audio?: string,
  function_call?: string,
  tool_calls?: string
  timestamp?: string,
}

export interface User {
  username: string
  nickname: string
}

export interface Chat {
  'created_at': string,
  'updated_at': string,
  'user_id': number,
  'title': string,
  'session_id': string,
  'message': string,
  'id': number
}
