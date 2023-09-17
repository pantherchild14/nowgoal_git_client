import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { scheduleAllSingleState$, scheduleSingleState$, h2hState$, oddDetailHistoryState$ } from '../../redux/selectors';
import * as actions from '../../redux/actions';
import HeaderMatch from './HeaderMatch';
import Analysis from './Analysis';
import OddRun from './OddRun';

export default function MatchLive(props) {
  const { ah, ou, matchID } = props;

  const [score3MatchFirstH2H, setScore3MatchFirstH2H] = useState(0);
  const [score3MatchMediumH2H, setScore3MatchMediumH2H] = useState(0);
  const [analysisWinH2H, setAnalysisWinH2H] = useState(0);
  const [score3MatchFirstHome, setScore3MatchFirstHome] = useState(0);
  const [score3MatchMediumHome, setScore3MatchMediumHome] = useState(0);
  const [analysisWinHome, setAnalysisWinHome] = useState(0);
  const [score3MatchFirstAway, setScore3MatchFirstAway] = useState(0);
  const [score3MatchMediumAway, setScore3MatchMediumAway] = useState(0);
  const [analysisWinAway, setAnalysisWinAway] = useState(0);

  const updateStatistics = (a, b, c, d, e, i, j, g, f) => {
    setScore3MatchFirstH2H(a);
    setScore3MatchMediumH2H(b);
    setAnalysisWinH2H(c);
    setScore3MatchFirstHome(d);
    setScore3MatchMediumHome(e);
    setAnalysisWinHome(i);
    setScore3MatchFirstAway(j);
    setScore3MatchMediumAway(g);
    setAnalysisWinAway(f);
  };

  console.log('H2H', score3MatchFirstH2H, score3MatchMediumH2H, analysisWinH2H);
  console.log('Home', score3MatchFirstHome, score3MatchMediumHome, analysisWinHome);
  console.log('Away', score3MatchFirstAway, score3MatchMediumAway, analysisWinAway);

  const ahValue = ah || '-';
  const ouValue = ou || '-';

  const dispatch = useDispatch();
  const schedules = useSelector(scheduleAllSingleState$);
  const scheduleSingle = useSelector(scheduleSingleState$);
  const h2h = useSelector(h2hState$);
  const oddDetailHistory = useSelector(oddDetailHistoryState$);

  useEffect(() => {
    dispatch(actions.getScheduleAllSingleRT.getScheduleAllSingleRTRequest(matchID));
    dispatch(actions.getH2H.getH2HRequest(matchID));
    dispatch(actions.getOddsChangeDetailHistory.getOddsChangeDetailHistoryRequest(matchID));
    dispatch(actions.getScheduleSingleRT.getScheduleSingleRTRequest(matchID))
  }, [dispatch, matchID]);

  const styles = {
    headerMatch: {
      marginBottom: '20px',
    }
  };

  return (
    <div className='matchLive'>
      <div style={styles.headerMatch} className='headerMatch'>
        <HeaderMatch
          ahValue={ahValue}
          ouValue={ouValue}
          schedules={schedules}
          scheduleSingle={scheduleSingle}

          score3MatchFirstH2H={score3MatchFirstH2H}
          score3MatchMediumH2H={score3MatchMediumH2H}
          analysisWinH2H={analysisWinH2H}
          score3MatchFirstHome={score3MatchFirstHome}
          score3MatchMediumHome={score3MatchMediumHome}
          analysisWinHome={analysisWinHome}
          score3MatchFirstAway={score3MatchFirstAway}
          score3MatchMediumAway={score3MatchMediumAway}
          analysisWinAway={analysisWinAway}
        />
      </div>
      <div className='oddRun'>
        <OddRun oddDetailHistory={oddDetailHistory} />
      </div>
      <div className='analysis'>
        <Analysis
          schedules={schedules}
          h2h={h2h}
          updateStatisticsAnaly={updateStatistics}
        />
      </div>
    </div>
  );
}
