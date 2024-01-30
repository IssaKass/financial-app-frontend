import TaskForm from "@/components/Task/TaskForm";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Typography } from "@/components/ui/typography";
import {
  addTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "@/features/tasks/taskActions";
import DashboardLayout from "@/layouts/DashboardLayout";
import Page from "@/layouts/Page";
import { ACTION_MODE } from "@/utils/constants";
import { formatCurrency, formatDate, formatSeconds } from "@/utils/format";
import {
  CalendarDays,
  DollarSign,
  Image,
  Inbox,
  Pencil,
  Plus,
  Timer,
  Trash2,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ProjectProperty = ({ icon, text, value }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="text-muted-foreground">{icon}</div>
      <div className="flex flex-col justify-center">
        <Typography variant="subtitle2">{text}</Typography>
        <Typography variant="body2">{value}</Typography>
      </div>
    </div>
  );
};

const TaskCard = ({ task, projectId }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleEditTask = async (data) => {
    try {
      data = { ...data, project_id: projectId };

      await dispatch(updateTask(data));
      setOpen(false);

      dispatch(fetchTasks(projectId));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await dispatch(deleteTask(taskId));

      dispatch(fetchTasks(projectId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Card key={task.id} className="group relative">
      <div className="absolute end-1 top-1 flex opacity-0 transition-opacity group-hover:opacity-100">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="icon" variant="ghost">
              <Pencil size={16} />
            </Button>
          </DialogTrigger>
          <DialogContent
            onPointerDownOutside={(event) => event.preventDefault()}
            className="data-[state=open]:animate-dialog-in data-[state=closed]:animate-dialog-out group-disabled:bg-red-500"
          >
            <TaskForm
              action={ACTION_MODE.EDIT}
              initialData={task}
              onSubmit={handleEditTask}
            />
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon" variant="ghost">
              <Trash2 size={16} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this task?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Deleting the task will permanently
                remove it from the system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={() => handleDeleteTask(task.id)}
              >
                Yes, Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <CardHeader>
        <CardTitle>
          <Typography variant="h6">{task.title}</Typography>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Typography className="">{task.description}</Typography>
      </CardContent>
    </Card>
  );
};

const ProjectDetailsPage = () => {
  const project = useLocation().state;

  const dispatch = useDispatch();
  const { tasks, loading, success } = useSelector((state) => state.tasks);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks(project.id));
  }, [dispatch]);

  const handleAddTask = async (data) => {
    try {
      data = { ...data, project_id: project.id };

      await dispatch(addTask(data));

      // dispatch(fetchTasks(project.id));
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Page title="Financial | Project Details">
      <DashboardLayout>
        <div className="container mx-auto grid gap-4 lg:grid-cols-[1fr_12rem] lg:items-start">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                {project.name}
                <Badge variant="outline" size="sm">
                  {project.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4"></CardContent>
          </Card>
          <Card>
            <CardContent className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-6 px-4 py-2">
              <ProjectProperty
                text="Client"
                icon={<UserRound size={24} />}
                value={project.client}
              />
              <ProjectProperty
                text="Budget"
                icon={<DollarSign size={24} />}
                value={formatCurrency(project.budget)}
              />
              <ProjectProperty
                text="Images"
                icon={<Image size={24} />}
                value={project.images}
              />
              <ProjectProperty
                text="Animation"
                icon={<Timer size={24} />}
                value={formatSeconds(project.animation)}
              />
              <ProjectProperty
                text="Start Date"
                icon={<CalendarDays size={24} />}
                value={formatDate(project.start_date)}
              />
              <ProjectProperty
                text="End Date"
                icon={<CalendarDays size={24} />}
                value={formatDate(project.end_date)}
              />
            </CardContent>
          </Card>
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Tasks
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button size="icon" className="rounded-full">
                      <Plus size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    onPointerDownOutside={(event) => event.preventDefault()}
                  >
                    <TaskForm
                      action={ACTION_MODE.ADD}
                      onSubmit={handleAddTask}
                      afterSubmit={() => {
                        setOpen(false);
                        dispatch(fetchTasks(project.id));
                    }}
                    />
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              {tasks.length > 0 ? (
                <ul className="grid gap-4">
                  {tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      projectId={project.id}
                    />
                  ))}
                </ul>
              ) : (
                <div className="grid h-48 place-content-center place-items-center gap-2 rounded-md bg-accent text-muted-foreground">
                  <Inbox size={48} />
                  <Typography variant="subtitle1">No Tasks</Typography>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </Page>
  );
};

export default ProjectDetailsPage;
