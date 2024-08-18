// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import "./modal.css";
// import { RiCloseLine } from "react-icons/ri";

// export default function Modal({
//   setIsOpen,
//   configureFlag,
//   handleInputChange,
//   handleOkClick,
//   handleCancelClick,
//   inputValue,
//   jarPath
// }) {
//   const [selected, setSelected] = useState("");
//   let navigate = useNavigate();

//   const handleOptionChange = (event) => {
//     setSelected(event.target.value);
//   };

//   const handleSubmit = () => {
//     if (selected) {
//       navigate("/home");
//     } else {
//       alert("Please Select an option first");
//     }
//   };
//   return (
//     <>
//       {configureFlag ? (
//         <>
//           <div class="darkBG" onClick={() => setIsOpen(false)} />
//           <div class="centered">
//             <div class="modal">
//               <div class="modalConfigurePaths">
//                 <div className="modalPathArea">
//                   <label>EXISTING JAR PATH</label>
//                   <input
//                     type="text"
//                     className="modalInput"
//                     value={jarPath}
//                     readOnly
//                   />
//                 </div>
//                 <div className="modalPathArea">
//                   <label>PLEASE ENTER JAR PATH</label>
//                   <input
//                     type="text"
//                     className="modalInput"
//                     value={inputValue}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
//               <div class="modalActions">
//                 <div class="actionsContainer">
//                   <button class="deleteBtn" onClick={handleOkClick}>OK</button>
//                   <button class="cancelBtn" onClick={() => setIsOpen(false)}>
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <div class="darkBG" onClick={() => setIsOpen(false)} />
//           <div class="centered">
//             <div class="modal">
//               <div class="modalHeader">
//                 <h5 class="heading">PRITA</h5>
//               </div>
//               <button class="closeBtn" onClick={() => setIsOpen(false)}>
//                 <RiCloseLine style={{ marginBottom: "-3px" }} />
//               </button>
//               <div class="modalContent">
//                 <p>Please Select The Action</p>
//               </div>
//               <div class="modalCheckBox">
//                 <div class="modalSIT">
//                   <input
//                     type="radio"
//                     value="option1"
//                     checked={selected === "option1"}
//                     onChange={handleOptionChange}
//                   />
//                   <label for="html">Pre-SIT Testing</label>
//                 </div>
//                 <div class="modalSIT">
//                   <input
//                     type="radio"
//                     value="option2"
//                     checked={selected === "option2"}
//                     onChange={handleOptionChange}
//                   />
//                   <label for="html">SIT Testing</label>
//                 </div>
//               </div>
//               <div class="modalActions">
//                 <div class="actionsContainer">
//                   <button class="deleteBtn" onClick={handleSubmit}>
//                     OK
//                   </button>
//                   <button class="cancelBtn" onClick={() => setIsOpen(false)}>
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

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
import { useNavigate } from "react-router-dom";
import "./modal.css";


const Modal = ({
  setIsOpen,
  configureFlag,
  handleInputChange,
  handleOkClick,
  handleCancelClick,
  inputValue,
  jarPath,
}) => {
  const [selected, setSelected] = useState("");
  const [showMoreOption, setShowMoreOptions] = useState(false);
  const [childOpen, setChildOpen] = useState(true);
  let navigate = useNavigate();

  const handleOptionChange = (event) => {
    setSelected(event.target.value);
    if (event.target.value === "option2") {
      setShowMoreOptions(true);
    } 
  };

  const handleSubmit = () => {
    if (selected === "option1") {
      navigate("/preSIT");
    }else if(selected === "Scenariotest"){
      navigate("/SIT")
    }else if(selected ==="Seleniumscripts"){

    }
    else{
       alert("Please Select an option first");
    }
     
  };

  return (
    <>
      {configureFlag ? (
        <>
          <Dialog open={setIsOpen} onClose={() => setIsOpen(false)}>
            <DialogTitle>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                Set the path to configure file
              </Typography>
            </DialogTitle>
            <DialogContent>
              <div>
                <TextField
                  id="standard-basic"
                  label="EXISTING JAR PATH"
                  variant="standard"
                  multiline
                  defaultValue={jarPath}
                />
              </div>
              <div>
                <TextField
                  id="standard-basic"
                  label="PLEASE ENTER JAR PATH"
                  variant="standard"
                  value={inputValue}
                  onChange={handleInputChange}
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
                  onClick={handleOkClick}
                >
                  OK
                </Button>
                <Button variant="outlined" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          <Dialog open={setIsOpen} onClose={() => setIsOpen(false)}>
            <DialogTitle>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                Select an option to proceed
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>Some text</DialogContentText>
              <RadioGroup value={selected} onChange={handleOptionChange}>
                <FormControlLabel
                  value="option1"
                  checked={selected === "option1"}
                  control={<Radio />}
                  label="Pega Pre-SIT Testing"
                />
                <FormControlLabel
                  value="option2"
                  checked={selected === "option2"}
                  control={<Radio />}
                  label="Pega UI Work Flow Testing"
                />
              </RadioGroup>
              {showMoreOption && (
                <Dialog open={setChildOpen} onClose={() => setChildOpen(false)}>
                  <DialogTitle>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                      Select the type of workflow Test
                    </Typography>
                  </DialogTitle>
                  <DialogContent>
                    <RadioGroup value={selected} onChange={handleOptionChange}>
                      <FormControlLabel
                        value="Scenariotest"
                        checked={selected === "Scenariotest"}
                        control={<Radio />}
                        label="Scenario Test Scripts"
                      />
                      <FormControlLabel
                        value="Seleniumscripts"
                        checked={selected === "Seleniumscripts"}
                        control={<Radio />}
                        label="Selenium Scripts"
                      />
                    </RadioGroup>

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
                        onClick={handleSubmit}
                      >
                        Proceed
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
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
                  onClick={handleSubmit}
                >
                  Proceed
                </Button>
                <Button variant="outlined" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};

export default Modal;
