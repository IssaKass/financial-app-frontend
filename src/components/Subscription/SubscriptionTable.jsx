import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import {
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
  PiCaretDownBold,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiSpinnerBold,
} from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubscription,
  deleteSubscription,
  fetchSubscriptions,
  updateSubscription,
} from "../../features/subscription/subscriptionActions";
import { ACTION_MODE } from "../../utils/constants";
import SubscriptionForm from "./SubscriptionForm";
import { columns } from "./columns";

const Subscription = () => {
  const dispatch = useDispatch();
  const {
    data: subscriptions,
    loading,
    success,
  } = useSelector((state) => state.subscriptions);
  const { userInfo } = useSelector((state) => state.auth);

  const handleClick = () => {
    if (userInfo && userInfo.id) {
      dispatch(fetchSubscriptions(userInfo.id));
    }
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (userInfo && userInfo.id) {
      dispatch(fetchSubscriptions(userInfo.id));
    }
  }, [userInfo]);

  const handleAddSubscription = async (data) => {
    try {
      data = { ...data, user_id: userInfo.id };

      setOpen(false);
      await dispatch(addSubscription(data));

      dispatch(fetchSubscriptions(userInfo.id));
    } catch (error) {
      console.error("Error adding subscription:", error);
    }
  };

  const handleEditSubscription = async (data) => {
    try {
      data = { ...data, user_id: userInfo.id };

      await dispatch(updateSubscription(data));

      dispatch(fetchSubscriptions(userInfo.id));
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };

  const handleDeleteSubscription = async (subscriptionId) => {
    try {
      await dispatch(deleteSubscription(subscriptionId));

      if (success) {
        dispatch(fetchSubscriptions(userInfo.id));
      }
    } catch (error) {
      console.error("Error deleting subscription:", error);
    }
  };

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data: subscriptions,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters,
    },
    meta: {
      editRow: (data) => {
        handleEditSubscription(data);
      },
      deleteRow: (subscriptionId) => {
        handleDeleteSubscription(subscriptionId);
      }
    },
  });

  return (
    <Card className="grid gap-4 rounded-md p-4">
      <div className="flex flex-col items-end gap-2 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:max-w-[24rem]">
          <Input
            placeholder="Filter names..."
            value={table.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            size="sm"
            disabled={loading}
            onClick={handleClick}
          >
            {loading && <PiSpinnerBold className="me-2 h-4 w-4 animate-spin" />}
            <span>{loading ? "Syncing..." : "Refresh"}</span>
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <Button size="sm">Add</Button>
            </DialogTrigger>
            <SubscriptionForm
              action={ACTION_MODE.ADD}
              onAdd={handleAddSubscription}
            />
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" size="sm">
                Export as
                <PiCaretDownBold className="ms-3 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>CSV</DropdownMenuItem>
              <DropdownMenuItem>PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            {/* <TableBody>
          {projects.map((project, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>{project.client}</TableCell>
              <TableCell>{formatCurrency(project.budget)}</TableCell>
              <TableCell>{project.images}</TableCell>
              <TableCell>{formatSeconds(project.animation)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    project.status === PROJECT_STATUS.PENDING
                      ? "destructive"
                      : project.status === PROJECT_STATUS.PROGRESS
                        ? "warning"
                        : "success"
                  }
                >
                  {project.status}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(project.start_date)}</TableCell>
              <TableCell>{formatDate(project.end_date)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <PiPencilSimpleBold />
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      onPointerDownOutside={(event) => event.preventDefault()}
                    >
                      <ProjectForm
                        action={ACTION_MODE.EDIT}
                        onEdit={handleEditProject}
                        data={project}
                      />
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="icon" variant="ghost">
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
                          This action cannot be undone. Deleting the project
                          will permanently remove it from the system.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            handleDeleteProject(project.id);
                          }}
                        >
                          Yes, Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody> */}
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end gap-2 py-4">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <PiCaretDoubleLeftBold />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <PiCaretLeftBold />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <PiCaretRightBold />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <PiCaretDoubleRightBold />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Subscription;
