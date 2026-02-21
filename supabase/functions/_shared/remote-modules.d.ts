declare module "https://esm.sh/@supabase/supabase-js@2" {
  export function createClient(url: string, key: string): any;
}

declare module "https://deno.land/x/denomailer@1.6.0/mod.ts" {
  export class SMTPClient {
    constructor(config: unknown);
    send(message: unknown): Promise<void>;
    close(): Promise<void>;
  }
}

