import { Fragment } from "react";
import { analyzeURL } from "../config/api";
import classes from "./HomePageContent.module.css";

const HomePageContent = () => {
  const requestData = () => {
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
    });
  };

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
