import { PhotocardEditor } from "@/components/photocard/PhotocardEditor";

export default async function CreatePage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string }>;
}) {
  const params = await searchParams;
  return <PhotocardEditor initialTemplateId={params.template} />;
}
