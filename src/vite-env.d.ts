/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAKE_WEBHOOK_URL: string;
  readonly VITE_REST_API_URL: string;
  // Ajoutez vos autres variables ici...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
