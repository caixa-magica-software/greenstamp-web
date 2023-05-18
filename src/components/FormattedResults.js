import axios from "axios";
import { dbGetAllFormatted } from "config/api";
import { useEffect, useRef, useState } from "react";
import FormattedTable from "./FormattedTable";
import classes from "./FormattedResults.module.css";

const FormattedResults = () => {
  const hasFetchedFormatted = useRef(false);
  const [data, setData] = useState();
  const [categories, setCategories] = useState();

  // Fetches formatted app data with rankings
  const fetchFormatted = async () => {
    const res = await axios.get(dbGetAllFormatted);
    const response = res.data.data;
    setData(response);

    // finds all categories and pushes them into an array
    let categoriesArray = [];
    response.forEach((app) => {
      if (typeof app.categories === "string") {
        app.categories = JSON.parse(app.categories);
      }
      if (app.categories === null) {
        app.categories = ["other"];
      }

      app.categories.forEach((category) => {
        if (categoriesArray.includes(category)) return;
        categoriesArray.push(category);
      });
    });

    // sorts categories alphabetically, leaving "other" at the end
    categoriesArray.sort((a, b) => {
      if (a === "other") return 1;
      if (b === "other") return -1;
      return a.localeCompare(b);
    });
    setCategories(categoriesArray);

    hasFetchedFormatted.current = true;
  };

  useEffect(() => {
    if (hasFetchedFormatted.current === true) return;
    fetchFormatted();
  }, [hasFetchedFormatted]);

  return (
    <div className={classes.tablePosition}>
      {categories !== undefined &&
        categories.map((category) => {
          let categoryData = [];
          data.forEach((app) => {
            const match = app.categories.includes(category);
            if (match === true) categoryData.push(app);
          });

          return (
            <FormattedTable
              data={categoryData}
              category={category}
              key={category}
            />
          );
        })}
    </div>
  );
};

export default FormattedResults;
