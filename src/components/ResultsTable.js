import { useMemo, useState, useEffect, useRef } from "react";
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
  const [tabledata, setTableData] = useState([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await axios.get("http://localhost:8800");
        setTableData(res.data);
        console.log("test");
        hasFetched.current = true;
      } catch (err) {
        console.log(err);
        console.log("test2");
      }
    };
    if (hasFetched.current === false) fetchAllData();
  }, []);
};

//   const table = useTable(
//     { columns, data },
//     useFilters,
//     useGroupBy,
//     useSortBy,
//     useExpanded,
//     usePagination
//   );

//   const { getTableProps, headerGroups, rows, prepareRow } = table;

//   return (
//     <div className={classes.tablePosition}>
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             // Apply the header row props
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {
//                 // Loop over the headers in each row
//                 headerGroup.headers.map((column) => (
//                   // Adds sorting controls into the table headers.
//                   <th
//                     className={classes.noSelect}
//                     {...column.getHeaderProps(column.getSortByToggleProps())}
//                   >
//                     {column.render("Header")}
//                     {/* Add a sort direction indicator */}
//                     <span>
//                       {column.isSorted ? (column.isSortedDesc ? "↓" : "↑") : ""}
//                     </span>
//                   </th>
//                 ))
//               }
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {rows.map((row) => {
//             // Prepare the row for display
//             prepareRow(row);
//             return (
//               // Apply the row props
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => {
//                   // Loop over the rows cells
//                   return (
//                     // Apply the cell props
//                     <td {...cell.getCellProps()}>
//                       {
//                         cell.render("Cell") // Render the cell contents
//                       }
//                     </td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

export default ResultsTable;
