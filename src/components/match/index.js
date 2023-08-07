import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { scheduleAllSingleState$, oddsAllSingleState$, h2hState$ } from '../../redux/selectors';
import * as actions from '../../redux/actions';
import Odds from './Odds';
import HeaderMatch from './HeaderMatch';
import Analysis from './Analysis';

export default function MatchLive(props) {
  const { matchID } = props;
  const dispatch = useDispatch();
  const odds = useSelector(oddsAllSingleState$);
  const schedules = useSelector(scheduleAllSingleState$);
  const h2h = useSelector(h2hState$);
  
  useEffect(() => {
    dispatch(actions.getOddsAllSingleRT.getOddsAllSingleRTRequest(matchID));
    dispatch(actions.getScheduleAllSingleRT.getScheduleAllSingleRTRequest(matchID));
    dispatch(actions.getH2H.getH2HRequest(matchID));
  }, [dispatch, matchID]);

  

  return (
    <div className='matchLive'>
      <HeaderMatch schedules={schedules} />
      <Odds  odds={odds} schedules={schedules}/>
      <Analysis schedules={schedules} h2h={h2h}/>
    </div>
  );
}
