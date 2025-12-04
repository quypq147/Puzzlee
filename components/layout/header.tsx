"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // dùng hàm cn bạn đã có

const navItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Tính năng", href: "#features" },
  { label: "Hướng dẫn", href: "#how-it-works" },
];

type NavbarItemProps = {
  href: string;
  label: string;
};

function NavbarItem({ href, label }: NavbarItemProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
        isActive && "text-foreground"
      )}
    >
      {label}
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center px-4">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Puzzlee
          <span className="ml-1 text-xs font-normal text-muted-foreground">
            Q&A
          </span>
        </Link>

        {/* Nav */}
        <nav className="ml-10 hidden space-x-6 md:flex">
          {navItems.map((item) => (
            <NavbarItem key={item.href} {...item} />
          ))}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
