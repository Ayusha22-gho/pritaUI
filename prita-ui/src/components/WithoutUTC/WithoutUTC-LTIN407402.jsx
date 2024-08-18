import React from 'react'
import NavBar from '../NavBar/navbar'
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";


export default function WithoutUTC({heading}) {
  return (
    <div class="homeContainer">
      <NavBar/>
      <Card variant="outlined" className="cardContainer">
      <p className="cardHeading">{heading}</p>
      <div className="addBranchContainer">
          <label className="branchLabel">
            Branch
          </label>
          <div  className="branchSearchContainer">
              <textarea
                rows="2"
                cols="65"
              />
            </div>
            <Button variant="contained">Select Folder</Button>
        </div>
      </Card>
    </div>
  )
}
