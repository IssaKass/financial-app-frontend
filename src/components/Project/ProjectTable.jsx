import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  deleteProject,
  fetchProjects,
  updateProject,
} from "../../features/project/projectActions";
import { ACTION_MODE, PROJECT_STATUS } from "../../utils/constants";

import { Input } from "@/components/ui/input";
import { sortByDate, sortByStatus } from "@/utils/sort";
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
  MoreVertical,
  Plus,
  Printer,
  RefreshCcw,
} from "lucide-react";
import { Typography } from "../ui/typography";
import ProjectForm from "./ProjectForm";
import { columns } from "./columns";

import { toast } from "@/components/ui/use-toast";
import { Loader } from "lucide-react";
const ProjectTable = () => {
  const dispatch = useDispatch();
  const { projects, loading, success } = useSelector((state) => state.projects);
  const { userInfo } = useSelector((state) => state.auth);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data: projects,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
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
      sortByStatus: (rowA, rowB, columnId) => {
        const statusSortOrder = [
          PROJECT_STATUS.PENDING,
          PROJECT_STATUS.PROGRESS,
          PROJECT_STATUS.FINISHED,
        ];

        const statusA = rowA.getValue(columnId);
        const statusB = rowB.getValue(columnId);

        return sortByStatus(statusA, statusB, statusSortOrder);
      },
      sortByDate: (rowA, rowB, columnId) => {
        const dateA = rowA.getValue(columnId);
        const dateB = rowB.getValue(columnId);

        return sortByDate(dateA, dateB);
      },
    },
    meta: {
      editRow: (data) => {
        handleEditProject(data);
      },
      deleteRow: (projectId) => {
        handleDeleteProject(projectId);
      },
    },
  });

  const handleClick = () => {
    if (userInfo && userInfo.id) {
      dispatch(fetchProjects(userInfo.id));
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.id) {
      dispatch(fetchProjects(userInfo.id));
    }
  }, [userInfo, dispatch]);

  const handleAddProject = async (data) => {
    try {
      data = { ...data, user_id: userInfo.id };

      await dispatch(addProject(data));

      dispatch(fetchProjects(userInfo.id));

      toast({
        title: "Project added successfully!",
      });
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleEditProject = async (data) => {
    try {
      data = { ...data, user_id: userInfo.id };

      await dispatch(updateProject(data));

      dispatch(fetchProjects(userInfo.id));

      toast({
        title: "Project updated successfully!",
      });
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await dispatch(deleteProject(projectId));

      if (success) {
        dispatch(fetchProjects(userInfo.id));

        toast({
          title: "Project deleted successfully!",
        });
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <Typography variant="h4" component="h2">
          Projects
        </Typography>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="secondary">
              <Plus size={16} className="me-2" />
              New Project
            </Button>
          </DialogTrigger>
          <ProjectForm action={ACTION_MODE.ADD} onSubmit={handleAddProject} />
        </Dialog>
      </div>
      <Card className="overflow-hidden rounded-md">
        <Tabs defaultValue="all">
          <TabsList className="w-full justify-start rounded-none">
            <TabsTrigger
              value="all"
              className="px-4"
              onClick={() => table.getColumn("status")?.setFilterValue("")}
            >
              All
            </TabsTrigger>
            {Object.values(PROJECT_STATUS).map((status) => (
              <TabsTrigger
                key={status}
                className="px-4 capitalize"
                value={status}
                onClick={() => {
                  table.getColumn("status")?.setFilterValue(status);
                }}
              >
                {status.toLowerCase()}
              </TabsTrigger>
            ))}
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
                    <ArrowUpFromLine size={16} className="me-2" />
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
                            No Projects
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

export default ProjectTable;
