import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

import H2H from "./components/H2H";
import HomeAnalysis from "./components/HomeAnalysis";
import AwayAnalysis from "./components/AwayAnalysis";



const Analysis = (props) => {
  const { schedules, h2h, updateStatisticsAnaly } = props;
  const [score3MatchFirstH2H, setScore3MatchFirstH2H] = useState(0);
  const [score3MatchMediumH2H, setScore3MatchMediumH2H] = useState(0);
  const [analysisWinH2H, setAnalysisWinH2H] = useState(0);
  const [score3MatchFirstHome, setScore3MatchFirstHome] = useState(0);
  const [score3MatchMediumHome, setScore3MatchMediumHome] = useState(0);
  const [analysisWinHome, setAnalysisWinHome] = useState(0);
  const [score3MatchFirstAway, setScore3MatchFirstAway] = useState(0);
  const [score3MatchMediumAway, setScore3MatchMediumAway] = useState(0);
  const [analysisWinAway, setAnalysisWinAway] = useState(0);


  const updateStatistics = (a, b, c) => {
    setScore3MatchFirstH2H(a);
    setScore3MatchMediumH2H(b);
    setAnalysisWinH2H(c);
  };

  const updateStatisticsHome = (a, b, c) => {
    setScore3MatchFirstHome(a);
    setScore3MatchMediumHome(b);
    setAnalysisWinHome(c);
  };

  const updateStatisticsAway = (a, b, c) => {
    setScore3MatchFirstAway(a);
    setScore3MatchMediumAway(b);
    setAnalysisWinAway(c);
  };

  const statistics = () => {
    props.updateStatisticsAnaly(score3MatchFirstH2H, score3MatchMediumH2H, analysisWinH2H, score3MatchFirstHome, score3MatchMediumHome, analysisWinHome, score3MatchFirstAway, score3MatchMediumAway, analysisWinAway);
  };



  if (!h2h || !h2h['data'] || !h2h['data'].$ || !schedules || !schedules['data'] || !schedules['data'].$) {
    return <p><CircularProgress /></p>;
  }

  statistics();

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
      <H2H
        league={schedules.data.$.LEAGUE_SHORT_NAME}
        nameTeam={schedules.data.$.HOME_NAME}
        awayTeam={schedules.data.$.AWAY_NAME}
        title="Head to Head Statistics"
        style={styles.paddingTop}
        H2H={dataH2H}
        updateStatistics={updateStatistics}
      />
      <Box sx={{ width: '100%' }}>
        <h2 style={styles.title}>Previous Scores Statistics</h2>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <HomeAnalysis
              nameTeam={schedules.data.$.HOME_NAME}
              title="Previous Scores Statistics"
              LAST_MATCH_HOME={LAST_MATCH_HOME}
              updateStatisticsHome={updateStatisticsHome}
            />
          </Grid>
          <Grid item xs={6}>
            <AwayAnalysis
              awayTeam={schedules.data.$.AWAY_NAME}
              LAST_MATCH_AWAY={LAST_MATCH_AWAY}
              updateStatisticsAway={updateStatisticsAway}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Analysis;