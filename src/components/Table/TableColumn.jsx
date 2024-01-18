import React from "react";
import { Column, ColumnResizer, Group } from "react-aria-components";
import { PiArrowUpBold } from "react-icons/pi";

const TableColumn = (props) => {
  return (
    <Column
      {...props}
      className="bg-primary-600 py-2 text-left text-sm font-bold text-white"
    >
      {({ allowsSorting, sortDirection }) => (
        <div className="flex items-center pl-4">
          <Group
            role="presentation"
            tabIndex={-1}
            className="flex flex-1 items-center overflow-hidden outline-none ring-slate-600 focus-visible:ring-2"
          >
            <span className="flex-1 truncate">{props.children}</span>
            {allowsSorting && (
              <span
                className={`ml-1 flex h-4 w-4 items-center justify-center transition ${
                  sortDirection === "descending" ? "rotate-180" : ""
                }`}
              >
                {sortDirection && <PiArrowUpBold className="h-4 w-4" />}
              </span>
            )}
          </Group>
          {props.allowsResizing && (
            <ColumnResizer className="ms-2 h-5 w-1.5 cursor-col-resize bg-primary-400 resizing:bg-white" />
          )}
        </div>
      )}
    </Column>
  );
};

export default TableColumn;
