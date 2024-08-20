import React,{useEffect,useState} from "react";
import axios from "axios";
import NavBar from "../NavBar/navbar";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

let id =0;
function createData( branchName, testCases) {
  id+=1;
  return { id, branchName, testCases };
}


const rows = [
  createData( "fnrkdnfvdsgv","fednfvife")
];

export default function WithoutUTC({ heading }) {
  let navigate = useNavigate();
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    // Fetch data from backend
    axios.get('http://localhost:8080/api/excel-without-tc-data')
      .then(response => {
        setExcelData(response.data);  // Set the data into state
      })
      .catch(error => {
        console.error("There was an error fetching the Excel data!", error);
      });
  }, []);

  return (
    <div class="homeContainer">
      <NavBar />
      <Card variant="outlined" className="cardContainer">
        <p className="cardHeading">{heading}</p>
        <div className="addBranchContainer">
          <label className="branchLabel">Branch</label>
          <div className="branchSearchContainer">
            <textarea rows="2" cols="65" />
          </div>
          <Button variant="contained">Select Folder</Button>
        </div>
        <div className="tableWithoutUTContainer">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {excelData.length > 0 &&
                        Object.keys(excelData[0]).map((key) => (
                          <TableCell key={key} sx={{'font-weight': '700'}}>{key}</TableCell>
                        ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {excelData.map((row, index) => (
                      <TableRow key={index}>
                        {Object.values(row).map((cell, idx) => (
                          <TableCell key={idx}>{cell}</TableCell>
                        ))}
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="withoutUtcbutton">
          <Button variant="contained" onClick={()=>navigate("/preSIT")}>BACK</Button>
          <Button variant="contained">SAVE</Button>
        </div>
      </Card>
    </div>
  );
}
