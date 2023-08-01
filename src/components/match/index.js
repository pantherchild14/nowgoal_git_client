import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { scheduleSingleState$, oddsSingleState$ } from '../../redux/selectors';
import * as actions from "../../redux/actions";

export default function MatchLive(props) {
    const { matchID } = props;
    const dispatch = useDispatch();
    const odds = useSelector(oddsSingleState$);
    const schedules = useSelector(scheduleSingleState$);

    
  console.log(schedules);
    useEffect(() => {
        dispatch(actions.getOddsSingle.getOddsSingleRequest(matchID));
        dispatch(actions.getScheduleSingleRT.getScheduleSingleRTRequest(matchID));
    }, [dispatch, matchID]);

    return (
        <>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <Box gridColumn="span 2">
                </Box>
                <Box gridColumn="span 8" textAlign={'center'}>
                    <Grid container spacing='auto'>
                        {schedules && schedules['data'] && (
                            <>
                                <Grid item xs={5}>
                                    <p>{schedules['data'].$.HOME_NAME}</p>
                                </Grid>
                                <Grid item xs={2}>
                                    <span>{schedules['data'].$.HOME_SCORE}</span>
                                    {schedules['data'].$.START_TIME === '' ? (
                                        <span>VS</span>
                                    ) : (
                                        <span>{schedules['data'].$.START_TIME}</span>
                                    )}
                                    <span>{schedules['data'].$.AWAY_SCORE}</span>
                                </Grid>
                                <Grid item xs={5}>
                                    <p>{schedules['data'].$.AWAY_NAME}</p>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Box>
                <Box gridColumn="span 2">
                </Box>
            </Box>
        </>
    );
}
