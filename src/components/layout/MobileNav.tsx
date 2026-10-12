"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Compass, HandHeart, Heart, Home, Library } from "lucide-react";
import { useT } from "@/hooks/useT";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", key: "nav_home", icon: Home },
  { href: "/quran", key: "nav_quran", icon: BookOpen },
  { href: "/hadith", key: "nav_hadith", icon: Library },
  { href: "/dua", key: "nav_dua", icon: HandHeart },
  { href: "/explore", key: "nav_explore", icon: Compass },
  { href: "/favorites", key: "nav_favorites", icon: Heart },
] as const;

export function MobileNav() {
  const pathname = usePathname();
  const { t } = useT();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-100 bg-white/95 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition",
                active ? "text-ink-900" : "text-ink-400",
              )}
            >
              <Icon className={cn("h-5 w-5", active && "text-sand-600")} />
              {t(item.key)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
