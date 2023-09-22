import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import HandicapRun from './Handicap';
import X2Run from './1X2';
import OverUnderRun from './OverUnder';

const OddRun = (props) => {
    const { oddDetailHistory, threeIn1, matchID } = props;

    let parsedOdds = {};
    let parsedOddsRun = null;

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

    if (Array.isArray(threeIn1) && threeIn1.length > 0) {
        try {
            parsedOddsRun = JSON.parse(threeIn1);
        } catch (error) {
            // Handle the JSON parsing error here if needed
            console.error("Error parsing JSON data:", error.message);
        }
    }

    if (oddDetailHistory?.data && oddDetailHistory?.data?.$ && oddDetailHistory?.data?.$?._ODDS) {
        parsedOdds = JSON.parse(oddDetailHistory?.data?.$?._ODDS);
    }


    return (
        <Box>
            <div>
                <div>
                    <Typography style={style.title}>Bet365 Odds Change</Typography>
                    <Box style={style.scoll}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }} id={`oddRun_${matchID}`}>
                            <Grid item xs={4}>
                                {parsedOddsRun && parsedOddsRun['ODDS_FT'] ? (
                                    <HandicapRun parsedOddsRun={parsedOddsRun['ODDS_FT']} parsedOdds={parsedOdds['ODDS_FT']} />
                                ) : (
                                    <HandicapRun parsedOdds={parsedOdds['ODDS_FT']} />
                                )}
                            </Grid>

                            <Grid item xs={4}>
                                {parsedOddsRun && parsedOddsRun['ODDS_FT'] ? (
                                    <X2Run parsedOddsRun={parsedOddsRun['ODDS_FT']} parsedOdds={parsedOdds['ODDS_FT']} />
                                ) : (
                                    <X2Run parsedOdds={parsedOdds['ODDS_FT']} />
                                )}
                            </Grid>
                            <Grid item xs={4}>
                                {parsedOddsRun && parsedOddsRun['ODDS_FT'] ? (
                                    <OverUnderRun parsedOddsRun={parsedOddsRun['ODDS_FT']} parsedOdds={parsedOdds['ODDS_FT']} />
                                ) : (
                                    <OverUnderRun parsedOdds={parsedOdds['ODDS_FT']} />
                                )}
                            </Grid>

                        </Grid>
                    </Box>
                </div>
            </div>
        </Box>
    );
}

export default OddRun;