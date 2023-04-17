import { useMemo } from "react";
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
        version: "136",
        consumption: "1h, 1234Wh",
        analysisx: "1m, 2342Wh",
        analysisy: "1h, 2342Wh",
        category: "Energy Analysis",
        timestamp: "Today",
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
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          // Apply the header row props
          <tr {...headerGroup.getHeaderGroupProps()}>
            {
              // Loop over the headers in each row
              headerGroup.headers.map((column) => (
                // Apply the header cell props
                <th {...column.getHeaderProps()}>
                  {
                    column.render("Header") // Render the header
                  }
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
  );
};

export default ResultsTable;
