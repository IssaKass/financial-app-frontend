import React, { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ACTION_MODE, PROJECT_STATUS } from "../../utils/constants";
import {
  Button,
  Dialog,
  Heading,
  Input,
  Label,
  Modal,
  TextField,
  Popover,
  Form,
  ModalOverlay,
  NumberField,
  DateRangePicker,
  DateInput,
  RangeCalendar,
  CalendarGrid,
  CalendarCell,
  Group,
  DateSegment,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarGridBody,
  FieldError,
  Select,
  SelectValue,
  ListBox,
  ListBoxItem,
} from "react-aria-components";
import ChevronDownIcon from "@heroicons/react/20/solid/ChevronDownIcon";
import ChevronLeftIcon from "@heroicons/react/20/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/20/solid/ChevronRightIcon";
import CheckIcon from "@heroicons/react/20/solid/CheckIcon";
import XMarkIcon from "@heroicons/react/20/solid/XMarkIcon";
import { parseDate } from "@internationalized/date";
import { formatDateToYYYYMMDD } from "../../utils/format";

const ProjectForm = ({ action, onAdd, onEdit, data }) => {
  const { error } = useSelector((state) => state.subscriptions);
  const [name, setName] = useState(action === ACTION_MODE.ADD ? "" : data.name);
  const [client, setClient] = useState(
    action === ACTION_MODE.ADD ? "" : data.client,
  );
  const [budget, setBudget] = useState(
    action === ACTION_MODE.ADD ? "" : data.budget,
  );
  const [images, setImages] = useState(
    action === ACTION_MODE.ADD ? "" : data.images,
  );
  const [animation, setAnimation] = useState(
    action === ACTION_MODE.ADD ? "" : data.animation,
  );
  const [selectedStatus, setSelectedStatus] = useState(
    action === ACTION_MODE.ADD ? "" : data.status,
  );
  const [rangedDate, setRangedDate] = useState(
    action === ACTION_MODE.ADD
      ? {
          start: parseDate(formatDateToYYYYMMDD(new Date())),
          end: parseDate(formatDateToYYYYMMDD(new Date())),
        }
      : {
          start: parseDate(formatDateToYYYYMMDD(new Date(data.start_date))),
          end: parseDate(formatDateToYYYYMMDD(new Date(data.end_date))),
        },
  );

  return (
    <ModalOverlay className="fixed left-0 top-0 z-50 grid h-full w-full place-items-center bg-black/50 px-4">
      <Modal
        isDismissable
        isKeyboardDismissDisabled
        className="w-full max-w-[50rem] rounded-md bg-white dark:bg-neutral-900"
      >
        <Dialog className="relative px-4 py-4">
          {({ close }) => (
            <div>
              <Button
                onPress={close}
                className="absolute right-1 top-1 grid h-8 w-8 place-items-center rounded-full text-black hover:bg-primary-200 dark:text-white dark:hover:bg-primary-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </Button>
              <Heading
                slot="title"
                className="dark:text-neutral200 text-center text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200"
              >
                {action === ACTION_MODE.ADD && "Create Project"}
                {action === ACTION_MODE.EDIT && "Edit Project"}
              </Heading>
              <Form
                validationErrors={error}
                onSubmit={(e) => {
                  action === ACTION_MODE.ADD
                    ? onAdd(
                        e,
                        {
                          name: name,
                          client: client,
                          budget: budget,
                          images: images,
                          animation: animation,
                          status: selectedStatus,
                          start_date: rangedDate.start.toDate().toISOString(),
                          end_date: rangedDate.end.toDate().toISOString(),
                        },
                        close,
                      )
                    : onEdit(
                        e,
                        {
                          id: data.id,
                          name: name,
                          client: client,
                          budget: budget,
                          images: images,
                          animation: animation,
                          status: selectedStatus,
                          start_date: rangedDate.start.toDate().toISOString(),
                          end_date: rangedDate.end.toDate().toISOString(),
                        },
                        close,
                      );
                }}
                className="mt-8 grid gap-x-6 gap-y-4 md:grid-cols-2"
              >
                <TextField
                  name="name"
                  type="text"
                  autoFocus
                  className="md:col-span-2"
                  value={name}
                  onChange={setName}
                  isRequired
                >
                  <Label
                    htmlFor="project_name"
                    className="text-sm font-medium leading-6 text-neutral-900 dark:text-white"
                  >
                    Project Name:
                  </Label>
                  <Input
                    id="project_name"
                    type="text"
                    className="input mt-1 w-full"
                  />
                  <FieldError className="mt-2 block text-xs font-medium text-red-600" />
                </TextField>
                <TextField
                  name="client"
                  type="text"
                  className="md:col-span-2"
                  value={client}
                  onChange={setClient}
                  isRequired
                >
                  <Label
                    htmlFor="project_client"
                    className="block text-sm font-medium leading-6 text-neutral-900 dark:text-white"
                  >
                    Client name:
                  </Label>
                  <Input id="project_client" className="input mt-1 w-full" />
                  <FieldError className="mt-2 block text-xs font-medium text-red-600" />
                </TextField>
                <NumberField
                  name="budget"
                  minValue={0}
                  value={budget}
                  onChange={setBudget}
                  formatOptions={{ style: "currency", currency: "USD" }}
                  isRequired
                >
                  <Label
                    htmlFor="project_budget"
                    className="block text-sm font-medium leading-6 text-neutral-900 dark:text-white"
                  >
                    Budget:
                  </Label>
                  <Input id="project_budget" className="input mt-1 w-full" />
                  <FieldError className="mt-2 block text-xs font-medium text-red-600" />
                </NumberField>
                <NumberField
                  name="images"
                  minValue={0}
                  value={images}
                  onChange={setImages}
                >
                  <Label
                    htmlFor="project_images"
                    className="block text-sm font-medium leading-6 text-neutral-900 dark:text-white"
                  >
                    Images:
                  </Label>
                  <Input id="project_images" className="input mt-1 w-full" />
                </NumberField>
                <NumberField
                  name="animation"
                  minValue={0}
                  value={animation}
                  onChange={setAnimation}
                  formatOptions={{
                    style: "unit",
                    unit: "second",
                    unitDisplay: "long",
                  }}
                >
                  <Label
                    htmlFor="project_animation"
                    className="block text-sm font-medium leading-6 text-neutral-900 dark:text-white"
                  >
                    Animation:
                  </Label>
                  <Input id="project_animation" className="input mt-1 w-full" />
                </NumberField>
                <Select
                  selectedKey={selectedStatus || 0}
                  onSelectionChange={setSelectedStatus}
                >
                  <Label className="block text-sm font-medium leading-6 text-neutral-900 dark:text-white">
                    Status:
                  </Label>
                  <Button className="input mt-1 flex w-full items-center justify-between">
                    <SelectValue className="truncate placeholder-shown:italic" />
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                  <Popover className="w-[--trigger-width] rounded-md border bg-white text-sm text-black ring-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
                    <ListBox className="grid gap-1 p-1 outline-none">
                      {Object.values(PROJECT_STATUS).map((status, index) => (
                        <ListBoxItem
                          key={index}
                          id={status}
                          textValue={status}
                          className="cursor-pointer rounded px-2 py-1.5 hover:bg-primary-100 focus:bg-primary-100 dark:hover:bg-primary-600 dark:focus:bg-primary-600"
                        >
                          {({ isSelected }) => (
                            <div className="flex items-center justify-between">
                              <span>{status}</span>
                              <span>
                                {isSelected && (
                                  <CheckIcon className="h-4 w-4" />
                                )}
                              </span>
                            </div>
                          )}
                        </ListBoxItem>
                      ))}
                    </ListBox>
                  </Popover>
                </Select>
                <DateRangePicker
                  value={rangedDate}
                  onChange={setRangedDate}
                  name="range"
                  className="group flex flex-col gap-1 md:col-span-2"
                  isRequired
                >
                  <Label className="block text-sm font-medium leading-6 text-neutral-900 dark:text-white">
                    Start & end date:
                  </Label>
                  <Group className="input flex w-full items-center gap-2 py-0">
                    <DateInput slot="start" className="flex flex-1">
                      {(segment) => (
                        <DateSegment
                          segment={segment}
                          className="rounded-sm px-0.5 tabular-nums caret-transparent outline-none placeholder-shown:italic focus:bg-primary-600 focus:text-white"
                        />
                      )}
                    </DateInput>
                    <DateInput slot="end" className="flex flex-1 py-1.5">
                      {(segment) => (
                        <DateSegment
                          segment={segment}
                          className="rounded-sm px-0.5 tabular-nums caret-transparent outline-none placeholder-shown:italic focus:bg-primary-600 focus:text-white"
                        />
                      )}
                    </DateInput>
                    <Button>
                      <ChevronDownIcon className="h-4 w-4" />
                    </Button>
                  </Group>
                  <Popover className="rounded-md border bg-white dark:border-neutral-700 dark:bg-neutral-800">
                    <Dialog>
                      <RangeCalendar className="p-2">
                        <header className="flex items-center justify-between gap-2 px-4 dark:text-white">
                          <Heading />
                          <div className="flex items-center gap-1">
                            <Button
                              slot="previous"
                              className="grid h-8 w-8 place-items-center rounded-full hover:bg-primary-100 dark:hover:bg-primary-600"
                            >
                              <ChevronLeftIcon className="h-6 w-6" />
                            </Button>
                            <Button
                              slot="next"
                              className="grid h-8 w-8 place-items-center rounded-full hover:bg-primary-100 dark:hover:bg-primary-600"
                            >
                              <ChevronRightIcon className="h-6 w-6" />
                            </Button>
                          </div>
                        </header>
                        <CalendarGrid className="mt-4 gap-4">
                          <CalendarGridHeader>
                            {(day) => (
                              <CalendarHeaderCell className="text-xs font-normal dark:text-white">
                                {day}
                              </CalendarHeaderCell>
                            )}
                          </CalendarGridHeader>
                          <CalendarGridBody>
                            {(date) => (
                              <CalendarCell
                                date={date}
                                className="m-0.5 grid h-8 w-8 place-items-center rounded-sm text-sm font-medium hover:bg-primary-100 selected:bg-primary-200 disabled:text-neutral-500 dark:text-white dark:hover:bg-primary-600 dark:selected:bg-primary-600 disabled:dark:text-neutral-500"
                              />
                            )}
                          </CalendarGridBody>
                        </CalendarGrid>
                      </RangeCalendar>
                    </Dialog>
                  </Popover>
                </DateRangePicker>
                <div className="mt-2 flex justify-end gap-1 md:col-span-2">
                  <Button
                    type="reset"
                    className="rounded-md bg-red-600 px-2 py-1 text-sm text-white"
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-md bg-primary-600 px-2 py-1 text-sm text-white"
                  >
                    {action === ACTION_MODE.ADD && "Add"}
                    {action === ACTION_MODE.EDIT && "Save Changes"}
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

export default ProjectForm;
