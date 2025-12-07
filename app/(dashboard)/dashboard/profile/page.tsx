"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";

type UserProfile = {
  id: string;
  email: string | null;
  name: string | null;
  avatar: string | null;
};

export default function ProfilePage() {
  const router = useRouter();
  const toast = useToast();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const AVATARS_BUCKET = useMemo(
    () => process.env.NEXT_PUBLIC_SUPABASE_AVATARS_BUCKET || "avatars",
    [],
  );

  // Lấy thông tin user hiện tại
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/auth/user");

        if (res.status === 401) {
          router.push("/login?redirect=/dashboard/profile");
          return;
        }

        if (!res.ok) {
          throw new Error("Không thể tải thông tin người dùng");
        }

        const data: UserProfile = await res.json();

        setUser(data);
        setDisplayName(data.name ?? "");
        setAvatarUrl(data.avatar ?? "");
      } catch (err) {
        console.error(err);
        toast.error({
          title: "Lỗi",
          description: "Không thể tải hồ sơ. Vui lòng thử lại sau.",
        });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router, toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/auth/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          display_name: displayName,
          avatar_url: avatarUrl || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Cập nhật hồ sơ thất bại");
      }

      const updated: UserProfile = await res.json();
      setUser(updated);

      toast.success({
        title: "Đã lưu",
        description: "Hồ sơ của bạn đã được cập nhật.",
      });
    } catch (err: any) {
      console.error(err);
      toast.error({
        title: "Lỗi",
        description:
          err?.message || "Có lỗi xảy ra khi lưu hồ sơ. Vui lòng thử lại.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      toast.error({ title: "Tệp không hợp lệ", description: "Vui lòng chọn ảnh." });
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error({ title: "Ảnh quá lớn", description: "Giới hạn 5MB." });
      e.target.value = "";
      return;
    }

    setUploading(true);
    try {
      const supabase = createSupabaseClient();
      const ext = file.name.split(".").pop() || "jpg";
      const filename = `${Date.now()}.${ext}`;
      const path = `${user.id}/${filename}`;

      const { error: uploadError } = await supabase.storage
        .from(AVATARS_BUCKET)
        .upload(path, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(AVATARS_BUCKET).getPublicUrl(path);
      if (!data?.publicUrl) throw new Error("Không thể lấy URL ảnh");

      setAvatarUrl(data.publicUrl);
      toast.success({ title: "Đã tải ảnh lên", description: "Nhấn Lưu để cập nhật hồ sơ." });
    } catch (err: any) {
      console.error(err);
      toast.error({ title: "Lỗi tải ảnh", description: err?.message || "Vui lòng thử lại." });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Đang tải hồ sơ...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Trường hợp đã redirect sang login
  }

  const avatarFallback =
    (displayName || user.email || "?").charAt(0).toUpperCase();

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-950">
      <section className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Hồ sơ cá nhân
        </h1>
        <p className="text-sm text-muted-foreground">
          Cập nhật thông tin hiển thị khi bạn tham gia sự kiện và đặt câu hỏi.
        </p>
      </div>

      <Card className="border-slate-800 bg-slate-900/90">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-14 w-14">
            {avatarUrl ? (
              <AvatarImage
                src={avatarUrl}
                alt={displayName || user.email || ""}
              />
            ) : (
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <CardTitle>{displayName || user.name || "Người dùng"}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="avatar_file">Tải ảnh đại diện</Label>
              <Input
                id="avatar_file"
                type="file"
                accept="image/*"
                onChange={handleAvatarFile}
                disabled={uploading}
              />
              <p className="text-xs text-muted-foreground">
                PNG/JPG tối đa 5MB. Ảnh sẽ tải lên Supabase Storage.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="display_name">Họ và tên / Tên hiển thị</Label>
              <Input
                id="display_name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="VD: Nguyễn Văn A"
                className="h-9 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar_url">Ảnh đại diện (URL)</Label>
              <Input
                id="avatar_url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://..."
                className="h-9 text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Có thể dán link ảnh hoặc dùng tính năng tải ảnh lên ở trên.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user.email ?? ""} disabled className="h-9 text-sm" />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="submit" disabled={saving || uploading} className="h-9">
                {saving ? "Đang lưu..." : uploading ? "Đang tải ảnh..." : "Lưu thay đổi"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      </section>
    </main>
  );
}
