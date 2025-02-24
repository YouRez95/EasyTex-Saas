import { Plus } from "lucide-react";
import { bagel } from "../../../../fonts/fonts";

export default function Page() {
  return (
    <section className="mt-10">
      <div className="flex justify-between gap-20 items-center px-5 h-[300px]">
        {/* Manage Your Folders */}
        <div className="flex flex-col gap-6 w-1/3">
          <h1
            className={`${bagel.className} text-7xl bg-clip-text text-transparent bg-gradient-to-b from-[#243949] via-[#171717] to-[#517fa4]`}
          >
            Manage Your <br /> Folders
          </h1>
          <p className="text-muted-foreground max-w-[300px]">
            Create Folders to sort files and have quick access to documents
          </p>
        </div>

        <div className="h-full flex w-2/3 gap-4 overflow-hidden">
          <div className="border-muted-foreground h-full border-[1px] border-dashed px-16 rounded-xl flex items-center justify-center text-6xl text-muted-foreground">
            <Plus size={30} />
          </div>

          {/* Scrollable Content Section */}
          <div className="w-full overflow-hidden">
            <div className="flex gap-4 h-full overflow-x-scroll scrollbar-hide">
              <div className="h-full bg-primary rounded-xl w-[250px] flex-shrink-0"></div>
              <div className="h-full bg-primary rounded-xl w-[250px] flex-shrink-0"></div>
              <div className="h-full bg-primary rounded-xl w-[250px] flex-shrink-0"></div>
              <div className="h-full bg-primary rounded-xl w-[250px] flex-shrink-0"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
