import { useRef } from "react";
import FormattedResults from "./FormattedResults";
import classes from "./HomePageContent.module.css";
import Results from "./Results";

const HomePageContent = () => {
  const packageNameRef = useRef();

  const reload = () => {
    window.location.reload();
  };

  const rankRef = useRef(null);
  const advRef = useRef(null);

  const executeScroll = () => advRef.current.scrollIntoView();
  const executeScrollToTop = () => rankRef.current.scrollIntoView();

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
        <div className={classes.searchBox}>
          <input type="text" placeholder="Package Name" ref={packageNameRef} />
          <button>
            <img src="/image.png" alt="search" />
          </button>
        </div>
        <p ref={rankRef} className={classes.rankingText}>
          Ranking
        </p>
        <p className={classes.linkText} onClick={executeScroll}>
          Advanced Results
        </p>
        <FormattedResults />
        <br />
        <br />
        <p ref={advRef} className={classes.resultsText}>
          Advanced Results
        </p>
        <p className={classes.linkText} onClick={executeScrollToTop}>
          Ranking
        </p>
        <Results />
      </div>
    </div>
  );
};

export default HomePageContent;
