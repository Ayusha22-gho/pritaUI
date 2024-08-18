import React from "react";
import Modal from "../Modal/modal";
import Button from "@mui/material/Button";

export default function Configure({
  setIsOpen,
  handleInputChange,
  handleOkClick,
  handleCancelClick,
  inputValue,
  jarPath,
  isOpen,
}) {
  return (
    <>
      <Button
        variant="contained"
        sx={{
          "background-image":
            "linear-gradient(92.88deg, #3a56be 9.16%, #4d3bb1 43.89%, #5135a6 64.72%)",
        }}
        onClick={() => setIsOpen(true)}
      >
        CONFIGURE JAR PATH
      </Button>
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          configureFlag={true}
          handleInputChange={handleInputChange}
          handleOkClick={handleOkClick}
          handleCancelClick={handleCancelClick}
          inputValue={inputValue}
          jarPath={jarPath}
        />
      )}
    </>
  );
}
