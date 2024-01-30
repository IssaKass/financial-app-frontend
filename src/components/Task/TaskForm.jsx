import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ACTION_MODE } from "../../utils/constants";

import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";

const TaskFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string(),
});

const TaskForm = ({ action, onSubmit, initialData, afterSubmit }) => {
  const isEdit = action === ACTION_MODE.EDIT;

  const form = useForm({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: isEdit ? initialData.title : "",
      description: isEdit ? initialData.description : "",
    },
    mode: "onChange",
  });

  const handleSubmitForm = (data) => {
    if (isEdit) {
      data.id = initialData.id;
    }

    form.reset();
    onSubmit(data);
    afterSubmit();
  };

  return (
    <Form {...form}>
      <DialogHeader>
        <DialogTitle>{isEdit ? "Edit Task" : "Create Task"}</DialogTitle>
      </DialogHeader>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="mt-4 grid gap-6"

      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} autoFocus placeholder="Task title" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Task description"
                  className="max-h-48 min-h-24"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <DialogFooter className="gap-y-2">
          <Button
            type="reset"
            onClick={form.reset}
            variant="secondary"
            size="sm"
            className="min-w-20"
          >
            Reset
          </Button>
          <Button type="submit" size="sm" className="min-w-20">
            {isEdit ? "Save" : "Add"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default TaskForm;
