import { useMemo, useEffect, useRef, useState } from "react";
import classes from "./ResultsTable.module.css";
import axios from "axios";
import {
  useExpanded,
  useFilters,
  useGroupBy,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

const ResultsTable = () => {
  const hasFetched = useRef(false);
  const [dataArray, setDataArray] = useState([{ state: "loading" }]);

  const columns = useMemo(
    () => [
      {
        Header: "App",
        accessor: "app_name",
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
        Header: "Date",
        accessor: "timestamp",
      },
      {
        Header: "Test",
        accessor: "test_name",
      },
      {
        Header: "Parameter",
        accessor: "test_parameter",
      },
      {
        Header: "Result",
        accessor: "test_result",
      },
    ],
    []
  );

  const data = useMemo(() => dataArray, [dataArray]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await axios.get("http://localhost:8800");
        const responseData = res.data;
        hasFetched.current = true;
        if (dataArray[0].state === "loading") {
          setDataArray(responseData);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (hasFetched.current === false) {
      fetchAllData();
    }
  }, [dataArray]);

  const table = useTable(
    { columns, data },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination
  );

  const { getTableProps, headerGroups, rows, prepareRow } = table;

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
    </div>
  );
};

export default ResultsTable;
