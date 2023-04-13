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
        <p className={classes.infoHeader}>Mobile Energy Efficiency Services</p>
        <p className={classes.info1}>
          The GreenStamp project aims to investigate and develop innovative
          mechanisms <br/> for analyzing and cataloging the energy efficiency of
          mobile applications integrated into app store processes.{" "}
        </p>
        <p className={classes.info2}>
          Pedagogical recommendation systems for developers will also be
          studied, on how to improve the efficiency of their applications, and
          for users, of energy-efficient applications aligned with their
          profile.
        </p>
        <p className={classes.info3}>
          The objective is to reduce at least 20% of the energy consumed by
          applications that follow the technical recommendations proposed and,
          inherently, of the mobile devices where they are installed, thus
          contributing to a significant saving of resources consumed in the
          mobile market.
        </p>
      </div>

      <div className={classes.rightBox}>
        <p className={classes.results}>Test</p>
      </div>
    </Fragment>
  );
};

export default HomePageContent;
