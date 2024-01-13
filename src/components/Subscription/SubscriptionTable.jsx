import React, { useEffect, useMemo, useState } from "react";
import {
  addSubscription,
  deleteSubscription,
  fetchSubscriptions,
  updateSubscription,
} from "../../features/subscription/subscriptionActions";
import { useDispatch, useSelector } from "react-redux";
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
import { parseDate } from "@internationalized/date";
import TableColumn from "../Table/TableColumn";
import TableRow from "../Table/TableRow";
import TableCell from "../Table/TableCell";
import PencilIcon from "@heroicons/react/20/solid/PencilIcon";
import TrashIcon from "@heroicons/react/20/solid/TrashIcon";
import CheckIcon from "@heroicons/react/20/solid/CheckIcon";
import XMarcIcon from "@heroicons/react/20/solid/XMarkIcon";
import { formatCurrency, formatDate } from "../../utils/format";
import SubscriptionForm from "./SubscriptionForm";
import { ACTION_MODE } from "../../utils/constants";

const Subsciption = () => {
  const dispatch = useDispatch();
  const {
    data: subscriptions,
    loading,
    success,
  } = useSelector((state) => state.subscriptions);
  const { userInfo } = useSelector((state) => state.auth);

  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });

  const sortedSubscriptions = useMemo(() => {
    const subscriptionsCopy = [...subscriptions];

    return subscriptionsCopy.sort((a, b) => {
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
  }, [sortDescriptor, subscriptions]);

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

  const handleAddSubscription = async (e, formData, onClose) => {
    e.preventDefault();

    const data = {
      ...formData,
      user_id: userInfo.id,
    };

    try {
      const { error } = await dispatch(addSubscription(data));

      if (!error) {
        onClose();
        dispatch(fetchSubscriptions(userInfo.id));
      }
    } catch (error) {
      console.error("Error adding subscription:", error);
    }
  };

  const handleEditSubscription = async (e, formData, onClose) => {
    e.preventDefault();

    const data = {
      ...formData,
      user_id: userInfo.id,
    };

    try {
      const { error } = await dispatch(updateSubscription(data));

      if (!error) {
        onClose();
        dispatch(fetchSubscriptions(userInfo.id));
      }
    } catch (error) {
      console.error("Error editing subscription:", error);
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

  return (
    <div className="grid gap-4">
      <ResizableTableContainer className="w-full overflow-x-auto border dark:border-neutral-700">
        <Table
          aria-label="Subscriptions"
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
            >
              Name
            </TableColumn>
            <TableColumn
              id="website"
              allowsSorting
              allowsResizing
              minWidth={200}
            >
              Website
            </TableColumn>
            <TableColumn
              id="price"
              allowsSorting
              allowsResizing
              minWidth={80}
              maxWidth={140}
            >
              Price
            </TableColumn>
            <TableColumn id="active" width={120}>
              Is Active
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
            <TableColumn width={100}></TableColumn>
          </TableHeader>
          <TableBody
            items={sortedSubscriptions}
            renderEmptyState={() => (
              <p className="py-12 text-center font-bold">No Results Found</p>
            )}
          >
            {(subscription) => (
              <TableRow>
                <TableCell>{subscription.name}</TableCell>
                <TableCell>{subscription.website}</TableCell>
                <TableCell>{formatCurrency(subscription.price)}</TableCell>
                <TableCell>
                  {subscription.active ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <XMarcIcon className="h-4 w-4" />
                  )}
                </TableCell>
                <TableCell>{formatDate(subscription.start_date)}</TableCell>
                <TableCell>{formatDate(subscription.end_date)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <DialogTrigger>
                      <Button className="circle-center h-8 w-8 hover:bg-primary-600 hover:text-white">
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <SubscriptionForm
                        action={ACTION_MODE.EDIT}
                        data={subscription}
                        onEdit={handleEditSubscription}
                      />
                    </DialogTrigger>
                    <DialogTrigger>
                      <Button className="circle-center h-8 w-8 hover:bg-primary-600 hover:text-white">
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
                                Are you sure you want to delete the subscription{" "}
                                <q>{subscription.name}</q>?
                              </Heading>
                              <p>
                                This action cannot be undone. Deleting the
                                subscription will permanently remove it from the
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
                                    handleDeleteSubscription(subscription.id);
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
          <SubscriptionForm
            action={ACTION_MODE.ADD}
            onAdd={handleAddSubscription}
          />
        </DialogTrigger>
        <MenuTrigger>
          <Button aria-label="Menu">Export as</Button>
          <Popover>
            <Menu onAction={alert}>
              <MenuItem id="open">Open</MenuItem>
              <MenuItem id="rename">Rename…</MenuItem>
              <MenuItem id="duplicate">Duplicate</MenuItem>
              <MenuItem id="share">Share…</MenuItem>
              <MenuItem id="delete">Delete…</MenuItem>
            </Menu>
          </Popover>
        </MenuTrigger>
      </div>
    </div>
  );
};

export default Subsciption;
