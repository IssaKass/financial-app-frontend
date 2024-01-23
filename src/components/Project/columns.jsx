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
import { ACTION_MODE, PROJECT_STATUS } from "@/utils/constants";
import { formatCurrency, formatDate, formatSeconds } from "@/utils/format";
import { useState } from "react";
import {
  PiArrowDownBold,
  PiPencilSimpleBold,
  PiTrashBold,
} from "react-icons/pi";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import ProjectForm from "./ProjectForm";

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
    accessorKey: "client",
    header: ({ column }) => <SortButton column={column}>Client</SortButton>,
    cell: ({ row }) => {
      const client = row.getValue("client");

      return <div>{client || "-"}</div>;
    },
  },
  {
    accessorKey: "budget",
    header: ({ column }) => <SortButton column={column}>Budget</SortButton>,
    cell: ({ row }) => {
      const budget = row.getValue("budget");
      return <div>{formatCurrency(budget)}</div>;
    },
  },
  {
    accessorKey: "images",
    header: ({ column }) => <SortButton column={column}>Images</SortButton>,
    cell: ({ row }) => {
      const images = row.getValue("images");

      return <div>{images || "-"}</div>;
    },
  },
  {
    accessorKey: "animation",
    header: ({ column }) => <SortButton column={column}>Animation</SortButton>,
    cell: ({ row }) => {
      const animation = row.getValue("animation");

      if (!animation) {
        return "-";
      }

      return <div>{formatSeconds(animation)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortButton column={column}>Status</SortButton>,
    cell: ({ row }) => {
      const status = row.getValue("status") || PROJECT_STATUS.PENDING;
      return (
        <Badge
          variant={
            status === PROJECT_STATUS.PENDING
              ? "destructive"
              : status === PROJECT_STATUS.PROGRESS
                ? "warning"
                : "success"
          }
        >
          {status}
        </Badge>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const order = [
        PROJECT_STATUS.PENDING,
        PROJECT_STATUS.PROGRESS,
        PROJECT_STATUS.FINISHED,
      ];

      const statusA = rowA.getValue(columnId);
      const statusB = rowB.getValue(columnId);

      return order.indexOf(statusA) - order.indexOf(statusB);
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
    accessorKey: "end_date",
    header: ({ column }) => <SortButton column={column}>End Date</SortButton>,
    cell: ({ row }) => {
      if (!row.getValue("end_date")) {
        return "-";
      }
      return <div>{formatDate(row.getValue("end_date"))}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ table, row }) => {
      const meta = table.options.meta;
      const project = row.original;
      const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

      return (
        <div className="flex items-center gap-2">
          <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
            <DialogTrigger asChild>
              <Button size="icon" variant="outline">
                <PiPencilSimpleBold />
              </Button>
            </DialogTrigger>
            <ProjectForm
              action={ACTION_MODE.EDIT}
              onEdit={(data) => meta?.editRow(data)}
              afterSubmit={() => setIsFormDialogOpen(false)}
              initialData={project}
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
                  Are you sure you want to delete the project{" "}
                  <q>{project.name}</q>?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Deleting the project will
                  permanently remove it from the system.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => meta?.deleteRow(project.id)}>
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
