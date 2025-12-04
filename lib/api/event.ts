import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function getEventById(id: string) {
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Lỗi khi truy vấn event theo id:", error);
    return null;
  }

  return data;
}
