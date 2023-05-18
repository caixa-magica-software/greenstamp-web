import { Fragment } from "react";
import classes from "./CategoryTable.module.css";
import {
  useExpanded,
  useFilters,
  useGroupBy,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

const CategoryTable = (props) => {
  const table = useTable(
    {
      columns: props.columns,
      data: props.data,
      initialState: {
        sortBy: [
          {
            id: props.sortID,
          },
        ],
      },
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination
  );
  const { getTableProps, headerGroups, rows, prepareRow } = table;

  return (
    <div className={classes.tableScroll}>
      <h1>{props.category}</h1>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Adds sorting controls into the table headers.
                  <th
                    className={classes.noSelect}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? "↓" : "↑") : ""}
                    </span>
                  </th>
                ))
              }
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  // Loop over the rows cells
                  return (
                    // Apply the cell props
                    <td {...cell.getCellProps()}>
                      {
                        cell.render("Cell") // Render the cell contents
                      }
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <br />
    </div>
  );
};

export default CategoryTable;
