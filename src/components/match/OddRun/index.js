import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import HandicapRun from './Handicap';
import X2Run from './1X2';
import OverUnderRun from './OverUnder';

const OddRun = (props) => {
    const { oddDetailHistory } = props;

    let parsedOdds = {};

    const style = {
        title: {
            background: '#75788C',
            textAlign: 'center',
            color: 'white',
            padding: '5px',
        }
    };

    if (oddDetailHistory?.data && oddDetailHistory?.data?.$ && oddDetailHistory?.data?.$?._ODDS) {
        parsedOdds = JSON.parse(oddDetailHistory?.data?.$?._ODDS);
    }

    return (
        <Box>
            <div>
                <div>
                    <Box sx={{ width: '100%' }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={4}>
                                <Typography style={style.title}>Tỷ Lệ kèo Handicap Bet365</Typography>
                                <HandicapRun parsedOdds={parsedOdds['ODDS_FT']} />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography style={style.title}>Tỷ lệ kèo Châu Âu Bet365</Typography>
                                <X2Run parsedOdds={parsedOdds['ODDS_FT']} />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography style={style.title}>Tỷ lệ kèo Tài/Xỉu Bet365</Typography>
                                <OverUnderRun parsedOdds={parsedOdds['ODDS_FT']} />
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </div>
        </Box>
    );
}

export default OddRun;