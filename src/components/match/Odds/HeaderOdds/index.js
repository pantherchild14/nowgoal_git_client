import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OddsFT from '../OddsTab/OddsFT';
import OddsHT from '../OddsTab/OddsHT';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
    const { ODDS_AH_FT, ODDS_EURO_FT, ODDS_OU_FT, ODDS_AH_HT, ODDS_EURO_HT, ODDS_OU_HT } = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const styles = {
        Tabs: {
            float: 'right',
            marginBottom: '20px',
        },
        Tab: {

        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box  sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value}  onChange={handleChange} style={styles.Tabs}>
                    <Tab label="FT" {...a11yProps(0)} />
                    <Tab label="HT" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <OddsFT ODDS_AH_FT={ODDS_AH_FT} ODDS_EURO_FT={ODDS_EURO_FT} ODDS_OU_FT={ODDS_OU_FT}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <OddsHT ODDS_AH_HT={ODDS_AH_HT} ODDS_EURO_HT={ODDS_EURO_HT} ODDS_OU_HT={ODDS_OU_HT}/>
            </CustomTabPanel>
        </Box>
    );
}