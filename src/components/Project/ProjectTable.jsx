import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import ProjectForm from "./ProjectForm";
import { columns } from "./columns";

const ProjectTable = () => {
  const dispatch = useDispatch();
  const {
    data: projects,
    loading,
    success,
  } = useSelector((state) => state.projects);
  const { userInfo } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

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
  }, [userInfo]);

  const handleAddProject = async (data) => {
    try {
      data = { ...data, user_id: userInfo.id };

      await dispatch(addProject(data));

      dispatch(fetchProjects(userInfo.id));
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleEditProject = async (data) => {
    try {
      data = { ...data, user_id: userInfo.id };

      await dispatch(updateProject(data));

      dispatch(fetchProjects(userInfo.id));
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await dispatch(deleteProject(projectId));

      if (success) {
        dispatch(fetchProjects(userInfo.id));
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

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
            <DialogTrigger asChild>
              <Button size="sm">Add</Button>
            </DialogTrigger>
            <ProjectForm
              action={ACTION_MODE.ADD}
              onAdd={handleAddProject}
              afterSubmit={() => setOpen(false)}
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
      <div className="overflow-x-auto">
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

export default ProjectTable;
