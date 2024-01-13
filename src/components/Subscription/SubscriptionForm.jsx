import React, { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ACTION_MODE } from "../../utils/constants";
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
} from "react-aria-components";
import ChevronDownIcon from "@heroicons/react/20/solid/ChevronDownIcon";
import ChevronLeftIcon from "@heroicons/react/20/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/20/solid/ChevronRightIcon";
import XMarkIcon from "@heroicons/react/20/solid/XMarkIcon";
import { parseDate } from "@internationalized/date";
import { formatDateToYYYYMMDD } from "../../utils/format";

const SubscriptionForm = ({ action, onAdd, onEdit, data }) => {
  const { error } = useSelector((state) => state.subscriptions);
  const [name, setName] = useState(action === ACTION_MODE.ADD ? "" : data.name);
  const [website, setWebsite] = useState(
    action === ACTION_MODE.ADD ? "" : data.website,
  );
  const [price, setPrice] = useState(
    action === ACTION_MODE.ADD ? "" : data.price,
  );
  const [active, setActive] = useState(
    action === ACTION_MODE.ADD ? false : data.active,
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
                className="text-center text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200"
              >
                {action === ACTION_MODE.ADD && "Create Subscription"}
                {action === ACTION_MODE.EDIT && "Edit Subscription"}
              </Heading>
              <Form
                validationErrors={error}
                onSubmit={(e) => {
                  action === ACTION_MODE.ADD
                    ? onAdd(
                        e,
                        {
                          name: name,
                          website: website,
                          price: price,
                          active: active,
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
                          website: website,
                          price: price,
                          active: active,
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
                    htmlFor="subscription_name"
                    className="text-sm font-medium leading-6 text-neutral-900 dark:text-white"
                  >
                    Subscription Name:
                  </Label>
                  <Input
                    id="subscription_name"
                    type="text"
                    className="input mt-1 w-full"
                  />
                  <FieldError className="mt-2 block text-xs font-medium text-red-600" />
                </TextField>
                <TextField
                  name="website"
                  type="url"
                  value={website}
                  onChange={setWebsite}
                  isRequired
                >
                  <Label htmlFor="subscription_website" className="label">
                    Website:
                  </Label>
                  <Input
                    id="subscription_website"
                    className="input mt-1 w-full"
                  />
                  <FieldError className="mt-2 block text-xs font-medium text-red-600" />
                </TextField>
                <NumberField
                  name="price"
                  minValue={0}
                  value={price}
                  onChange={setPrice}
                  formatOptions={{ style: "currency", currency: "USD" }}
                  isRequired
                >
                  <Label htmlFor="subscription_price" className="label">
                    Price:
                  </Label>
                  <Input
                    id="subscription_price"
                    className="input mt-1 w-full"
                  />
                  <FieldError className="mt-2 block text-xs font-medium text-red-600" />
                </NumberField>
                <div>
                  <Label
                    htmlFor="subscription_activeness"
                    className="label my-4 flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="subscription_activeness"
                      value={active}
                      checked={active}
                      onChange={(e) => setActive(e.target.checked)}
                    />
                    is Active?
                  </Label>
                </div>
                <DateRangePicker
                  value={rangedDate}
                  onChange={setRangedDate}
                  name="range"
                  className="group flex flex-col gap-1 md:col-span-2"
                  isRequired
                >
                  <Label className="label">Start & end date:</Label>
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
                <div className="flex justify-end gap-1 md:col-span-2">
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

export default SubscriptionForm;
