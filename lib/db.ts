import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function getEventByCode(code : string)
{
    const supabase = createClient(cookies());    
    return supabase.from('events').select('*').eq('code', code).single();
}