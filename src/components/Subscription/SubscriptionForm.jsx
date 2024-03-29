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

import { Calendar as CalendarIcon } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { ACTION_MODE } from "@/utils/constants";
import { formatDate } from "@/utils/format";
import * as z from "zod";

const SubscriptionFormSchema = z.object({
	name: z
		.string()
		.min(1, {
			message: "Subscription name is required",
		})
		.trim(),
	website: z
		.string()
		.min(1, {
			message: "Subscribed website is required",
		})
		.url()
		.trim(),
	price: z.coerce.number().positive(),
	active: z.boolean().default(false).optional(),
	date: z.object({
		from: z.date(),
		to: z.date(),
	}),
});

const SubscriptionForm = ({ action, onSubmit, initialData, afterSubmit }) => {
	const isEdit = action === ACTION_MODE.EDIT;

	const form = useForm({
		resolver: zodResolver(SubscriptionFormSchema),
		defaultValues: {
			name: isEdit ? initialData.name : "",
			website: isEdit ? initialData.website : "",
			price: isEdit ? initialData.price : 0,
			active: isEdit ? initialData.active : true,
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
			website: data.website,
			price: data.price,
			active: data.active,
			start_date: new Date(data.date.from).toISOString(),
			end_date: new Date(data.date.to).toISOString(),
		};

		if (isEdit) {
			modifiedData.id = initialData.id;
		}

		form.reset();
		onSubmit(modifiedData);
		afterSubmit();
	};

	return (
		<DialogContent
			className="max-w-[50rem]"
			onPointerDownOutside={(event) => event.preventDefault()}
		>
			<Form {...form}>
				<DialogHeader>
					<DialogTitle>
						{isEdit ? "Edit Subscription" : "Create Subscription"}
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
									<FormLabel>Subscription name</FormLabel>
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
							name="website"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Website</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage className="text-xs" />
								</FormItem>
							)}
						/>
					</div>
					<div className="col-span-full">
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input {...field} type="number" />
									</FormControl>
									<FormMessage className="text-xs" />
								</FormItem>
							)}
						/>
					</div>
					<div className="col-span-full">
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel>Start & end date</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl className="w-full">
												<Button
													variant={"outline"}
													className={`justify-between font-normal
                            ${!field.value && "text-muted-foreground"}`}
												>
													{field.value?.from ? (
														field.value.to ? (
															<>
																{formatDate(field.value.from)} -{" "}
																{formatDate(field.value.to)}
															</>
														) : (
															formatDate(field.value.from)
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
					<div className="col-span-full">
						<FormField
							control={form.control}
							name="active"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>Is Active?</FormLabel>
									</div>
								</FormItem>
							)}
						/>
					</div>
					<DialogFooter className="col-span-full gap-y-2">
						<Button
							type="reset"
							variant="secondary"
							size="sm"
							className="min-w-24"
							onClick={form.reset}
						>
							Reset
						</Button>
						<Button type="submit" size="sm" className="min-w-24">
							{isEdit ? "Save" : "Add"}
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</DialogContent>
	);
};

export default SubscriptionForm;
