import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useSectionsStore } from "../store";
import {
  RuleFormValues,
  RuleSchema,
  RuleSection,
} from "@/lib/section-types/rule";
import { zodResolver } from "@hookform/resolvers/zod";
import { textAlignOptions } from "@/lib/section-types/base";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Rule = () => {
  const { selectedSection, editSection } = useSectionsStore();
  const form = useForm<RuleFormValues>({
    resolver: zodResolver(RuleSchema),
    defaultValues: {
      ...(selectedSection as RuleSection),
    },
  });

  const onSubmit = (data: RuleFormValues) => {
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

        {selectedSection?.width && (
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
        )}

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

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};

export default Rule;
