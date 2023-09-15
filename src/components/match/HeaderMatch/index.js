import { Box, Grid } from '@mui/material';

const HeaderMatch = (props) => {
    const { ahValue, ouValue, schedules, scheduleSingle } = props;

    if (!schedules || !schedules['data'] || !schedules['data'].$) {
        return <p>Loading...</p>;
    }

    console.log(scheduleSingle);
    const { HOME_NAME, SCORE_HOME, STATUS, SCORE_AWAY, AWAY_NAME, H_T, F_T } = schedules.data.$ || {};
    const { WHEATHER } = scheduleSingle.data.$ || {};
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        matchTime: {
            display: 'flex',
            flexDirection: 'column',
        },
        midder: {
            padding: '15px 0px 15px 0',
        },
        homeName: {
            fontSize: '18px',
            color: 'blue',
        },
        awayName: {
            fontSize: '18px',
            color: 'red',
        },
        score: {
            fontSize: '30px',
        },
        bxkeotype: {
            width: '54%',
            background: '#fff',
            color: '#000',
            position: 'relative',
            borderRadius: '5px',
            padding: '10px 10px 10px 35px',
            overflow: 'hidden',
            marginRight: '1%',
            border: '2px dashed #1a73e8',
        },
        tip: {
            position: 'absolute',
            fontSize: '13px',
            textTransform: 'uppercase',
            color: '#fff',
            textAlign: 'center',
            transform: 'rotate(-45deg)',
            left: '0px',
            top: '6px',
        },
        predictionSoccerResult: {
            display: 'flex',
            alignItems: 'flexStart',
            justifyContent: 'flexStart',
        },
        txtPrediction: {
            lineHeight: '25px',
            fontWeight: '900',
        },
        txtPredictionSpan: {
            color: '#227ad3',
            marginLeft: '0px',
        }
    };


    return (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box gridColumn="span 2"></Box>
            <Box gridColumn="span 8" textAlign={'center'} style={styles.midder}>
                <Grid container spacing="auto">
                    <Grid style={styles.homeName} item xs={4}>
                        <p>{HOME_NAME}</p>
                    </Grid>
                    <Grid item xs={4}>
                        {/* ------------------ */}
                        <div style={styles.container}>
                            <div style={styles.score}>{SCORE_HOME}</div>
                            <div>
                                <span id="matchTime" style={styles.matchTime}>
                                    {STATUS === '0' ? (
                                        <b>VS</b>
                                    ) : STATUS === '1' ? (
                                        <b>1st Half</b>
                                    ) : (
                                        <b>2nd Half</b>
                                    )}
                                    <span className="in-gif"></span>
                                </span>
                                <span className="row hscore">(<span title="Score 1st Half">{F_T}</span>)(<span title="Score 2st Half">{H_T}</span>)</span>
                            </div>
                            <div style={styles.score}>{SCORE_AWAY}</div>
                        </div>
                        {/* ------------------ */}
                    </Grid>
                    <Grid style={styles.awayName} item xs={4}>
                        <p>{AWAY_NAME}</p>
                    </Grid>
                </Grid>
            </Box>
            <Box gridColumn="span 2"></Box>
            <Box gridColumn="span 2"></Box>

            <Box gridColumn="span 4">
                <div className="bxkeotype" style={styles.bxkeotype}>
                    <span className="tip" style={styles.tip}>tips</span>
                    <div style={styles.predictionSoccerResult}>
                        <div style={styles.txtPrediction}>
                            Asian Handicap: <span style={styles.txtPredictionSpan}>{ahValue}</span>
                        </div>
                    </div>
                    <div style={styles.predictionSoccerResult}>
                        <div style={styles.txtPrediction}>
                            Over/Under: <span style={styles.txtPredictionSpan}>{ouValue}</span>
                        </div>
                    </div>
                </div>
            </Box>
            <Box gridColumn="span 2">WHEATHER: {WHEATHER !== "" ? WHEATHER : "-"}</Box>
        </Box>
    );
}

export default HeaderMatch;
