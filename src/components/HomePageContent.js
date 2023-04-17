import { Fragment, useEffect, useRef, useState } from "react";
import { analyzeURL } from "../config/api";
import classes from "./HomePageContent.module.css";
import ResultsTable from "./ResultsTable";

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
      <div className={classes.topBox}>
        <img className={classes.logoImg} src="/logo192.png" alt="Logo" />
        <p className={classes.logoHeader}>Mobile Energy Efficiency Services</p>
        <p className={classes.pageHeader}>Green Stamp</p>
        <p className={classes.info1}>
          The GreenStamp project aims to investigate and develop innovative
          mechanisms for analyzing and cataloging the energy efficiency of
          mobile applications integrated into app store processes.
        </p>
      </div>

      <div className={classes.bottomBox}>
        <ResultsTable />
      </div>
    </Fragment>
  );
};

export default HomePageContent;
