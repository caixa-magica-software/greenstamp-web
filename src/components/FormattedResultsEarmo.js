import axios from "axios";
import { dbGetAllFormattedEarmo, getAppInfo } from "config/api";
import { useEffect, useState, useRef } from "react";
import FormattedTable from "./FormattedTable";

const FormattedResults = () => {
  const [data, setData] = useState();
  const [categories, setCategories] = useState();
  const fetched = useRef(false);

  // Fetches formatted app data with rankings
  const fetchFormatted = async () => {
    const res = await axios.get(dbGetAllFormattedEarmo);
    const response = res.data.data;

    let updatedApps = [];
    for (const app of response) {
      const res = await axios.get(getAppInfo + app.package);
      const allUrls = res.data.data.nodes.meta.data.urls;
      const urlKey = Object.keys(allUrls)[0];
      updatedApps.push({
        ...app,
        appUrl: allUrls[urlKey],
        appIcon: res.data.data.nodes.meta.data.icon,
      });
    }

    // finds all categories and pushes them into an array
    let categoriesArray = [];
    updatedApps.forEach((app) => {
      if (typeof app.categories === "string") {
        app.categories = JSON.parse(app.categories);
      }
      if (app.categories === null) {
        app.categories = ["other"];
      }
      if (app.stars === null || app.stars === undefined) {
        app.stars = "★0";
      } else app.stars = "★" + Math.round(app.stars * 10) / 10;

      app.categories.forEach((category) => {
        if (categoriesArray.includes(category)) return;
        categoriesArray.push(category);
      });
    });

    setData(updatedApps);

    // sorts categories alphabetically, leaving "other" at the end
    categoriesArray.sort((a, b) => {
      if (a === "other") return 1;
      if (b === "other") return -1;
      return a.localeCompare(b);
    });
    setCategories(categoriesArray);
  };

  useEffect(() => {
    if (fetched.current === true) return;
    fetched.current = true;
    fetchFormatted();
  }, []);

  return (
    <div>
      {categories !== undefined &&
        categories.map((category) => {
          let categoryData = [];
          data.forEach(async (app) => {
            const icon = app.appIcon;
            let url = app.appUrl;

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

            const match = app.categories?.includes(category);
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
