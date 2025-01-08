import { get } from '@/http.ts'
import type { Chat } from './chatTypes.ts'

export function new_session(callback: (chat: Chat) => void): void {
  get<Chat>('/chats/new_session').then((chat) => {
    callback(chat)
  })
}

export function del_session(session_id: string, callback?: (chat: Chat) => void): void {
  get<Chat>('/chats/del_session', { session_id: session_id }).then((chat) => {
    callback?.(chat)
  })
}

export function get_session(session_id: string, callback: (chat: Chat) => void): void {
  get<Chat>('/chats/get_session', { session_id: session_id }).then((chat) => {
    callback(chat)
  })
}

export function list_session(callback: (chats: [Chat]) => void): void {
  get<[Chat]>('/chats/list_session').then((chats) => {
    callback(chats)
  })
}

// export function ask(session_id: string,content: string,callback: (chat: Chat) => void): void {
//   stream<Chat>('/chats/ask',{}).then((chat) => {
//   })
// }
