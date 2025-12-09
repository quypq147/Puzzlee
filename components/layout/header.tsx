"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ProfileDropdown } from "@/components/profile-dropdown";

const navItems = [
  { label: "Product", href: "#product" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
  { label: "Enterprise", href: "#enterprise" },
];

type NavbarItemProps = {
  href: string;
  label: string;
};

function NavbarItem({ href, label }: NavbarItemProps) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
    >
      {label}
    </Link>
  );
}

export function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="mr-8 flex items-center gap-2 shrink-0">
          <span className="text-xl font-bold text-primary">slido</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavbarItem key={item.href} {...item} />
          ))}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-4">
          {loading ? null : user ? (
            <ProfileDropdown />
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-sm">
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
