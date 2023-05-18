import axios from "axios";
import { dbGetAll } from "config/api";
import { useEffect, useState } from "react";
import ResultsTable from "./ResultsTable";

const Results = () => {
  const [data, setData] = useState();
  const [categories, setCategories] = useState();

  // Fetches formatted app data with rankings
  const fetchResults = async () => {
    const res = await axios.get(dbGetAll);
    const response = res.data;
    setData(response);

    // finds all categories and pushes them into an array
    let categoriesArray = [];
    response.forEach((app) => {
      if (!categoriesArray.includes(app.category))
        categoriesArray.push(app.category);
    });

    // sorts categories alphabetically, leaving "other" at the end
    categoriesArray.sort((a, b) => {
      if (a === "other") return 1;
      if (b === "other") return -1;
      return a.localeCompare(b);
    });
    setCategories(categoriesArray);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div>
      {categories !== undefined &&
        categories.map((category) => {
          let categoryData = [];
          data.forEach((app) => {
            if (app.category === category) categoryData.push(app);
          });

          return (
            <ResultsTable
              data={categoryData}
              category={category}
              key={category}
            />
          );
        })}
    </div>
  );
};

export default Results;
