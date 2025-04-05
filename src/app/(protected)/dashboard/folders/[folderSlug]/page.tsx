import SingleFolder from "@/components/global/single-folder";

export default async function SingleFolderPage({
  params,
}: {
  params: Promise<{
    folderSlug: string;
  }>;
}) {
  const { folderSlug } = await params;

  return (
    <div className="m-5 flex flex-col gap-10">
      <SingleFolder folderSlug={folderSlug} />
    </div>
  );
}
