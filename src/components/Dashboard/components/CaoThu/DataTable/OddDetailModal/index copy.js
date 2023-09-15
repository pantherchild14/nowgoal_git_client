import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import OddsDetailFT from "./OddsDetailFT";
import OddsDetailHT from "./OddsDetailHT";
import Odds1X2DetailFT from "./1X2DetailFT";
import Odds1X2DetailHT from "./1X2DetailHT";
import OddsOUDetailFT from "./OUDetailFT";
import OddsOUDetailHT from "./OUDetailHT";

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
    index: PropTypes.oneOf(["FT", "HT"]).isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const OddDetailModal = (props) => {
    const { open, handleClose, oddDetailHistory } = props;
    const [value, setValue] = useState(0);
    const [subTabValue, setSubTabValue] = useState("FT");

    useEffect(() => {
        setValue(0);
        setSubTabValue("FT");
    }, [open]);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        setSubTabValue("FT");
    };


    const style = {
        Box: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            overflow: 'hidden',
            width: '600px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 1,
        },
    };


    let parsedOdds = {};

    // console.log(oddDetailHistory);
    if (oddDetailHistory?.data && oddDetailHistory?.data && oddDetailHistory?.data?._ODDS) {
        parsedOdds = JSON.parse(oddDetailHistory?.data?._ODDS);

    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style.Box}>
                {oddDetailHistory.isLoading ? (
                    <CircularProgress />
                ) : (
                    <div>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleTabChange}>
                                    <Tab label="AH Odds" {...a11yProps(0)} />
                                    <Tab label="1x2 Odds" {...a11yProps(1)} />
                                    <Tab label="Over/under Odds" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                        </Typography>
                        {value === 0 && (
                            <div>
                                <Tabs value={subTabValue} onChange={(event, newValue) => setSubTabValue(newValue)}>
                                    <Tab label="FT" value="FT" />
                                    <Tab label="HT" value="HT" />
                                </Tabs>
                                {subTabValue === "FT" ? (
                                    <CustomTabPanel value={subTabValue} index="FT">
                                        <OddsDetailFT parsedOdds={parsedOdds['ODDS_FT']} />
                                    </CustomTabPanel>
                                ) : (
                                    <CustomTabPanel value={subTabValue} index="HT">
                                        <OddsDetailHT parsedOdds={parsedOdds['ODDS_HT']} />
                                    </CustomTabPanel>
                                )}
                            </div>
                        )}
                        {value === 1 && (
                            <div>
                                <Tabs value={subTabValue} onChange={(event, newValue) => setSubTabValue(newValue)}>
                                    <Tab label="FT" value="FT" />
                                    <Tab label="HT" value="HT" />
                                </Tabs>
                                {subTabValue === "FT" ? (
                                    <CustomTabPanel value={subTabValue} index="FT">
                                        <Odds1X2DetailFT parsedOdds={parsedOdds['ODDS_FT']} />
                                    </CustomTabPanel>
                                ) : (
                                    <CustomTabPanel value={subTabValue} index="HT">
                                        <Odds1X2DetailHT parsedOdds={parsedOdds['ODDS_HT']} />
                                    </CustomTabPanel>
                                )}
                                {/* Render content for 1x2 Odds sub-tabs */}
                            </div>
                        )}
                        {value === 2 && (
                            <div>
                                <Tabs value={subTabValue} onChange={(event, newValue) => setSubTabValue(newValue)}>
                                    <Tab label="FT" value="FT" />
                                    <Tab label="HT" value="HT" />
                                </Tabs>
                                {subTabValue === "FT" ? (
                                    <CustomTabPanel value={subTabValue} index="FT">
                                        <OddsOUDetailFT parsedOdds={parsedOdds['ODDS_FT']} />
                                    </CustomTabPanel>
                                ) : (
                                    <CustomTabPanel value={subTabValue} index="HT">
                                        <OddsOUDetailHT parsedOdds={parsedOdds['ODDS_HT']} />
                                    </CustomTabPanel>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </Box>
        </Modal>

    );
}

export default OddDetailModal;
