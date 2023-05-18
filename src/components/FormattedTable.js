import { Fragment, useEffect, useMemo, useState } from "react";
import CategoryTable from "./CategoryTable";

const FormattedTable = (props) => {
  const [dataArray, setDataArray] = useState();
  const tableData = useMemo(() => dataArray, [dataArray]);
  const increment = false; // false -> rankings can be tied, true -> rankings increment despite being tied

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
        Header: "Latest Test",
        accessor: "timestamp",
      },
      {
        Header: "Total Warnings",
        accessor: "sum",
      },
      {
        Header: "Ranking",
        accessor: "ranking",
      },
    ],
    []
  );

  useEffect(() => {
    if (dataArray) return;

    // ranks the apps within their category
    appData.sort((a, b) => a.ranking - b.ranking);
    let prevRanking;
    let rank = 1;
    let tempArray = [];
    appData.forEach((app, index) => {
      if (typeof app.tests === "string") app.tests = JSON.parse(app.tests);

      if (app.ranking != null) {
        if ((app.ranking !== prevRanking || increment === true) && index !== 0)
          rank++;
        prevRanking = app.ranking;
        app.ranking = rank;
      }
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
  }, [dataArray, appData, increment]);

  return (
    <Fragment>
      {tableData && (
        <CategoryTable category={category} columns={columns} data={tableData} />
      )}
    </Fragment>
  );
};

export default FormattedTable;
