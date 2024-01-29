import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ACTION_MODE, PROJECT_STATUS } from "../../utils/constants";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as z from "zod";

const ProjectFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Project name is required",
    })
    .trim(),
  client: z
    .string()
    .min(1, {
      message: "Client name is required",
    })
    .trim(),
  budget: z.coerce.number().positive(),
  images: z.coerce.number().nonnegative(),
  animation: z.coerce.number().nonnegative(),
  status: z.enum(Object.values(PROJECT_STATUS)),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

const ProjectForm = ({ action, onSubmit, initialData }) => {
  const isEdit = action === ACTION_MODE.EDIT;

  const form = useForm({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      name: isEdit ? initialData.name : "",
      client: isEdit ? initialData.client : "",
      budget: isEdit ? initialData.budget : 0,
      images: isEdit ? initialData.images : 0,
      animation: isEdit ? initialData.animation : 0,
      status: isEdit ? initialData.status : PROJECT_STATUS.PENDING,
      date: {
        from: isEdit ? new Date(initialData.start_date) : new Date(),
        to: isEdit ? new Date(initialData.end_date) : new Date(),
      },
    },
    mode: "onChange",
  });

  const handleSubmitForm = (data) => {
    const modifiedData = {
      name: data.name,
      client: data.client,
      budget: data.budget,
      images: data.images,
      animation: data.animation,
      status: data.status,
      start_date: new Date(data.date.from).toISOString(),
      end_date: new Date(data.date.to).toISOString(),
    };

    if (isEdit) {
      modifiedData.id = initialData.id;
    }

    form.reset();
    onSubmit(modifiedData);
  };

  return (
    <DialogContent
      className="max-w-[50rem]"
      onPointerDownOutside={(event) => event.preventDefault()}
    >
      <Form {...form}>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Project" : "Create Project"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className="mt-4 grid gap-6 sm:grid-cols-2"
        >
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project name</FormLabel>
                  <FormControl>
                    <Input {...field} autoFocus />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="animation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Animation</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(PROJECT_STATUS).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start & end date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`justify-between font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {field.value?.from ? (
                            field.value.to ? (
                              <>
                                {format(field.value.from, "LLL dd, y")} -{" "}
                                {format(field.value.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(field.value.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon size={16} />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter className="col-span-full gap-y-2">
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
              {isEdit ? "Save Changes" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default ProjectForm;
