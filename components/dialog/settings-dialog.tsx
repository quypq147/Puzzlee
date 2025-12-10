"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type Section = "profile" | "language" | "privacy";

export function SettingsDialogTrigger({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <SettingsDialog onClose={() => setOpen(false)} />
    </Dialog>
  );
}

export function SettingsDialog({ onClose }: { onClose?: () => void }) {
  const [section, setSection] = React.useState<Section>("profile");
  const [name, setName] = React.useState<string>("Alex Johnson");
  const [avatarUrl, setAvatarUrl] = React.useState<string>("");

  const onSave = () => {
    // TODO: Wire up persistence (Supabase or server action)
    onClose?.();
  };

  return (
    <DialogContent className="sm:max-w-3xl">
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
        <DialogDescription>Manage your profile and preferences.</DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left navigation */}
        <aside className="md:col-span-1 border rounded-md bg-slate-50">
          <nav className="flex md:flex-col">
            <NavItem active={section === "profile"} onClick={() => setSection("profile")}>Profile</NavItem>
            <NavItem active={section === "language"} onClick={() => setSection("language")}>Language</NavItem>
            <NavItem active={section === "privacy"} onClick={() => setSection("privacy")}>Privacy</NavItem>
          </nav>
        </aside>

        {/* Right content */}
        <section className="md:col-span-2">
          {section === "profile" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Avatar</label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>{initials(name)}</AvatarFallback>
                  </Avatar>
                  <Input
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://... (image URL)"
                  />
                </div>
              </div>
            </div>
          )}

          {section === "language" && (
            <div className="text-sm text-slate-600">Language settings coming soon.</div>
          )}

          {section === "privacy" && (
            <div className="text-sm text-slate-600">Privacy preferences coming soon.</div>
          )}
        </section>
      </div>

      <DialogFooter className="gap-2">
        <Button variant="ghost" onClick={onClose}>Huỷ</Button>
        <Button onClick={onSave}>Lưu thay đổi</Button>
      </DialogFooter>
    </DialogContent>
  );
}

function NavItem({ active, onClick, children }: { active?: boolean; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex-1 md:flex-none px-4 py-3 text-sm border-b md:border-b-0 md:border-r hover:bg-slate-100 " +
        (active ? "bg-slate-100 font-medium" : "bg-white")
      }
    >
      {children}
    </button>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("") || "U";
}
