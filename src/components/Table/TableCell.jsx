import React from "react";
import { Cell } from "react-aria-components";

const TableCell = (props) => {
  return (
    <Cell
      {...props}
      className={`truncate px-4 py-2 ${props.className} text-sm`}
    />
  );
};

export default TableCell;
