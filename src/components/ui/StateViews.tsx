"use client";

import { AlertTriangle, Inbox, RefreshCw } from "lucide-react";
import { useT } from "@/hooks/useT";
import { Spinner } from "./Spinner";

export function LoadingState({ label }: { label?: string }) {
  const { t } = useT();
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-ink-400">
      <Spinner className="h-6 w-6 border-ink-200 border-t-ink-700" />
      <p className="text-sm">{label ?? t("loading")}</p>
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  const { t } = useT();
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl2 border border-ink-100 bg-white px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sand-100 text-sand-700">
        <AlertTriangle className="h-6 w-6" />
      </span>
      <div className="space-y-1">
        <h3 className="font-serif text-lg font-semibold text-ink-900">
          {t("error_title")}
        </h3>
        <p className="max-w-sm text-sm text-ink-500">{t("error_body")}</p>
      </div>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-secondary">
          <RefreshCw className="h-4 w-4" />
          {t("retry")}
        </button>
      )}
    </div>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl2 border border-dashed border-ink-200 bg-white/60 px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-100 text-ink-500">
        <Inbox className="h-6 w-6" />
      </span>
      <div className="space-y-1">
        <h3 className="font-serif text-lg font-semibold text-ink-900">{title}</h3>
        {body && <p className="max-w-sm text-sm text-ink-500">{body}</p>}
      </div>
      {action}
    </div>
  );
}
