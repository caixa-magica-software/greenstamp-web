import { Fragment } from "react";
import classes from "./HomePageContent.module.css";
import ResultsTable from "./ResultsTable";
import AnalyzerTester from "./AnalyzerTester";

const HomePageContent = () => {
  const reload = () => {
    window.location.reload();
  };

  return (
    <Fragment>
      <div className={classes.topBox}>
        <img
          className={classes.logoImg}
          onClick={reload}
          src="/logo192.png"
          alt="Logo"
        />
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
        <AnalyzerTester />
      </div>
    </Fragment>
  );
};

export default HomePageContent;
