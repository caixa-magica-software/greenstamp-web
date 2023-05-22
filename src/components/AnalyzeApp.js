import axios from "axios";
import { analyzeApp, getAppInfo } from "config/api";
import { Fragment, useState } from "react";

const AnalyzeApp = (props) => {
  const packageName = props.package;
  const [request, setRequest] = useState(false);
  const [success, setSuccess] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [color, setColor] = useState({ color: "red" });

  const Analyze = async () => {
    const infoRes = await axios.get(getAppInfo + packageName.current.value);
    if (!infoRes) return;
    const app = infoRes.data.nodes.meta.data;

    if (infoRes.statusText !== "OK") {
      setInvalid(true);
      setRequest(true);
      setTimeout(() => {
        setInvalid(false);
        setRequest(false);
      }, 5000);
    }

    const analyzeRes = await axios.post(analyzeApp, {
      appName: app.name,
      packageName: app.package,
      version: app.file.vercode,
      forceTest: false,
    });

    if (!analyzeRes) return;
    setRequest(true);
    setTimeout(() => {
      setRequest(false);
    }, 5000);

    if (analyzeRes.statusText !== "OK") return;
    setSuccess(true);
    setColor({ color: "green" });
    setTimeout(() => {
      setSuccess(false);
      setColor({ color: "red" });
    }, 5000);
  };

  return (
    <Fragment>
      <button onClick={Analyze}>
        <img src="/image.png" alt="search" />
      </button>
      {request === true && (
        <p style={color}>
          {success === true
            ? "App sent to analyzers!"
            : invalid === false
            ? "Failed to send app to analyzers!"
            : "No apps match the package name!"}
        </p>
      )}
    </Fragment>
  );
};

export default AnalyzeApp;
