import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
    >
      <rect x="1" y="1" width="30" height="30" rx="9" fill="currentColor" />
      <rect
        x="9.2"
        y="9.2"
        width="13.6"
        height="13.6"
        rx="1.5"
        transform="rotate(45 16 16)"
        stroke="white"
        strokeOpacity="0.95"
        strokeWidth="1.3"
      />
      <circle cx="16" cy="16" r="2.1" fill="white" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark className="h-7 w-7 text-ink-900" />
      <span className="leading-none">
        <span className="block font-serif text-[17px] font-semibold tracking-tight text-ink-900">
          Ayah <span className="text-sand-600">&</span> Hadith
        </span>
        <span className="mt-0.5 block font-bangla text-[10px] tracking-wide text-ink-400">
          আয়াহ ও হাদিস
        </span>
      </span>
    </span>
  );
}
