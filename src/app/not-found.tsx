import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="label">404</p>
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink-900">
        Page not found
      </h1>
      <p className="max-w-md text-sm text-ink-500">
        The page you are looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className="btn-primary">
        Back home
      </Link>
    </div>
  );
}
