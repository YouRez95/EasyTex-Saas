import { FileText } from "lucide-react";

export default function CreateFileTrigger() {
  return (
    <div className="space-y-3 border rounded-md p-3 w-full  relative hover:shadow hover:bg-muted cursor-pointer">
      <span className="absolute top-2 right-2">+</span>
      <div className="bg-primary w-fit p-1 rounded-lg">
        <FileText className="w-6 h-6 text-secondary font-thin" />
      </div>
      <p className="font-medium text-lg text-left">New file</p>
    </div>
  );
}
