import FileEditor from "@/components/global/FileEditor";

export default async function BuilderPage({
  params,
}: {
  params: Promise<{ folderSlugAndFileId: string[] }>;
}) {
  const { folderSlugAndFileId } = await params;
  const [folderSlug, fileId] = folderSlugAndFileId;

  console.log("folderSlug", folderSlug);
  console.log("fileId", fileId);

  return (
    <div className="h-screen overflow-hidden">
      <FileEditor folderSlug={folderSlug} fileId={fileId} />
    </div>
  );
}
