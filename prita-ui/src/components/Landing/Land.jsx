import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "../Modal/modal";
import "./landing.css"

const Item = styled(motion(Paper))(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Land() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} mt={8} alignItems={"center"}>
        <Grid item xs={6}>
          <img src ="Cognizant-Logo.png" className="launchLogo"/>
          <Typography variant="h3" align="center" fontWeight="bold">
            Pega Rule Impact
          </Typography>
          <Typography
            variant="h3"
            align="center"
            fontWeight="bold"
            color="primary"
          >
            Test Accelerator
          </Typography>
          <Typography variant="h6" align="center" mt={2} fontWeight="bold">
            PRITA
          </Typography>
          <Grid container mt={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsOpen(true)}
              >
                Launch
              </Button>
              {isOpen && <Modal setIsOpen={setIsOpen} configureFlag={false} />}
            </Grid>
          </Grid>
        </Grid>
        <Grid conatiner xs={6}>
          <Grid container >
            <Grid item xs={10} marginBottom={"4px"}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ duration: 0.5 }}
              >
                <Item>
                  <Typography variant="h5" align="center" fontWeight="bold">
                    Coworking made simple
                  </Typography>
                  <Typography variant="body1" align="center" mt={1}>
                    We are reimagining renting to help you achieve your dreams
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    mt={2}
                  >
                    Learn more
                  </Button>
                </Item>
              </motion.div>
            </Grid>
            <Grid item xs={10} marginLeft={"14%"} marginBottom={"10px"}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ duration: 0.5 }}
              >
                <Item>
                  <Typography variant="h5" align="center" fontWeight="bold">
                    Learn new skills, gain more experience
                  </Typography>
                  <Typography variant="body1" align="center" mt={1}>
                    Learn new skills, gain more experience
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    mt={2}
                  >
                    Learn more
                  </Button>
                </Item>
              </motion.div>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={10} marginBottom={"4px"}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ duration: 0.5 }}
              >
                <Item>
                  <Typography variant="h5" align="center" fontWeight="bold">
                    Guaranted company growth
                  </Typography>
                  <Typography variant="body1" align="center" mt={1}>
                    Guaranted company growth with targeted leads
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    mt={2}
                  >
                    Learn more
                  </Button>
                </Item>
              </motion.div>
            </Grid>
            <Grid item xs={10} marginLeft={"14%"}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ duration: 0.5 }}
              >
                <Item>
                  <Typography variant="h5" align="center" fontWeight="bold">
                    Beautiful data representation
                  </Typography>
                  <Typography variant="body1" align="center" mt={1}>
                    Beautiful data representation built with theFront
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    mt={2}
                  >
                    Learn more
                  </Button>
                </Item>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
