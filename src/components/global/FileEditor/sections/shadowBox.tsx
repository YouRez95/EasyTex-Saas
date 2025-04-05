import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  ShadowboxFormValues,
  shadowboxSchema,
  ShadowboxSection,
} from "@/lib/section-types/shadowBox";
import {
  fontSizeOptions,
  fontStyleOptions,
  Section,
  textAlignOptions,
} from "@/lib/section-types/base";
import { useSectionsStore } from "../store";

const ShadowBox = () => {
  const { selectedSection, editSections } = useSectionsStore();
  const form = useForm<ShadowboxFormValues>({
    resolver: zodResolver(shadowboxSchema),
    defaultValues: {
      ...(selectedSection as ShadowboxSection),
    },
  });

  const onSubmit = (data: ShadowboxFormValues) => {
    if (!selectedSection) return;
    editSections({ ...selectedSection, ...data }, selectedSection.order);
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

        <FormField
          control={form.control}
          name="width"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Width(cm)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter content" {...field} />
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
                <Input type="number" placeholder="Enter content" {...field} />
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

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input type="color" placeholder="Enter content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
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
        />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};

export default ShadowBox;
