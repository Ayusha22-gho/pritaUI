import React from "react";
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
                  <TableCell sx={{"font-weight":"700"}}>SI#</TableCell>
                  <TableCell align="right" sx={{"font-weight":"700"}}>Branch Name</TableCell>
                  <TableCell align="right" sx={{"font-weight":"700"}}>Rules without Unit Test Cases)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.branchName}</TableCell>
                    <TableCell align="right">{row.testCases}</TableCell>
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
