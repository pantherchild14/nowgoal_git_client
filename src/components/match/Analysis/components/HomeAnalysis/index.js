const styles = {
    teamHome: {
        backgroundColor: '#de682f',
        color: '#fff',
        textAlign: 'center',
        lineHeight: '28px',
    }

};

const HomeAnalysis = (props) => {
    const { nameTeam, LAST_MATCH_HOME } = props;
    const data = (LAST_MATCH_HOME);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };


    return (
        <>
            <div id='porletP5' className='porletP'>
                <table width="100%" border="0" align="center" cellPadding="2" cellSpacing="1" className="odds-table-bg" data-t="">
                    <tbody>
                        <tr className="team-home" style={styles.teamHome}>
                            <td colSpan="16">
                                <label >{nameTeam}</label>
                            </td>
                        </tr>
                        <tr className="tr-title" align="center" height="25">
                            <th width="10%">League/Cup</th>
                            <th width="10%">Date</th>
                            <th width="7%">Home</th>
                            <th width="5%">Score</th>
                            <th width="7%">Away</th>
                            <th width="5%">W/L</th>
                        </tr>
                        {Array.isArray(data) ? (
                            data.map((e, index) => (
                                <tr key={index} name="oddsTr" align="center" className="tb-bgcolor1" cid="8">
                                    <td width="10%" height="30">{e.League}</td>
                                    <td width="10%" height="30">{formatDate(e.Date)}</td>
                                    <td width="7%" height="30">{e.Home}</td>
                                    <td width="5%" height="30">
                                        {e.Score && e.HalfScore ? `${e.Score}(${e.HalfScore})` : '-'}
                                    </td>
                                    <td width="7%" height="30">{e.Away}</td>
                                    <td width="5%" height="30">
                                        {/* {e.Corner && e.HalfCorner ? `${e.Corner}(${e.HalfCorner})` : '-'} */}
                                        {e.W_L}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="12">No Data!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default HomeAnalysis;
