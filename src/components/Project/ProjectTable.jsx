import React, { useEffect, useMemo, useState } from "react";
import {
  addProject,
  deleteProject,
  fetchProjects,
  updateProject,
} from "../../features/project/projectActions";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_MODE, PROJECT_STATUS } from "../../utils/constants";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  ResizableTableContainer,
  Table,
  TableHeader,
  TableBody,
} from "react-aria-components";
import PencilIcon from "@heroicons/react/20/solid/PencilIcon";
import TrashIcon from "@heroicons/react/20/solid/TrashIcon";
import ChevronDownIcon from "@heroicons/react/20/solid/ChevronDownIcon";
import TableColumn from "../Table/TableColumn";
import TableRow from "../Table/TableRow";
import TableCell from "../Table/TableCell";
import { formatCurrency, formatDate, formatSeconds } from "../../utils/format";
import ProjectForm from "./ProjectForm";

const ProjectTable = () => {
  const dispatch = useDispatch();
  const {
    data: projects,
    loading,
    success,
  } = useSelector((state) => state.projects);
  const { userInfo } = useSelector((state) => state.auth);

  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });

  const sortedProjects = useMemo(() => {
    const projectsCopy = [...projects];

    return projectsCopy.sort((a, b) => {
      let first = a[sortDescriptor.column];
      let second = b[sortDescriptor.column];

      if (first === undefined || second === undefined) {
        return 0;
      }

      let cmp;

      if (!isNaN(parseFloat(first)) || !isNaN(parseInt(first))) {
        cmp = second - first;
      } else if (typeof first === "string") {
        if (!isNaN(Date.parse(first))) {
          cmp = Date.parse(second) - Date.parse(first);
        } else {
          cmp = first.localeCompare(second);
        }
      }

      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    });
  }, [sortDescriptor, projects]);

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

  const handleAddProject = async (e, formData, onClose) => {
    e.preventDefault();

    const data = {
      ...formData,
      user_id: userInfo.id,
    };

    try {
      const { error } = await dispatch(addProject(data));

      if (!error) {
        onClose();
        dispatch(fetchProjects(userInfo.id));
      }
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleEditProject = async (e, formData, onClose) => {
    e.preventDefault();

    const data = {
      ...formData,
      user_id: userInfo.id,
    };

    try {
      const { error } = await dispatch(updateProject(data));

      if (!error) {
        onClose();
        dispatch(fetchProjects(userInfo.id));
      }
    } catch (error) {
      console.error("Error adding project:", error);
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
    <div className="grid gap-4 rounded-md bg-neutral-100 p-4 dark:bg-neutral-800">
      <ResizableTableContainer className="w-full overflow-x-auto border bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <Table
          className="min-w-full"
          aria-label="projects"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
        >
          <TableHeader>
            <TableColumn
              id="name"
              allowsSorting
              allowsResizing
              isRowHeader
              minWidth={150}
              maxWidth={450}
            >
              Name
            </TableColumn>
            <TableColumn
              id="client"
              allowsSorting
              allowsResizing
              minWidth={100}
              maxWidth={300}
            >
              Client
            </TableColumn>
            <TableColumn
              id="budget"
              allowsSorting
              allowsResizing
              minWidth={120}
              maxWidth={200}
            >
              Budget
            </TableColumn>
            <TableColumn
              id="images"
              allowsSorting
              allowsResizing
              minWidth={80}
              maxWidth={160}
            >
              Images
            </TableColumn>
            <TableColumn
              id="animation"
              allowsSorting
              allowsResizing
              minWidth={80}
              maxWidth={160}
            >
              Animation
            </TableColumn>
            <TableColumn id="status" allowsSorting width={150}>
              Status
            </TableColumn>
            <TableColumn
              id="start_date"
              allowsSorting
              allowsResizing
              minWidth={100}
              maxWidth={200}
            >
              Start Date
            </TableColumn>
            <TableColumn
              id="end_date"
              allowsSorting
              allowsResizing
              minWidth={100}
              maxWidth={200}
            >
              End Date
            </TableColumn>
            <TableColumn width={100}>Actions</TableColumn>
          </TableHeader>
          <TableBody
            items={sortedProjects}
            renderEmptyState={() => (
              <p className="py-12 text-center font-bold">No Results Found</p>
            )}
          >
            {(project) => (
              <TableRow>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.client}</TableCell>
                <TableCell>{formatCurrency(project.budget)}</TableCell>
                <TableCell>{project.images}</TableCell>
                <TableCell>{formatSeconds(project.animation)}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium capitalize ring-1 ring-inset
                          ${
                            project.status === PROJECT_STATUS.PENDING
                              ? "bg-red-50 text-red-600 ring-red-500/50 dark:bg-red-500/10 dark:text-red-400"
                              : project.status === PROJECT_STATUS.PROGRESS
                                ? "bg-yellow-50 text-yellow-600 ring-yellow-500/50 dark:bg-yellow-500/10 dark:text-yellow-400"
                                : "bg-green-50 text-green-600 ring-green-500/50 dark:bg-green-500/10 dark:text-green-400"
                          }`}
                  >
                    {String(project.status).toLowerCase()}
                  </span>
                </TableCell>
                <TableCell>{formatDate(project.start_date)}</TableCell>
                <TableCell>{formatDate(project.end_date)}</TableCell>
                <TableCell width={100}>
                  <div className="flex items-center gap-2">
                    <DialogTrigger>
                      <Button className="circle-center h-8 w-8 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                        <PencilIcon className="h-4 w-4" />
                      </Button>

                      <ProjectForm
                        action={ACTION_MODE.EDIT}
                        onEdit={handleEditProject}
                        data={project}
                      />
                    </DialogTrigger>
                    <DialogTrigger>
                      <Button className="circle-center h-8 w-8 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                      <Modal className="fixed left-0 top-0 z-50 grid h-full w-full place-items-center bg-black/50 px-4">
                        <Dialog className="w-full max-w-[40rem] space-y-4 rounded-md bg-white px-4 pb-2 pt-6 text-black dark:bg-neutral-800 dark:text-white">
                          {({ close }) => (
                            <>
                              <Heading
                                slot="title"
                                className="text-xl font-bold"
                              >
                                Are you sure you want to delete the project{" "}
                                <q>{project.name}</q>?
                              </Heading>
                              <p>
                                This action cannot be undone. Deleting the
                                project will permanently remove it from the
                                system.
                              </p>
                              <div className="gap flex items-center justify-end">
                                <Button
                                  onPress={close}
                                  className="rounded px-3 py-2 text-sm font-medium uppercase tracking-tight hover:bg-neutral-100 hover:dark:bg-neutral-700"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onPress={() => {
                                    handleDeleteProject(project.id);
                                    close();
                                  }}
                                  className="rounded px-3 py-2 text-sm font-medium uppercase tracking-tight hover:bg-neutral-100 hover:dark:bg-neutral-700"
                                >
                                  Yes, Delete
                                </Button>
                              </div>
                            </>
                          )}
                        </Dialog>
                      </Modal>
                    </DialogTrigger>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ResizableTableContainer>
      <div className="flex items-center justify-end gap-1">
        <Button
          type="button"
          className="flex items-center gap-2 rounded bg-primary-600 px-2 py-1 text-sm text-white enabled:hover:bg-primary-700"
          isDisabled={loading}
          onPress={handleClick}
        >
          {loading && (
            <svg
              aria-hidden="true"
              className="h-4 w-4 animate-spin fill-primary-400 text-neutral-200 dark:text-neutral-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
          <span>{loading ? "Refreshing..." : "Refresh"}</span>
        </Button>
        <DialogTrigger>
          <Button className="rounded bg-primary-600 px-2 py-1 text-sm text-white hover:bg-primary-700">
            Add
          </Button>
          <ProjectForm action={ACTION_MODE.ADD} onAdd={handleAddProject} />
        </DialogTrigger>
        <MenuTrigger>
          <Button
            aria-label="Menu"
            className="flex items-center gap-2 rounded border border-primary-600 px-2 py-1 text-sm dark:text-white"
          >
            Export as <ChevronDownIcon className="h-4 w-4" />
          </Button>
          <Popover className="w-[--trigger-width] rounded border bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
            <Menu onAction={alert} className="space-y-2 text-sm">
              <MenuItem
                className="cursor-pointer rounded px-2 py-1.5 hover:bg-primary-100 focus:bg-primary-100 dark:hover:bg-primary-600 dark:focus:bg-primary-600"
                id="csv"
              >
                CSV
              </MenuItem>
              <MenuItem
                className="cursor-pointer rounded px-2 py-1.5 hover:bg-primary-100 focus:bg-primary-100 dark:hover:bg-primary-600 dark:focus:bg-primary-600"
                id="pdf"
              >
                PDF
              </MenuItem>
            </Menu>
          </Popover>
        </MenuTrigger>
      </div>
    </div>
  );
};

export default ProjectTable;
