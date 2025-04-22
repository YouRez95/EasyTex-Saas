import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";
import Link from "next/link";

interface AllFilesProps {
  folderId: string;
  folders: Folder[];
  files: Document[];
  folderSlug: string;
}

export default function AllFiles({
  folderId,
  files,
  folders,
  folderSlug,
}: AllFilesProps) {
  // WIP: Add the loading for the pending state
  // WIP: Add the error handling
  // WIP: Add the empty folder case

  return (
    <Table className="px-2">
      <TableCaption>A list of your recent updated files.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>File Name</TableHead>
          <TableHead>Last Modified</TableHead>
          <TableHead className="hidden md:block">Size</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files &&
          files.map((file) => (
            <TableRow className="h-12" key={file.id}>
              <TableCell className="font-medium">
                <Link href={`/builder/${folderSlug}/${file.id}`}>
                  {file.name}
                </Link>
              </TableCell>
              <TableCell>
                {formatDistance(file.createdAt, new Date(), {
                  addSuffix: true,
                })}
              </TableCell>
              <TableCell className="hidden md:block">2 MB</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
