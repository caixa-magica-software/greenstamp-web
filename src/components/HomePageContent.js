import { Fragment } from "react";
import { analyzeURL } from "../config/api";

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
      <p>Hello World</p>
    </Fragment>
  );
};

export default HomePageContent;
