import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ACTION_MODE } from "@/utils/constants";
import { formatCurrency, formatDate } from "@/utils/format";
import { useState } from "react";
import { Button } from "../ui/button";
import SubscriptionForm from "./SubscriptionForm";

import { ArrowDown, Check, Pencil, Trash2, X } from "lucide-react";
const SortButton = ({ column, children }) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    <span className="me-4">{children}</span>
    <ArrowDown
      size={16}
      className={`transition-transform ${
        column.getIsSorted() === "asc"
          ? "-rotate-180"
          : column.getIsSorted() === "desc"
            ? "rotate-0"
            : "invisible"
      } `}
    />
  </Button>
);

export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortButton column={column}>Name</SortButton>,
    cell: ({ row }) => <div className="font-bold">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "website",
    header: ({ column }) => <SortButton column={column}>Website</SortButton>,
    cell: ({ row }) => {
      const website = row.getValue("website");

      return (
        <Button variant="link">
          <a href={website} target="_blank">
            {website}
          </a>
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => <SortButton column={column}>Price</SortButton>,
    cell: ({ row }) => {
      const price = row.getValue("price");
      return <div>{formatCurrency(price)}</div>;
    },
    sortingFn: "numeric",
  },
  {
    accessorKey: "active",
    header: ({ column }) => <SortButton column={column}>Is Active</SortButton>,
    cell: ({ row }) => {
      const active = row.getValue("active");

      return (
        <div>
          {active ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </div>
      );
    },
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => <SortButton column={column}>Start Date</SortButton>,
    cell: ({ row }) => {
      if (!row.getValue("start_date")) {
        return "-";
      }
      return <div>{formatDate(row.getValue("start_date"))}</div>;
    },
    sortingFn: "sortByDate",
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => <SortButton column={column}>End Date</SortButton>,
    cell: ({ row }) => {
      if (!row.getValue("end_date")) {
        return "-";
      }
      return <div>{formatDate(row.getValue("end_date"))}</div>;
    },
    sortingFn: "sortByDate",
  },
  {
    id: "actions",
    cell: ({ table, row }) => {
      const meta = table.options.meta;
      const subscription = row.original;
      const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

      return (
        <div className="flex items-center gap-2">
          <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <Pencil size={16} />
              </Button>
            </DialogTrigger>
            <SubscriptionForm
              action={ACTION_MODE.EDIT}
              onEdit={(data) => meta?.editRow(data)}
              afterSubmit={() => setIsFormDialogOpen(false)}
              initialData={subscription}
            />
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <Trash2 size={16} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent
              onPointerDownOutside={(event) => event.preventDefault()}
            >
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete the subscription{" "}
                  <q>{subscription.name}</q>?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Deleting the subscription will
                  permanently remove it from the system.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => meta?.deleteRow(subscription.id)}
                  variant="destructive"
                >
                  Yes, Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
