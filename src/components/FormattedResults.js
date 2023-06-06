import axios from "axios";
import { dbGetAllFormatted, getAppInfo } from "config/api";
import { useEffect, useState } from "react";
import FormattedTable from "./FormattedTable";

const FormattedResults = () => {
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
  };

  useEffect(() => {
    fetchFormatted();
  }, []);

  return (
    <div>
      {categories !== undefined &&
        categories.map((category) => {
          let categoryData = [];
          data.forEach(async (app) => {
            const res = await axios.get(getAppInfo + app.package);
            const icon = res.data.nodes.meta.data.icon;

            const allUrls = res.data.nodes.meta.data.urls;
            const urlKey = Object.keys(allUrls)[0];
            let url = allUrls[urlKey];

            let index = url.indexOf(".com");
            if (index !== -1) {
              url = url.substring(0, index + 4);
            }

            app.icon = (
              <a href={url} target="_blank" rel="noopener noreferrer">
                <img
                  style={{
                    height: "40x",
                    width: "40px",
                    marginBottom: "-4px",
                    borderRadius: "3.5px",
                  }}
                  src={icon}
                  alt={app.app_name}
                />
              </a>
            );

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
