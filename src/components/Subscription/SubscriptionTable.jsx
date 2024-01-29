import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { sortByDate } from "@/utils/sort";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpFromLine,
  ChevronLeft,
  ChevronRight,
  Download,
  Inbox,
  Loader,
  MoreVertical,
  Plus,
  Printer,
  RefreshCcw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubscription,
  deleteSubscription,
  fetchSubscriptions,
  updateSubscription,
} from "../../features/subscription/subscriptionActions";
import { ACTION_MODE } from "../../utils/constants";
import { Typography } from "../ui/typography";
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

  useEffect(() => {
    if (userInfo && userInfo.id) {
      dispatch(fetchSubscriptions(userInfo.id));
    }
  }, [userInfo]);

  const handleAddSubscription = async (data) => {
    try {
      data = { ...data, user_id: userInfo.id };

      await dispatch(addSubscription(data));

      dispatch(fetchSubscriptions(userInfo.id));

      toast({
        title: "Subscription added successfully",
      });
    } catch (error) {
      console.error("Error adding subscription:", error);
    }
  };

  const handleEditSubscription = async (data) => {
    try {
      data = { ...data, user_id: userInfo.id };

      await dispatch(updateSubscription(data));

      dispatch(fetchSubscriptions(userInfo.id));

      toast({
        title: "Subscription updated successfully",
      });
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };

  const handleDeleteSubscription = async (subscriptionId) => {
    try {
      await dispatch(deleteSubscription(subscriptionId));

      if (success) {
        dispatch(fetchSubscriptions(userInfo.id));

        toast({
          title: "Subscription deleted successfully!",
        });
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
    sortingFns: {
      numeric: (rowA, rowB, columnId) => {
        const numA = parseFloat(rowA.getValue(columnId));
        const numB = parseFloat(rowB.getValue(columnId));

        return numA > numB ? 1 : numA < numB ? -1 : 0;
      },
      sortByDate: (rowA, rowB, columnId) => {
        const dateA = rowA.getValue(columnId);
        const dateB = rowB.getValue(columnId);

        return sortByDate(dateA, dateB);
      },
    },
    meta: {
      editRow: (data) => {
        handleEditSubscription(data);
      },
      deleteRow: (subscriptionId) => {
        handleDeleteSubscription(subscriptionId);
      },
    },
  });

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <Typography variant="h4" component="h2">
          Subscriptions
        </Typography>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm">
              <Plus size={16} className="me-2" />
              New Subscription
            </Button>
          </DialogTrigger>
          <SubscriptionForm
            action={ACTION_MODE.ADD}
            onSubmit={handleAddSubscription}
          />
        </Dialog>
      </div>
      <Card className="overflow-hidden rounded-md">
        <Tabs defaultValue="all">
          <TabsList className="w-full justify-start rounded-none">
            <TabsTrigger
              value="all"
              className="px-4"
              onClick={() => table.getColumn("active")?.setFilterValue("")}
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="px-4"
              onClick={() => table.getColumn("active")?.setFilterValue(true)}
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="inactive"
              className="px-4"
              onClick={() => table.getColumn("active")?.setFilterValue(false)}
            >
              Inactive
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
        <CardContent className="mt-4 grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <div className="flex-1">
              <Input
                placeholder="Filter names..."
                value={table.getColumn("name")?.getFilterValue() ?? ""}
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="w-full max-w-96"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="icon"
                variant="secondary"
                disabled={loading}
                onClick={handleClick}
              >
                {!loading ? (
                  <RefreshCcw size={16} />
                ) : (
                  <Loader className="animate-spin" size={16} />
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Printer size={16} className="me-2" />
                    Print
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ArrowUpFromLine className="me-2" size={16} />
                    Import
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download size={16} className="me-2" />
                    Export
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="rounded-md border bg-background">
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
                      <TableCell colSpan={columns.length} className="p-0">
                        <div className="grid h-48 place-content-center place-items-center gap-2 bg-muted text-muted-foreground">
                          <Inbox size={48} />
                          <Typography variant="subtitle1">
                            No Subscriptions
                          </Typography>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 flex items-center justify-end gap-1">
              <div className="flex items-center gap-4">
                <Typography variant="body2" component="p">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount() || 1}
                </Typography>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Subscription;
