import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/navbar";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Configure from "../ConfigurePath/Configure";
export default function BranchTest({ heading }) {
  const [isOpen, setIsOpen] = useState(false);
  const [jarPath, setJarPath] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [branch, setBranch] = useState("");

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

  const searchImpactedBranch = () => {
    console.log("branch name", branch.length);
    if (branch.length < 1) {
      alert("Please enter branch name to be searched");
      return;
    }
    axios
      .post("http://localhost:8080/sit-branch-name", { branch })
      .then((response) => {
       alert(response.data)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div class="homeContainer">
      <NavBar />
      <Card variant="outlined" className="cardContainer">
        <p className="cardHeading">{heading}</p>
        <div className="addBranchContainer">
          <label className="branchLabel">Branch Name#</label>
          <div className="branchSearchContainer">
            <textarea
              rows="2"
              cols="80"
              onChange={(e) => setBranch(e.target.value)}
            />
          </div>
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
          <Button variant="contained" onClick={searchImpactedBranch}>
            Search Impacted Branch
          </Button>
          <Button variant="contained">CLOSE</Button>
        </div>

        <div>
          <h3>List of Scenarios: </h3>
          <div className="branchButtons">
            <Button variant="contained" disabled>
              View Search Result
            </Button>
            <Button variant="contained" disabled>
              Select Workflow Test Scenarios
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
