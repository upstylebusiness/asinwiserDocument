import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HomePage from '../Screen/HomePage/HomePage';
import HomePage1 from '../Screen/HomePage/HomePage1';
import HomePage2 from '../Screen/HomePage/HomePage2';
import { useNavigate } from 'react-router-dom';

function TabPanel(props) {
  const navigate = useNavigate();
  const { children, value, index, ...other } = props;
  let adminExit = localStorage.getItem("loginInfo")
  ? JSON.parse(localStorage.getItem("loginInfo"))
  : null;
React.useEffect(() => {
  if (adminExit) {
    if (adminExit.isUserExist.isAdmin) {
      navigate("/");
    } else {
      navigate("/home");
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
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function DocumentsTab() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Video Link" {...a11yProps(0)} />
          <Tab label="Document Upload" {...a11yProps(1)} />
          {/* <Tab label="Drive Document Link" {...a11yProps(2)} /> */}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <HomePage/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <HomePage2/>
          {/* <HomePage1/> */}
          {/* <Typography variant="h4" component="h2" align="center">PROCCESING</Typography> */}
        </TabPanel>
        {/* <TabPanel value={value} index={2} dir={theme.direction}>
         <HomePage2/>
        </TabPanel> */}
      </SwipeableViews>
    </Box>
  );
}
