import { useMemo, useEffect, useState, Fragment } from "react";
import CategoryTable from "./CategoryTable";

const ResultsTable = (props) => {
  const [dataArray, setDataArray] = useState();
  const tableData = useMemo(() => dataArray, [dataArray]);

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
        id: "test_result",
        sortType: (rowA, rowB) => {
          // Get the values of the cells in this column for rowA and rowB
          let a = rowA.values.test_result;
          let b = rowB.values.test_result;

          // Check if both values are numbers
          if (!isNaN(a) && !isNaN(b)) {
            // If both values are numbers, compare them as numbers
            return a - b;
          } else if (!isNaN(a)) {
            // If only a is a number, sort it first
            return -1;
          } else if (!isNaN(b)) {
            // If only b is a number, sort it first
            return 1;
          } else {
            // If neither value is a number, compare them as strings
            return a.localeCompare(b);
          }
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (dataArray) return;

    // converts the timestamp into local time
    let tempArray = [];
    appData.forEach((app) => {
      if (app.test_result === null) app.test_result = "X";

      const date = new Date(app.timestamp);
      console.log(date);
      const timestamp = date.toLocaleString();
      console.log(timestamp);
      app.timestamp = timestamp;

      tempArray.push(app);
    });

    setDataArray(tempArray);
  }, [dataArray, appData]);

  return (
    <Fragment>
      {tableData && (
        <CategoryTable
          category={category}
          columns={columns}
          data={tableData}
          sortID={"test_result"}
        />
      )}
    </Fragment>
  );
};

export default ResultsTable;
