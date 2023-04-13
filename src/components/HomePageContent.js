import { Fragment } from "react";
import classes from "./HomePageContent.module.css";

const HomePageContent = () => {
  return (
    <Fragment>
      <div className={classes.leftBox}>
        <img className={classes.logoImg} src="/logo192.png" alt="Logo" />
        <p className={classes.logoHeader}>Mobile Energy Efficiency Services</p>
        <p className={classes.pageHeader}>Green Stamp</p>
      </div>

      <div className={classes.rightBox}>
        <p className={classes.results}>Test</p>
      </div>
    </Fragment>
  );
};

export default HomePageContent;
