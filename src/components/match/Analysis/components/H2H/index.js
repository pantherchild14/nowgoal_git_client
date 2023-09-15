const styles = {
    textCenter: {
        textAlign: 'center',
    },
};

const H2H = (props) => {
    const { title, style, H2H } = props;

    try {
        const data = JSON.parse(H2H);

        const formatDate = (timestamp) => {
            const date = new Date(timestamp);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        };
        return (
            <>
                <div style={style} id='CompanyOddsDiv' className='company-comp'>
                    <h2 style={styles.textCenter}>{title}</h2>
                    <table width="100%" border="0" align="center" cellPadding="2" cellSpacing="1" className="odds-table-bg" data-t="">
                        <tbody>
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
                                    <tr key={index} name="oddsTr" className="tb-bgcolor1" cid="8">
                                        <td width="10%" height="30">{e.League}</td>
                                        <td width="10%" height="30">{formatDate(e.Date)}</td>
                                        <td width="7%" height="30">{e.Home}</td>
                                        <td width="5%" height="30">
                                            {e.Score && e.HalfScore ? `${e.Score}/${e.HalfScore}` : '-'}
                                        </td>
                                        <td width="7%" height="30">{e.Away}</td>
                                        <td width="5%" height="30">
                                            {/* {e.Corner && e.HalfCorner ? `${e.Corner}/${e.HalfCorner}` : '-'} */}
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
    } catch (error) {
        console.error("Error parsing JSON data:", error.message);
        return (
            <>
                <div style={style} id='CompanyOddsDiv' className='company-comp'>
                    <h2 style={styles.textCenter}>{title}</h2>
                    <table width="100%" border="0" align="center" cellPadding="2" cellSpacing="1" className="odds-table-bg" data-t="">
                        <tbody>
                            <tr className="tr-title" align="center" height="25">
                                <th width="10%">League/Cup</th>
                                <th width="10%">Date</th>
                                <th width="7%">Home</th>
                                <th width="5%">Score</th>
                                <th width="7%">Away</th>
                                <th width="5%">Corner</th>
                            </tr>
                            <tr>
                                <td colSpan="12">No Data!</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
};

export default H2H;
