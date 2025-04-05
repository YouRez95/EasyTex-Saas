import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  NormalboxFormValues,
  NormalboxSection,
} from "@/lib/section-types/normalBox";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

type ColbackType = "single" | "mixte";

type ColbackBoxProps = {
  setColorBox: UseFormSetValue<NormalboxFormValues>;
  selectedSection: NormalboxSection;
  title: "colback" | "colframe";
};

export const ColbackBox = ({
  setColorBox,
  selectedSection,
  title,
}: ColbackBoxProps) => {
  const colData = selectedSection[title];

  const colColor = colData.color || "#ffffff!100!#ffffff";
  const [firstColor, percentage, secondColor] = colColor.split("!");

  const [activeTab, setActiveTab] = useState<ColbackType>(colData.type);
  const [color, setColor] = useState(
    colData.type === "single" ? colData.color : "#ffffff"
  );

  const [primaryColor, setPrimaryColor] = useState(
    colData.type === "mixte" ? firstColor : "#ffffff"
  );

  const [secondaryColor, setSecondaryColor] = useState(
    colData.type === "mixte" ? secondColor : "#ffffff"
  );

  const [primaryColorPercentage, setPrimaryColorPercentage] = useState(
    colData.type === "mixte" ? Number(percentage) : 100
  );

  const computedColor =
    activeTab === "single"
      ? color
      : `${primaryColor}!${primaryColorPercentage}!${secondaryColor}`;

  useEffect(() => {
    setColorBox(title, { type: activeTab, color: computedColor });
  }, [computedColor]);

  return (
    <>
      <Tabs
        className="w-full space-y-3"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ColbackType)}
      >
        <TabsList className="mx-auto">
          <TabsTrigger value="single">Single</TabsTrigger>
          <TabsTrigger value="mixte">Mixte</TabsTrigger>
        </TabsList>
        <TabsContent value="single">
          <Label>Color:</Label>
          <Input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </TabsContent>
        <TabsContent value="mixte" className="space-y-4">
          <div className="space-y-2">
            <Label>Primary color:</Label>
            <Input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>(%) Primary color:</Label>
            <Input
              type="number"
              value={primaryColorPercentage}
              onChange={(e) => setPrimaryColorPercentage(+e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Secondary color:</Label>
            <Input
              type="color"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
            />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};
