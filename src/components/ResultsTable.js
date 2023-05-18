import { useMemo, useEffect, useRef, useState, useCallback } from "react";
import classes from "./ResultsTable.module.css";
import axios from "axios";
import CategoryTable from "./CategoryTable";
import { dbGetAll } from "config/api";

const ResultsTable = () => {
  const hasFetched = useRef(false);

  const [newsMagazinesArray, setNewsMagazinesArray] = useState([
    { app_name: " " },
  ]);
  const [communicationArray, setCommunicationArray] = useState([
    { app_name: " " },
  ]);
  const [financeArray, setFinanceArray] = useState([{ app_name: " " }]);
  const [toolsArray, setToolsArray] = useState([{ app_name: " " }]);
  const [entertainmentArray, setEntertainmentArray] = useState([
    { app_name: " " },
  ]);
  const [musicAudioArray, setMusicAudioArray] = useState([{ app_name: " " }]);
  const [healthFitnessArray, setHealthFitnessArray] = useState([
    { app_name: " " },
  ]);
  const [socialArray, setSocialArray] = useState([{ app_name: " " }]);
  const [mapsNavigationArray, setMapsNavigationArray] = useState([
    { app_name: " " },
  ]);
  const [travelLocalArray, setTravelLocalArray] = useState([{ app_name: " " }]);
  const [businessArray, setBusinessArray] = useState([{ app_name: " " }]);

  const columns = useMemo(
    () => [
      {
        Header: "App",
        accessor: "app_name",
      },
      {
        Header: "Package",
        accessor: "package",
      },
      {
        Header: "Version",
        accessor: "version",
      },
      {
        Header: "Date",
        accessor: "timestamp",
      },
      {
        Header: "Test",
        accessor: "test_name",
      },
      {
        Header: "Parameter",
        accessor: "test_parameter",
      },
      {
        Header: "Result",
        accessor: "test_result",
        id: "test_result",
        sortType: (rowA, rowB) => {
          // Get the values of the cells in this column for rowA and rowB
          let a = rowA.values.test_result;
          let b = rowB.values.test_result;

          // Check if both values are numbers
          if (!isNaN(a) && !isNaN(b)) {
            // If both values are numbers, compare them as numbers
            return a - b;
          } else if (!isNaN(a)) {
            // If only a is a number, sort it first
            return -1;
          } else if (!isNaN(b)) {
            // If only b is a number, sort it first
            return 1;
          } else {
            // If neither value is a number, compare them as strings
            return a.localeCompare(b);
          }
        },
      },
    ],
    []
  );

  const newsMagazines = useMemo(() => newsMagazinesArray, [newsMagazinesArray]);
  const communication = useMemo(() => communicationArray, [communicationArray]);
  const finance = useMemo(() => financeArray, [financeArray]);
  const tools = useMemo(() => toolsArray, [toolsArray]);
  const entertainment = useMemo(() => entertainmentArray, [entertainmentArray]);
  const musicAudio = useMemo(() => musicAudioArray, [musicAudioArray]);
  const healthFitness = useMemo(() => healthFitnessArray, [healthFitnessArray]);
  const social = useMemo(() => socialArray, [socialArray]);
  const mapsNavigation = useMemo(
    () => mapsNavigationArray,
    [mapsNavigationArray]
  );
  const travelLocal = useMemo(() => travelLocalArray, [travelLocalArray]);
  const business = useMemo(() => businessArray, [businessArray]);

  const fetchData = useCallback(async () => {
    if (hasFetched.current === true) return;

    try {
      let newsMagazines = [];
      let communication = [];
      let finance = [];
      let tools = [];
      let entertainment = [];
      let musicAudio = [];
      let healthFitness = [];
      let social = [];
      let mapsNavigation = [];
      let travelLocal = [];
      let business = [];

      const res = await axios.get(dbGetAll);
      let responseData = res.data;
      hasFetched.current = true;

      // formats date
      responseData.forEach((element) => {
        if (element.test_result === null) element.test_result = "X";
        
        let e1 = element.timestamp.replace(/[-]/g, "/");
        let e2 = e1.replace("T", " ");
        element.timestamp = e2.replace(".000Z", "");

        switch (element.category) {
          case "news-magazines":
            newsMagazines.push(element);
            break;
          case "communication":
            communication.push(element);
            break;
          case "finance":
            finance.push(element);
            break;
          case "tools":
            tools.push(element);
            break;
          case "entertainment":
            entertainment.push(element);
            break;
          case "music-audio":
            musicAudio.push(element);
            break;
          case "health-fitness":
            healthFitness.push(element);
            break;
          case "social":
            social.push(element);
            break;
          case "maps-navigation":
            mapsNavigation.push(element);
            break;
          case "travel-local":
            travelLocal.push(element);
            break;
          case "business":
            business.push(element);
            break;
          default:
            break;
        }
      });

      if (newsMagazinesArray[0].app_name === " ") {
        setNewsMagazinesArray(newsMagazines);
      }
      if (communicationArray[0].app_name === " ") {
        setCommunicationArray(communication);
      }
      if (financeArray[0].app_name === " ") {
        setFinanceArray(finance);
      }
      if (toolsArray[0].app_name === " ") {
        setToolsArray(tools);
      }
      if (entertainmentArray[0].app_name === " ") {
        setEntertainmentArray(entertainment);
      }
      if (musicAudioArray[0].app_name === " ") {
        setMusicAudioArray(musicAudio);
      }
      if (healthFitnessArray[0].app_name === " ") {
        setHealthFitnessArray(healthFitness);
      }
      if (socialArray[0].app_name === " ") {
        setSocialArray(social);
      }
      if (mapsNavigationArray[0].app_name === " ") {
        setMapsNavigationArray(mapsNavigation);
      }
      if (travelLocalArray[0].app_name === " ") {
        setTravelLocalArray(travelLocal);
      }
      if (businessArray[0].app_name === " ") {
        setBusinessArray(business);
      }
    } catch (err) {
      console.log(err);
    }
  }, [
    businessArray,
    communicationArray,
    entertainmentArray,
    financeArray,
    healthFitnessArray,
    mapsNavigationArray,
    musicAudioArray,
    newsMagazinesArray,
    socialArray,
    toolsArray,
    travelLocalArray,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={classes.tablePosition}>
      <CategoryTable
        category={"News & Magazines"}
        columns={columns}
        data={newsMagazines}
        sortID={"test_result"}
      />
      <CategoryTable
        category={"Communication"}
        columns={columns}
        data={communication}
        sortID={"test_result"}
      />
      <CategoryTable
        category={"Finance"}
        columns={columns}
        data={finance}
        sortID={"test_result"}
      />
      <CategoryTable
        category={"Tools"}
        columns={columns}
        data={tools}
        sortID={"test_result"}
      />
      <CategoryTable
        category={"Entertainment"}
        columns={columns}
        data={entertainment}
        sortID={"test_result"}
      />
      <CategoryTable
        category={"Music & Audio"}
        columns={columns}
        data={musicAudio}
        sortID={"test_result"}
      />
      <CategoryTable
        category={"Health & Fitness"}
        columns={columns}
        data={healthFitness}
        sortID={"test_result"}
      />
      <CategoryTable
        category={"Social"}
        columns={columns}
        data={social}
        sortID={"test_result"}
      />
      <CategoryTable
        category={"Maps & Navigation"}
        columns={columns}
        data={mapsNavigation}
        sortID={"test_result"}
      />
      <CategoryTable
        category={"Travel Local"}
        columns={columns}
        data={travelLocal}
        sortID={"test_result"}
      />
      <CategoryTable
        category={"Business"}
        columns={columns}
        data={business}
        sortID={"test_result"}
      />
    </div>
  );
};

export default ResultsTable;
