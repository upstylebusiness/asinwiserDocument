import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import HomeUser from "../../Screen/UserSide/HomeUser";
import HomeUserForDocument from "../../Screen/UserSide/HomeUserForDocument";
import HomeUserStripe from "../../Screen/UserSide/HomeUserStripe";

function TabPanel(props) {
  const navigate = useNavigate();
  const { children, value, index, ...other } = props;

  let adminExit = localStorage.getItem("loginInfo")
    ? JSON.parse(localStorage.getItem("loginInfo"))
    : null;

  useEffect(() => {
    if (adminExit) {
      if (adminExit.isUserExist.isAdmin) {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export const UserTabs = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          style={{
            backgroundImage: "linear-gradient(to right, #c95ad0 , #8870e8)",
          }}
        >
          <Tab label="Stripe" {...a11yProps(0)} />
          <Tab label="Video Links" {...a11yProps(1)} />
          <Tab label="Documents Link" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <HomeUserStripe/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <HomeUser />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <HomeUserForDocument />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
};
