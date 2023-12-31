import { useMemo, useEffect, useState, Fragment } from "react";
import CategoryTable from "./CategoryTable";

const ResultsTable = (props) => {
  const [dataArray, setDataArray] = useState();
  const tableData = useMemo(() => dataArray, [dataArray]);
  const [table, setTable] = useState();

  let appData = props.data;
  const cat = props.category.replace(
    props.category[0],
    props.category[0].toUpperCase()
  );
  const category = cat.replace("-", " & ");

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
        Header: "Analyzer",
        accessor: "test_parameter",
      },
      {
        Header: "Test",
        accessor: "test_name",
      },
      {
        Header: "Result",
        accessor: "test_result",
        id: "test_result",
        sortType: (rowA, rowB) => {
          // Gets the values of the cells in this column for rowA and rowB
          // and sorts them in ascending order
          let a = rowA.values.test_result;
          let b = rowB.values.test_result;

          // Checks if both values are numbers and compares them as such
          if (!isNaN(a) && !isNaN(b)) {
            return a - b;
          } else if (!isNaN(a)) {
            // If only a is a number, sort it first
            return -1;
          } else if (!isNaN(b)) {
            // If only b is a number, sort it first
            return 1;
          } else {
            // If neither are numbers, compare them as strings
            return a.localeCompare(b);
          }
        },
      },
      {
        Header: "Stars",
        accessor: "stars",
      },
    ],
    []
  );

  useEffect(() => {
    if (tableData && tableData.length > 0) {
      setTable(
        <CategoryTable
          category={category}
          columns={columns}
          data={tableData}
          sortID={"test_result"}
        />
      );

      return;
    }

    // converts the timestamp into local time
    let tempArray = [];
    appData.forEach((app) => {
      if (app.test_result === null) app.test_result = "X";

      tempArray.push(app);
    });
    setDataArray(tempArray);
  }, [dataArray, appData, category, columns, tableData]);

  return <Fragment>{table}</Fragment>;
};

export default ResultsTable;
