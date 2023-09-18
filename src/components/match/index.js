import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { scheduleAllSingleState$, scheduleSingleState$, h2hState$, oddDetailHistoryState$ } from '../../redux/selectors';
import * as actions from '../../redux/actions';
import HeaderMatch from './HeaderMatch';
import Analysis from './Analysis';
import OddRun from './OddRun';

export default function MatchLive(props) {
  const { ah, ou, matchID } = props;

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
          matchID={matchID}
          ahValue={ahValue}
          ouValue={ouValue}
          schedules={schedules}
          scheduleSingle={scheduleSingle}
        />
      </div>
      <div className='oddRun'>
        <OddRun oddDetailHistory={oddDetailHistory} />
      </div>
      <div className='analysis'>
        <Analysis
          schedules={schedules}
          h2h={h2h}
        />
      </div>
    </div>
  );
}
