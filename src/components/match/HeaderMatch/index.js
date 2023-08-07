import { Box, Grid } from '@mui/material';

const HeaderMatch = (props) => {
    const { schedules } = props;

    if (!schedules || !schedules['data'] || !schedules['data'].$ ) {
        return <p>Loading...</p>;
    }
    const { HOME_NAME, SCORE_HOME, STATUS, SCORE_AWAY, AWAY_NAME, H_T,F_T } = schedules.data.$ || {};

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        matchTime: {
            display: 'flex',
            flexDirection: 'column',
        }
    };


    return (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box gridColumn="span 2"></Box>
            <Box gridColumn="span 8" textAlign={'center'}>
                <Grid container spacing="auto">
                    <Grid item xs={4}>
                        <p>{HOME_NAME}</p>
                    </Grid>
                    <Grid item xs={4}>
                        {/* ------------------ */}
                        <div style={styles.container}>
                            <div className="score">{SCORE_HOME}</div>
                            <div className="vs hhs">
                                <span id="matchTime" style={styles.matchTime}>
                                    {STATUS === '0' ? (
                                        <b>VS</b>
                                    ) : STATUS === '1' ?(
                                        <b>1st Half</b>
                                    ) : (
                                        <b>2nd Half</b>
                                    )}
                                    <span className="in-gif"></span>
                                </span>
                                <span className="row hscore">(<span title="Score 1st Half">{F_T}</span>)(<span title="Score 2st Half">{H_T}</span>)</span>
                            </div>
                            <div className="score">{SCORE_AWAY}</div>
                        </div>
                        
                        {/* ------------------ */}
                    </Grid>
                    <Grid item xs={4}>
                        <p>{AWAY_NAME}</p>
                    </Grid>
                </Grid>
            </Box>
            <Box gridColumn="span 2"></Box>
        </Box>
    );
}

export default HeaderMatch;
