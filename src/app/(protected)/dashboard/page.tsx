import { bagel } from "../../../../fonts/fonts";
import LastFiles from "@/components/global/last-files";
import CreateFolderDialog from "@/components/global/create-folder";
import FoldersScrollable from "@/components/global/folders-scrollable";

export default function Page() {
  return (
    <section className="mt-10 flex flex-col gap-20">
      <div className="flex flex-col lg:flex-row justify-between gap-16 items-start lg:items-center px-5 lg:h-[300px]">
        {/* Manage Your Folders */}
        <div className="flex flex-col gap-6 lg:w-1/3">
          <h1
            className={`${bagel.className} text-7xl md:text-6xl xl:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-[#243949] via-[#171717] to-[#517fa4]`}
          >
            Manage Your <br /> Folders
          </h1>
          <p className="text-muted-foreground max-w-[300px]">
            Create Folders to sort files and have quick access to documents
          </p>
        </div>

        <div className="h-[200px] lg:h-full flex w-full lg:w-2/3 gap-4 overflow-hidden">
          <div
            className="border-muted-foreground w-[150px] h-full border-[1px] border-dashed 
           rounded-xl flex items-center justify-center text-6xl text-muted-foreground"
          >
            <CreateFolderDialog />
          </div>

          {/* Scrollable Content Section */}
          <div className="w-full overflow-hidden">
            <FoldersScrollable />
          </div>
        </div>
      </div>
      <div className="mx-5 rounded-lg border">
        <LastFiles />
      </div>
    </section>
  );
}
