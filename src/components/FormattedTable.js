import { Fragment, useEffect, useMemo, useState } from "react";
import CategoryTable from "./CategoryTable";

const FormattedTable = (props) => {
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
        Header: "Icon",
        accessor: "icon",
      },
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
        Header: "Latest Test",
        accessor: "timestamp",
      },
      {
        Header: "Total Warnings",
        accessor: "sum",
      },
      {
        Header: "Stars",
        accessor: "stars",
      },
      {
        Header: "Ranking",
        accessor: "ranking",
        sortType: (rowA, rowB) => {
          // Gets the values of the cells in this column for rowA and rowB
          // and sorts them in ascending order
          let a = rowA.values.ranking;
          let b = rowB.values.ranking;

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
    ],
    []
  );

  useEffect(() => {
    if (tableData && tableData.length > 0) return;

    // ranks the apps within their category
    appData.sort((a, b) => a.sum - b.sum);
    let prevSum = -1;
    let rank = 1;
    let tempArray = [];
    appData.forEach((app) => {
      if (typeof app.tests === "string") app.tests = JSON.parse(app.tests);

      if (
        app.sum == null ||
        app.ranking == null ||
        app.sum === "X" ||
        app.ranking === "X"
      ) {
        app.ranking = "X";
        app.sum = "X";
        tempArray.push(app);
        return;
      }

      if (app.sum !== prevSum && prevSum !== -1) {
        rank++;
      }

      prevSum = app.sum;
      app.ranking = rank;

      tempArray.push(app);
    });

    // finds the timestamp of the latest test and assigns it to each app
    tempArray.forEach((app) => {
      let latestTimestamp;
      app.tests.forEach((test) => {
        const timestamp = new Date(test.timestamp);
        if (!latestTimestamp || timestamp > latestTimestamp) {
          latestTimestamp = timestamp;
        }
      });
      app.timestamp = latestTimestamp.toLocaleString();
    });

    setDataArray(tempArray);
  }, [appData, category, tableData, columns]);

  return (
    <Fragment>
      {tableData && (
        <CategoryTable
          category={category}
          columns={columns}
          data={tableData}
          sortID={"ranking"}
        />
      )}
    </Fragment>
  );
};

export default FormattedTable;
