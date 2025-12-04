import { createClient } from "@/lib/supabase/server";
import { request } from "https";
import {revalidatePath} from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
    const supabase = createClient();
    await supabase.auth.signOut();
    revalidatePath("/");
    NextResponse.json({ message: "Đăng xuất thành công" });
    return NextResponse.redirect(new URL("/", request.url));
}