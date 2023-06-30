import axios from "axios";
import { analyzeApp } from "config/api";
import { Fragment, useState } from "react";

const AnalyzeApp = (props) => {
  const packageName = props.package;
  const [request, setRequest] = useState(false);
  const [success, setSuccess] = useState(false);
  const [color, setColor] = useState({ color: "green" });

  const Analyze = async () => {
    try {
      const analyzeRes = await axios.post(analyzeApp, {
        packageName: packageName.current.value,
      });

      if (!analyzeRes) return;

      setRequest(true);
      setTimeout(() => {
        setRequest(false);
      }, 5000);

      if (analyzeRes.status !== 200) return;

      setSuccess(true);
      setColor({ color: "green" });
      setTimeout(() => {
        setSuccess(false);
        setColor({ color: "red" });
      }, 5000);
    } catch {
      setRequest(true);
      setTimeout(() => {
        setRequest(false);
      }, 5000);
    }
  };

  return (
    <Fragment>
      <button onClick={Analyze}>
        <img src="/image.png" alt="search" />
      </button>
      {request === true && (
        <h2 style={color}>
          {success === true
            ? "App sent to analyzers! Results will be visible in results page as soon the test finished. Some test take so long. Please be patiente."
            : "Failed to send app to analyzers!"}
        </h2>
      )}
    </Fragment>
  );
};

export default AnalyzeApp;
