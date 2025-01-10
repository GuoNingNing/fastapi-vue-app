import type { ChatRequest } from '@/client'

export class WebSocketClient {
  public ws: WebSocket

  constructor(url: string) {
    this.ws = new WebSocket(url) // 使用浏览器原生的 WebSocket 对象
    this.ws.addEventListener('open', () => {
      console.log('Connected to server.')
    })
  }

  // 发送消息
  sendMessage(message: ChatRequest): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.ws.readyState !== WebSocket.OPEN) {
        reject('WebSocket is not open')
        return
      }
      this.ws.send(JSON.stringify(message)) // 使用原生 WebSocket 的 send 方法
      resolve()
    })
  }

  // 接收消息
  receiveMessage(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.ws.onmessage = (event) => {
        const responseText = event.data
        console.log('Received from server:', responseText)
        resolve(responseText)
      }

      this.ws.onclose = () => {
        console.log('Connection closed by server')
      }

      this.ws.onerror = (error) => {
        reject('Error receiving message: ' + error)
      }
    })
  }

  // 监听 WebSocket 连接的关闭
  close(): void {
    this.ws.close()
  }
}
