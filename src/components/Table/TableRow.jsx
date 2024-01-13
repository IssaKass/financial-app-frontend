import React from "react";
import { Row } from "react-aria-components";

const TableRow = (props) => {
  return (
    <Row
      {...props}
      className="group cursor-default border-t even:bg-gray-50 dark:border-neutral-700 dark:even:bg-gray-800"
    />
  );
};

export default TableRow;
