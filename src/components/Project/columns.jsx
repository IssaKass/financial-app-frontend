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
import { ArrowDown, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
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
    <ArrowDown
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
    cell: ({ row }) => {
      const project = row.original;
      const name = row.getValue("name");

      return (
        <Link
          to={`/projects/${project.id}`}
          state={project}
          className="font-bold hover:underline hover:underline-offset-2"
        >
          {name}
        </Link>
      );
    },
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "client",
    header: ({ column }) => <SortButton column={column}>Client</SortButton>,
    cell: ({ row }) => {
      const client = row.getValue("client");

      return <div>{client}</div>;
    },
  },
  {
    accessorKey: "budget",
    header: ({ column }) => <SortButton column={column}>Budget</SortButton>,
    cell: ({ row }) => {
      const budget = row.getValue("budget");
      return <div>{formatCurrency(budget)}</div>;
    },
    sortingFn: "numeric",
  },
  {
    accessorKey: "images",
    header: ({ column }) => <SortButton column={column}>Images</SortButton>,
    cell: ({ row }) => {
      const images = row.getValue("images");

      return <div>{images}</div>;
    },
  },
  {
    accessorKey: "animation",
    header: ({ column }) => <SortButton column={column}>Animation</SortButton>,
    cell: ({ row }) => {
      const animation = row.getValue("animation");

      return <div>{formatSeconds(animation)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortButton column={column}>Status</SortButton>,
    cell: ({ row }) => {
      const status = row.getValue("status") || PROJECT_STATUS.PENDING;

      return (
        <Badge variant="outline" size="sm">
          {status}
        </Badge>
      );
    },
    sortingFn: "sortByStatus",
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => <SortButton column={column}>Start Date</SortButton>,
    cell: ({ row }) => {
      const startDate = row.getValue("start_date");

      return <div>{formatDate(startDate)}</div>;
    },
    sortingFn: "sortByDate",
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => <SortButton column={column}>End Date</SortButton>,
    cell: ({ row }) => {
      const endDate = row.getValue("end_date");

      return <div>{formatDate(endDate)}</div>;
    },
    sortingFn: "sortByDate",
  },
  {
    id: "actions",
    cell: ({ table, row }) => {
      const meta = table.options.meta;
      const project = row.original;

      return (
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <Pencil size={16} />
              </Button>
            </DialogTrigger>
            <ProjectForm
              action={ACTION_MODE.EDIT}
              onSubmit={(data) => meta?.editRow(data)}
              initialData={project}
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
                <AlertDialogAction
                  onClick={() => meta?.deleteRow(project.id)}
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
