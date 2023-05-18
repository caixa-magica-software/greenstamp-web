import { useRef } from "react";
import FormattedResults from "./FormattedResults";
import classes from "./HomePageContent.module.css";
import Results from "./Results";

const HomePageContent = () => {
  const reload = () => {
    window.location.reload();
  };

  const rankRef = useRef(null);
  const advRef = useRef(null);

  const executeScroll = () => advRef.current.scrollIntoView();
  const executeScrollToTop = () => rankRef.current.scrollIntoView();
  // run this function from an event handler or an effect to execute scroll

  return (
    <div className={classes.body}>
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
        <p ref={rankRef} className={classes.rankingText}>
          Ranking
        </p>
        <p className={classes.advancedText} onClick={executeScroll}>
          Advanced Results
        </p>
        <FormattedResults />
        <p ref={advRef} className={classes.resultsText}>
          Advanced Results
        </p>
        <p className={classes.resultsText} onClick={executeScrollToTop}>
          Ranking
        </p>
        <Results />
      </div>
    </div>
  );
};

export default HomePageContent;
