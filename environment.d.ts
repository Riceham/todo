// This file is needed to support autocomplete for process.env
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // supabase db uri
      DATABASE_URL: string;
      DIRECT_URL: string;
    }
  }
}
