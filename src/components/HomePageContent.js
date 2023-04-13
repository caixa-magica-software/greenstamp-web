import { Fragment, useEffect, useRef, useState } from "react";
import { analyzeURL } from "../config/api";
import classes from "./HomePageContent.module.css";

const HomePageContent = () => {
  const [results, setResults] = useState();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (results !== undefined) hasFetched.current = true;

    if (hasFetched.current === false) {
      fetch(analyzeURL, {
        method: "POST",
        body: JSON.stringify({
          appName: "RTP Notícias",
          packageName: "pt.rtp.noticias.android",
          version: 136,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        const res = response.JSON();
        setResults(res.data);
      });
    }
  }, [results, hasFetched]);

  return (
    <Fragment>
      <div className={classes.leftBox}>
        <img className={classes.logoImg} src="/logo192.png" alt="Logo" />
        <p className={classes.logoHeader}>Mobile Energy Efficiency Services</p>
        <p className={classes.pageHeader}>Green Stamp</p>
      </div>

      <div className={classes.rightBox}>
        <p className={classes.results}>Test</p>
        <p>
          Results:
          <br />
          {results}
        </p>
      </div>
    </Fragment>
  );
};

export default HomePageContent;
