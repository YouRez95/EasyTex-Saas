import { useForm, useFormContext } from "react-hook-form";
import { useSectionsStore } from "../store";
import {
  NormalboxFormValues,
  normalboxSchema,
  NormalboxSection,
} from "@/lib/section-types/normalBox";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormMessage,
  FormLabel,
  FormField,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ColbackBox } from "./ui/colback-box";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import {
  fontSizeOptions,
  fontStyleOptions,
  textAlignOptions,
} from "@/lib/section-types/base";
import { Textarea } from "@/components/ui/textarea";
import { ContentFormField } from "../../content-form-field";

export const NormalBox = () => {
  const { selectedSection, editSection } = useSectionsStore();

  const form = useForm<NormalboxFormValues>({
    resolver: zodResolver(normalboxSchema),
    defaultValues: {
      ...(selectedSection as NormalboxSection),
    },
  });

  const onSubmit = (data: NormalboxFormValues) => {
    console.log(data);
    if (!selectedSection) return;
    editSection({ ...selectedSection, ...data }, selectedSection.order);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="align"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Align</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select align" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {textAlignOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="space.top"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Top Space(mm)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="space.bottom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bottom Space(mm)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="my-4" />

        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h1 className="text-medium font-bold">Colback</h1>
            <p className="text-muted-foreground text-sm">
              Add a background color to your Box.
            </p>
          </div>
          <ColbackBox
            selectedSection={selectedSection as NormalboxSection}
            setColorBox={form.setValue}
            title="colback"
          />
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h1 className="text-medium font-bold">Colframe</h1>
            <p className="text-muted-foreground text-sm">
              Add a frame color to your Box.
            </p>
          </div>
          <ColbackBox
            selectedSection={selectedSection as NormalboxSection}
            setColorBox={form.setValue}
            title="colframe"
          />
        </div>

        <Separator className="my-4" />

        <FormField
          control={form.control}
          name="width"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Width(cm)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="auto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height(cm)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="auto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="textAlign"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text Align</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select align" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {textAlignOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fontSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select align" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {fontSizeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fontStyle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font Style</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select align" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {fontStyleOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <ContentFormField
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};
