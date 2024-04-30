// This file is needed to support autocomplete for process.env
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // supabase db uri
      DATABASE_URL: string;
      DIRECT_URL: string;

      // public base url
      NEXT_PUBLIC_APP_BASE_URL: string;
    }
  }
}
