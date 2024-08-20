import React, { useEffect, useState, useContext } from "react";
import "./home.css";
import axios from "axios";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NavBar from "../NavBar/navbar";
import Configure from "../ConfigurePath/Configure";
import SelectModal from "../Modal/selectModal";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

function HomeScreen({ heading }) {
  const [branches, setBranches] = useState([]);
  const { searchResults, setSearchResults } = useContext(SearchContext);
  const [isOpen, setIsOpen] = useState(false);
  const [rules,setRules] = useState(false)
  const [jarPath, setJarPath] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [command, setCommand] = useState("");
  const [excelData, setExcelData] = useState([]);

  let navigate = useNavigate();
  useEffect(() => {
    const existingPath = localStorage.getItem("JarPath") || "";
    console.log("in useeffect block");
    setJarPath(existingPath);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleOkClick = () => {
    if (inputValue.trim().length < 3) {
      alert("Please Provide New Jar Path Else Press Cancel Button");
      return;
    }
    localStorage.setItem("JarPath", inputValue);
    const testPathValue = localStorage.getItem("JarPath");
    alert("JarPath Has Been Set To: " + testPathValue);
    setJarPath(testPathValue);
    setIsOpen(false);
  };
  const handleCancelClick = () => {
    setInputValue("");
  };

  const handleRunClick = async () => {
    if (jarPath.trim().length < 1) {
      alert("Please provide the Jar Path.");
      return;
    }
    alert("Rule scanning is in progress");

    await axios
      .post("http://localhost:8080/run-command", { jarPath })
      .then((response) => {
        alert("Impacted Rules Without Unit Test Cases  has been completed");
        console.log(response.data);
        setSearchResults(response.data.stdout);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);
      });
  };

  const saveBranchName = async () => {
    await axios
      .post("http://localhost:8080/save-branch", { branches })
      .then((response) => {
        alert("Branches Saved");
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);
      });
  };

  const addBranch = () => {
    if (branches.length < 5) {
      setBranches([...branches, ""]);
      console.log("tab ", branches);
    }
  };
  const updateBranchContent = (id, value) => {
    const updatedTabs = [...branches];
    updatedTabs[id] = value;
    setBranches(updatedTabs);
    console.log(branches);
  };
  const removeBranch = (index) => {
    // const newTextArea = [...branches];
    // newTextArea.splice(index, 1);
    // setBranches(newTextArea);
    const removedBranch = branches.filter((_, element) => element !== index);
    setBranches(removedBranch);
    console.log(branches);
  };
  const resetSearchResult = () => {
    setSearchResults(null);
  };

  const showImpactedRulesWithUTC = async () => {
    await axios
      .get("http://localhost:8080/api/excel-data")
      .then((response) => {
        setExcelData(response.data); // Set the data into state
      })
      .catch((error) => {
        console.error("There was an error fetching the Excel data!", error);
      });
  };

  return (
    <div class="homeContainer">
      <NavBar />
      <Card variant="outlined" className="cardContainer">
        <p className="cardHeading">{heading}</p>
        <div className="addBranchContainer">
          <label className="branchLabel">
            Add The Number of Impacted Branch:
          </label>
          <button
            onClick={addBranch}
            disabled={branches.length >= 5}
            className="branchButton"
          >
            +
          </button>
        </div>
        <div>
          {branches.length > 0 ? (
            <div className="branchLabel">
              <label>Input Branch Name :</label>
            </div>
          ) : null}

          {branches.map((tab, index) => (
            <>
              <div key={index} className="branchNameContainer">
                <span className="branchNumbers">Branch #{index + 1}</span>
                <textarea
                  value={tab}
                  onChange={(e) => updateBranchContent(index, e.target.value)}
                  rows="2"
                  cols="50"
                />
                <button
                  onClick={() => removeBranch(index)}
                  className="branchRemoveButton"
                >
                  Remove
                </button>
              </div>
            </>
          ))}
          {branches.length > 0 ? (
            <button className="branchSaveButton" onClick={saveBranchName}>
              Save Branch Name
            </button>
          ) : null}
        </div>

        <div className="branchButtons">
          <Configure
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            configureFlag={true}
            handleInputChange={handleInputChange}
            handleOkClick={handleOkClick}
            handleCancelClick={handleCancelClick}
            inputValue={inputValue}
            jarPath={jarPath}
          />
          <Button variant="contained" onClick={resetSearchResult}>
            RESET
          </Button>
          <Button variant="contained" onClick={handleRunClick}>
            SEARCH IMPACTED RULES
          </Button>
          <Button variant="contained">CLOSE</Button>
        </div>

        <div>
          {searchResults && (
            <>
              <h3>Search Result</h3>
              <p>{searchResults}</p>
              <div>
                <table>
                  <thead>
                    <tr>
                      {excelData.length > 0 &&
                        Object.keys(excelData[0]).map((key) => (
                          <th key={key}>{key}</th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {excelData.map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((cell, idx) => (
                          <td key={idx}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="branchButtons">
                <Button variant="contained" onClick={showImpactedRulesWithUTC}>
                  IMPACTED RULES WITH UTC
                </Button>
                <Button variant="outlined" onClick={()=>setRules(true)} >
                  VIEW SELECT RULES PAGE
                </Button>
                {rules && <SelectModal setRules={setRules}/>}
                <Button
                  variant="contained"
                  onClick={() => navigate("/rules-without-utc")}
                >
                  IMPACTED RULES WITHOUT UTC
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
export default HomeScreen;
