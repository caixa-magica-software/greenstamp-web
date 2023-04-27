import { useMemo } from "react";
import classes from "./ResultsTable.module.css";
import {
  useExpanded,
  useFilters,
  useGroupBy,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

const ResultsTable = () => {
  const data = useMemo(
    () => [
      {
        app: "RTP Notícias",
        package: "pt.rtp.noticias.android",
        version: "99",
        consumption: "1h, 1234Wh",
        analysisx: "1m, 2342Wh",
        analysisy: "1h, 2342Wh",
        category: "Energy Analysis",
        timestamp: "Today",
      },
      {
        app: "aTP Notícias",
        package: "at.rtp.noticias.android",
        version: "136",
        consumption: "1h, 1234Wh",
        analysisx: "1m, 2342Wh",
        analysisy: "1h, 2342Wh",
        category: "anergy Analysis",
        timestamp: "aToday",
      },
    ],
    []
  );
  const columns = useMemo(
    () => [
      {
        Header: "App",

        accessor: "app",
      },
      {
        Header: "Package",

        accessor: "package",
      },
      {
        Header: "Version",

        accessor: "version",
      },
      {
        Header: "Energy Consumption",

        accessor: "consumption",
      },
      {
        Header: "Energy Analysis X",

        accessor: "analysisx",
      },
      {
        Header: "Energy Analysis Y",

        accessor: "analysisy",
      },
      {
        Header: "Category",

        accessor: "category",
      },
      {
        Header: "Date & Time",

        accessor: "timestamp",
      },
    ],
    []
  );
  const table = useTable(
    { columns, data },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    table;

  return (
    <div className={classes.tablePosition}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Adds sorting controls into the table headers.
                  <th className={classes.noSelect} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? '↓'
                        : '↑'
                      : ''}
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
    </div>
  );
};

export default ResultsTable;
