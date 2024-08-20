import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
  TextField,
  Box,
} from "@mui/material";
export default function selectModal({setRules}) {
  return (
    <div>
       <Dialog open={setRules} onClose={() => setRules(false)}>
            <DialogTitle>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                Select Rules
              </Typography>
            </DialogTitle>
            <DialogContent>
              <div>
                <TextField
                  id="standard-basic"
                  label="EXISTING JAR PATH"
                  variant="standard"
                  multiline
                />
              </div>
              <div>
                <TextField
                  id="standard-basic"
                  label="PLEASE ENTER JAR PATH"
                  variant="standard"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "16px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                >
                  OK
                </Button>
                <Button variant="outlined" onClick={() => setRules(false)}>
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
    </div>
  )
}
