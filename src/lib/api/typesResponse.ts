interface Folder {
  color: string;
  createdAt: Date;
  description: string;
  id: string;
  name: string;
  parentFolderId: string | null;
  slug: string;
}

interface Document {
  createdAt: Date;
  id: string;
  name: string;
}

interface FolderWithChildren extends Folder {
  children: Folder[];
  documents: Document[];
}

type GetFoldersResponse = {
  data: Folder[];
  status: "success" | "error";
  message: string;
};

type GetSingleFolderResponse = {
  data: FolderWithChildren;
  status: "success" | "error";
  message: string;
};

type CreateFolderResponse = {
  data: Folder;
  status: "success" | "error";
  message: string;
};

type CreateFileResponse = {
  data: Document;
  status: "success" | "error";
  message: string;
};

type GetFilesResponse = {
  data: Document[];
  status: "success" | "error";
  message: string;
};
