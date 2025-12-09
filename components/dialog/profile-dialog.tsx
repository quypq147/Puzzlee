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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export type ProfileDialogSection = "general" | "email" | "sessions";

export function ProfileDialogTrigger({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <ProfileDialog onClose={() => setOpen(false)} />
    </Dialog>
  );
}

export function ProfileDialog({ onClose }: { onClose?: () => void }) {
  const [section, setSection] = React.useState<ProfileDialogSection>("general");

  // Form state (you can prefill from user profile)
  const [name, setName] = React.useState("Your Name");
  const [email, setEmail] = React.useState("you@example.com");
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [language, setLanguage] = React.useState("en");

  const handleSave = () => {
    // TODO: Persist via Supabase or server action
    onClose?.();
  };

  return (
    <DialogContent className="sm:max-w-4xl">
      <DialogHeader>
        <DialogTitle>My profile</DialogTitle>
        <DialogDescription>Manage your personal information and preferences.</DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left nav */}
        <aside className="md:col-span-1">
          <div className="rounded-md border bg-slate-50">
            <NavItem active={section === "general"} onClick={() => setSection("general")}>General</NavItem>
            <NavItem active={section === "email"} onClick={() => setSection("email")}>Email preferences</NavItem>
            <NavItem active={section === "sessions"} onClick={() => setSection("sessions")}>Active sessions</NavItem>
          </div>
        </aside>

        {/* Right content */}
        <section className="md:col-span-2">
          {section === "general" && (
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="profile-info">
                <AccordionTrigger>Profile info</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="language">
                <AccordionTrigger>Language</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">App language</label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="vi">Tiếng Việt</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="avatar">
                <AccordionTrigger>Customize your avatar</AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={avatarUrl} />
                      <AvatarFallback>{initials(name)}</AvatarFallback>
                    </Avatar>
                    <Input
                      placeholder="https://... (image URL)"
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="privacy">
                <AccordionTrigger>Privacy preferences</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-slate-600">Choose what cookies can be used by the app. (Coming soon)</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="password">
                <AccordionTrigger>Change password</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-slate-600">You are logged in with single sign-on. Password can’t be changed here.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          {section === "email" && (
            <div className="text-sm text-slate-600">Email preferences coming soon.</div>
          )}

          {section === "sessions" && (
            <div className="text-sm text-slate-600">List of active sessions coming soon.</div>
          )}
        </section>
      </div>

      <DialogFooter>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
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
        "w-full text-left px-4 py-3 text-sm border-b last:border-b-0 hover:bg-slate-100 rounded-md first:rounded-b-none last:rounded-t-none " +
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
