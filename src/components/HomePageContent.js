import { Fragment, useRef, useState } from "react";
import FormattedResults from "./FormattedResults";
import classes from "./HomePageContent.module.css";
import Results from "./Results";
import AnalyzeApp from "./AnalyzeApp";

const HomePageContent = () => {
  const packageNameRef = useRef();
  const [appRanking, setAppRanking] = useState(classes.activeTab);
  const [advResults, setAdvResults] = useState(classes.inactiveTab);
  const [analyzeBox, setAnalyzeBox] = useState(classes.inactiveTab);
  const [tab, setTab] = useState(0);

  // Tab Switcher
  const switchTabs = (e) => {
    if (tab === parseInt(e.target.value)) return;
    switch (e.target.value) {
      case "0":
        setAppRanking(classes.activeTab);
        setAdvResults(classes.inactiveTab);
        setAnalyzeBox(classes.inactiveTab);
        setTab(0);
        break;
      case "1":
        setAppRanking(classes.inactiveTab);
        setAdvResults(classes.activeTab);
        setAnalyzeBox(classes.inactiveTab);
        setTab(1);
        break;
      case "2":
        setAppRanking(classes.inactiveTab);
        setAdvResults(classes.inactiveTab);
        setAnalyzeBox(classes.activeTab);
        setTab(2);
        break;
      default:
        break;
    }
  };

  const reload = () => {
    window.location.reload();
  };

  // Back to Top
  const topRef = useRef(null);
  const toTop = () => topRef.current.scrollIntoView();

  return (
    <div>
      <div className={classes.topBox} ref={topRef}>
        <img
          className={classes.logoImg}
          onClick={reload}
          src="/logo192.png"
          alt="Greenstamp Logo"
        />
        <p className={classes.logoHeader}>Mobile Energy Efficiency Services</p>
        <p className={classes.pageHeader}>Greenstamp</p>
        <p className={classes.info1}>
          The GreenStamp project aims to investigate and develop innovative
          mechanisms for analyzing and cataloging the energy efficiency of
          mobile applications integrated into app store processes.
        </p>
      </div>

      <div className={classes.bottomBox}>
        <div className={classes.selecterBox}>
          <button value={0} className={appRanking} onClick={switchTabs}>
            App Ranking
          </button>
          <button value={1} className={advResults} onClick={switchTabs}>
            Advanced Results
          </button>
          <button value={2} className={analyzeBox} onClick={switchTabs}>
            Analyze Package
          </button>
        </div>
      </div>

      {tab === 2 && (
        <div className={classes.bottomBoxAlt}>
          <div className={classes.searchBox}>
            <input
              type="text"
              placeholder="Package Name"
              ref={packageNameRef}
            />
            <AnalyzeApp package={packageNameRef} />
          </div>
          <p className={classes.helpText}>
            To get an app's package name, find it on the{" "}
            <a
              href="https://en.aptoide.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aptoide app store
            </a>
          </p>
          <p className={classes.helpText}>
            Go to the app's 'Info' section and copy the text next to 'Package'.
          </p>
          <img
            className={classes.helpImg}
            src="packageName.png"
            alt="Package Name Example"
          />
          <br />
          <br />
          <p className={classes.linkText} onClick={toTop}>
              Back to top 🠕
            </p>
        </div>
      )}
      {tab === 0 && (
        <Fragment>
          <div className={classes.bottomBoxAlt}>
            <FormattedResults />
            <br />
            <br />
            <p className={classes.linkText} onClick={toTop}>
              Back to top 🠕
            </p>
          </div>
        </Fragment>
      )}
      {tab === 1 && (
        <Fragment>
          <div className={classes.bottomBoxAlt}>
            <Results />
            <br />
            <br />
            <p className={classes.linkText} onClick={toTop}>
              Back to top 🠕
            </p>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default HomePageContent;
