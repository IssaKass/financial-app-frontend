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
import {
  PiArrowDownBold,
  PiCheckBold,
  PiPencilSimpleBold,
  PiTrashBold,
  PiXBold,
} from "react-icons/pi";
import { Button } from "../ui/button";
import SubscriptionForm from "./SubscriptionForm";

const SortButton = ({ column, children }) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    <span className="me-4">{children}</span>
    <PiArrowDownBold
      className={`h-4 w-4 transition-transform ${
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

      return <div>{website || "-"}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => <SortButton column={column}>Price</SortButton>,
    cell: ({ row }) => {
      const price = row.getValue("price");
      return <div>{formatCurrency(price)}</div>;
    },
  },
  {
    accessorKey: "active",
    header: ({ column }) => <SortButton column={column}>Is Active</SortButton>,
    cell: ({ row }) => {
      const active = row.getValue("active");

      return (
        <div>
          {active ? (
            <PiCheckBold className="h-4 w-4" />
          ) : (
            <PiXBold className="h-4 w-4" />
          )}
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
              <Button size="icon" variant="outline">
                <PiPencilSimpleBold />
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
              <Button size="icon" variant="outline">
                <PiTrashBold />
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
