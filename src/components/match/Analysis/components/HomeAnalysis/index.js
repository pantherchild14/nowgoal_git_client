import React, { useState } from "react";

const HomeAnalysis = (props) => {
    const { nameTeam, LAST_MATCH_HOME } = props;
    const [showTable, setShowTable] = useState(false);
    const data = (LAST_MATCH_HOME);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const home = (name) => {
        if (nameTeam === name) {
            const color = "red";
            return color;
        }
    }

    const toggleTable = () => {
        setShowTable(!showTable);
    };

    const filteredData = data.filter(e => e.Home === nameTeam);

    const style = {
        teamHome: {
            backgroundColor: '#de682f',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '28px',
        },
        title: {
            display: 'flex',
            justifyContent: 'center',
        }
    }


    return (
        <>
            <div id='porletP5' className='porletP'>
                <table width="100%" border="0" align="center" cellPadding="2" cellSpacing="1" className="odds-table-bg" data-t="">
                    <tbody>
                        <tr className="team-home" style={style.teamHome}>
                            <td colSpan="16">
                                <div style={style.title}>
                                    <label >{nameTeam}</label>
                                    <div>
                                        <input onClick={toggleTable} type="checkbox"></input>
                                        <label>Home</label>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="tr-title" align="center" height="25">
                            <th width="2%">League/Cup</th>
                            <th width="5%">Date</th>
                            <th width="10%">Home</th>
                            <th width="5%">Score</th>
                            <th width="10%">Away</th>
                            <th width="2%">W/L</th>
                        </tr>
                        {showTable ? (
                            Array.isArray(filteredData) ? (
                                filteredData.slice(0, 10).map((e, index) => (
                                    <tr key={index} name="oddsTr" className="tb-bgcolor1" cid="8" style={{ textAlign: 'center' }}>
                                        <td width="2%" height="30">{e.League}</td>
                                        <td width="5%" height="30">{formatDate(e.Date)}</td>
                                        <td width="10%" height="30" style={{ color: home(e.Home) }}>{e.Home}</td>
                                        <td width="5%" height="30">
                                            {e.Score && e.HalfScore ? (
                                                <div>
                                                    <span style={{ color: "red" }}>{e.Score}</span>({e.HalfScore})
                                                </div>
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                        <td width="10%" height="30" style={{ color: home(e.Away) }}>{e.Away}</td>
                                        <td width="2%" height="30">
                                            {e.W_L}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="12">No Data!</td>
                                </tr>
                            )
                        ) : (
                            Array.isArray(data) ? (
                                data.slice(0, 10).map((e, index) => (
                                    <tr key={index} name="oddsTr" className="tb-bgcolor1" cid="8" style={{ textAlign: 'center' }}>
                                        <td width="2%" height="30">{e.League}</td>
                                        <td width="5%" height="30">{formatDate(e.Date)}</td>
                                        <td width="10%" height="30" style={{ color: home(e.Home) }}>{e.Home}</td>
                                        <td width="5%" height="30">
                                            {e.Score && e.HalfScore ? (
                                                <div>
                                                    <span style={{ color: "red" }}>{e.Score}</span>({e.HalfScore})
                                                </div>
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                        <td width="10%" height="30" style={{ color: home(e.Away) }}>{e.Away}</td>
                                        <td width="2%" height="30">
                                            {/* {e.Corner && e.HalfCorner ? `${e.Corner}/${e.HalfCorner}` : '-'} */}
                                            {e.W_L}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="12">No Data!</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default HomeAnalysis;
