import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

import H2H from "./components/H2H";
import HomeAnalysis from "./components/HomeAnalysis";
import AwayAnalysis from "./components/AwayAnalysis";



const Analysis = (props) => {
  // updateStatisticsAnaly
  const { schedules, h2h, h2hIO } = props;



  let parsedOddsRun = null;
  if (h2hIO) {
    try {
      parsedOddsRun = (h2hIO);
    } catch (error) {
      // Handle the JSON parsing error here if needed
      console.error("Error parsing JSON data:", error.message);
    }
  }

  if (!h2h || !h2h['data'] || !h2h['data'].$ || !schedules || !schedules['data'] || !schedules['data'].$) {
    return <p><CircularProgress /></p>;
  }

  /* ******************************************************************* */

  const dataH2H = h2h.data.$['H2H'];
  const oddsKeys = ['LAST_MATCH_HOME', 'LAST_MATCH_AWAY'];
  const parseJSON = (jsonString) => JSON.parse(jsonString);

  const parsedH2H = oddsKeys.reduce((acc, key) => {
    acc[key] = parseJSON(h2h['data'].$[key]);
    return acc;
  }, {});
  const { LAST_MATCH_HOME, LAST_MATCH_AWAY } = parsedH2H;

  const styles = {
    title: {
      textAlign: 'center',
    },
    paddingTop: {
      paddingTop: '20px',
    },
    paddingBottom: {
      paddingBottom: '20px',
    },
  };

  return (
    <>
      {parsedOddsRun && parsedOddsRun?.H2H ? (
        <H2H
          league={schedules.data.$.LEAGUE_SHORT_NAME}
          nameTeam={schedules.data.$.HOME_NAME}
          awayTeam={schedules.data.$.AWAY_NAME}
          title="Head to Head Statistics"
          style={styles.paddingTop}
          H2H={dataH2H}
          H2H_IO={JSON.parse(h2hIO?.H2H)}
        />
      ) : (
        <H2H
          league={schedules.data.$.LEAGUE_SHORT_NAME}
          nameTeam={schedules.data.$.HOME_NAME}
          awayTeam={schedules.data.$.AWAY_NAME}
          title="Head to Head Statistics"
          style={styles.paddingTop}
          H2H={dataH2H}
        />
      )}

      <Box sx={{ width: '100%' }}>
        <h2 style={styles.title}>Previous Scores Statistics</h2>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            {parsedOddsRun && parsedOddsRun?.LAST_MATCH_HOME ? (
              <HomeAnalysis
                nameTeam={schedules.data.$.HOME_NAME}
                title="Previous Scores Statistics"
                LAST_MATCH_HOME={LAST_MATCH_HOME}
                LAST_MATCH_HOME_IO={JSON.parse(h2hIO?.LAST_MATCH_HOME)}
              />
            ) : (
              <HomeAnalysis
                nameTeam={schedules.data.$.HOME_NAME}
                title="Previous Scores Statistics"
                LAST_MATCH_HOME={LAST_MATCH_HOME}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            {parsedOddsRun && parsedOddsRun?.LAST_MATCH_AWAY ? (
              <AwayAnalysis
                awayTeam={schedules.data.$.AWAY_NAME}
                LAST_MATCH_AWAY={LAST_MATCH_AWAY}
                LAST_MATCH_AWAY_IO={JSON.parse(h2hIO?.LAST_MATCH_AWAY)}
              />
            ) : (
              <AwayAnalysis
                awayTeam={schedules.data.$.AWAY_NAME}
                LAST_MATCH_AWAY={LAST_MATCH_AWAY}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Analysis;