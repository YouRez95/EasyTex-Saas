import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Tabs defaultValue={theme} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="light" onClick={() => setTheme("light")}>
          <SunIcon size={16} />
        </TabsTrigger>
        <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
          <MoonIcon size={16} className="" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
