import { analyzeURL } from "config/api";
import { Fragment, useEffect, useRef, useState } from "react";

const AnalyzerTester = () => {
  const URL = analyzeURL;
  const hasFetchedData = useRef(false);
  const [results, setResults] = useState(undefined);

  useEffect(() => {
    if (hasFetchedData.current === false) {
      fetch(URL, {
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
        if (response) {
          const res = response.json();
          if (res.data !== undefined) setResults(res.data);
          else setResults("Status " + response.status);
        }
      });

      hasFetchedData.current = true;
    }
  });

  return <Fragment>{results !== undefined && <div>{results}</div>}</Fragment>;
};

export default AnalyzerTester;
