/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_WS_BASE_URL: string;
  // 其他环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
