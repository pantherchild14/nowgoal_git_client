import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import HandicapRun from './Handicap';
import X2Run from './1X2';
import OverUnderRun from './OverUnder';

const OddRun = (props) => {
    const { oddDetailHistory } = props;

    let parsedOdds = {};

    const style = {
        title: {
            padding: '10px 0 10px 0',
            textAlign: 'center',
            color: '#000',
            fontSize: "18px",
            fontƯeight: '700',
        },
        scoll: {
            maxHeight: '460px',
            padding: '0 5px',
            overflowY: 'auto',
            display: 'flex',
            alignItems: 'flex-start',
            width: '100%',
        }
    };

    if (oddDetailHistory?.data && oddDetailHistory?.data?.$ && oddDetailHistory?.data?.$?._ODDS) {
        parsedOdds = JSON.parse(oddDetailHistory?.data?.$?._ODDS);
    }

    return (
        <Box>
            <div>
                <div>
                    <Typography style={style.title}>Bet365 Odds Change</Typography>
                    <Box style={style.scoll}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
                            <Grid item xs={4}>
                                <HandicapRun parsedOdds={parsedOdds['ODDS_FT']} />
                            </Grid>
                            <Grid item xs={4}>
                                <X2Run parsedOdds={parsedOdds['ODDS_FT']} />
                            </Grid>
                            <Grid item xs={4}>
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