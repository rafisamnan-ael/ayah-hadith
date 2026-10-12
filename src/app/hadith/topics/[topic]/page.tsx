"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useCollections, useCollection } from "@/hooks/useHadith";
import { useT } from "@/hooks/useT";
import { TOPICS, findTopic, matchHadithToTopic } from "@/data/topics";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/StateViews";
import { HadithCard } from "@/components/hadith/HadithCard";
import { Button } from "@/components/ui/Button";
import { localizeNumber } from "@/lib/utils";
import type { HadithEntry } from "@/types";

const PAGE_SIZE = 15;

export default function TopicPage() {
  const params = useParams<{ topic: string }>();
  const topicId = params?.topic ?? "";
  const topic = findTopic(topicId) ?? TOPICS[0];
  const { t, language } = useT();
  const collections = useCollections();

  const englishCollections = useMemo(
    () => (collections.data ?? []).filter((c) => c.translationLanguages.includes("en")),
    [collections.data],
  );

  const [collectionId, setCollectionId] = useState("bukhari");
  useEffect(() => {
    if (englishCollections.length === 0) return;
    if (!englishCollections.some((c) => c.id === collectionId)) {
      setCollectionId(englishCollections[0].id);
    }
  }, [englishCollections, collectionId]);

  const { data, isLoading, isError, refetch } = useCollection(collectionId, language);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const matches = useMemo(() => {
    const list = data?.hadiths ?? [];
    // Reorder only (shortest first) — never alter the narration text.
    const textLen = (h: HadithEntry) =>
      (h.arabic?.length ?? 0) +
      ((language === "bn" ? h.bangla : h.english)?.length ?? 0);
    return list
      .filter((h) => matchHadithToTopic(h.english ?? "", topic))
      .sort((a, b) => textLen(a) - textLen(b));
  }, [data, topic, language]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [collectionId, topicId]);

  const shown = matches.slice(0, visible);

  return (
    <div className="container-page py-10">
      <Link
        href="/hadith/topics"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("topics")}
      </Link>

      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label">{t("topics")}</p>
          <h1
            className={`mt-1 font-serif text-3xl font-semibold tracking-tight text-ink-900 ${
              language === "bn" ? "font-bangla" : ""
            }`}
          >
            {language === "bn" ? topic.bn : topic.en}
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-ink-500">
            {t("topic_mentioning")}:{" "}
            <span className="font-medium text-ink-600">
              {topic.keywords.join(", ")}
            </span>
          </p>
        </div>

        <label className="text-sm">
          <span className="label mr-2">{t("collections")}</span>
          <select
            value={collectionId}
            onChange={(e) => setCollectionId(e.target.value)}
            className="input mt-1 w-56"
          >
            {englishCollections.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <p className="mb-6 rounded-xl2 border border-sand-200 bg-sand-50 px-4 py-3 text-xs text-sand-800">
        {t("topic_note")}
      </p>

      {isLoading && <LoadingState />}
      {isError && <ErrorState onRetry={() => refetch()} />}

      {data && matches.length === 0 && (
        <EmptyState title={t("no_results")} body={t("try_another")} />
      )}

      <div className="space-y-4">
        {shown.map((entry) => (
          <HadithCard key={entry.id} entry={entry} showBoth />
        ))}
      </div>

      {visible < matches.length && (
        <div className="mt-6 flex justify-center">
          <Button variant="secondary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            {t("loading")} ({localizeNumber(shown.length, language)}/
            {localizeNumber(matches.length, language)})
          </Button>
        </div>
      )}
    </div>
  );
}
