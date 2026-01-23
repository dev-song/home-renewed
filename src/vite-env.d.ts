/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_DESCRIPTION: string;
  readonly VITE_APP_URL: string;
  readonly VITE_DEV_EMAIL: string;
  readonly VITE_DEV_GITHUB_URL: string;
  readonly VITE_DEV_LINKEDIN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
