import React, { useState, useEffect } from "react";

const AwayAnalysis = (props) => {
    const { awayTeam, title, LAST_MATCH_AWAY } = props;
    const [showTable, setShowTable] = useState(false);
    const [activeFilter, setActiveFilter] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [filterApplied, setFilterApplied] = useState(false);
    const [matchCount, setMatchCount] = useState(0);
    const [winCount, setWinCount] = useState(0);
    const [drawCount, setDrawCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);


    useEffect(() => {
        try {
            const data = (LAST_MATCH_AWAY);

            const applyFilter = () => {
                if (activeFilter === "Away") {
                    setFilteredData(data.filter(e => e.Home === awayTeam));
                } else {
                    setFilteredData(data);
                }
            };

            applyFilter();
        } catch (error) {
            console.error("Error parsing JSON data:", error.message);
        }
    }, [activeFilter, LAST_MATCH_AWAY, awayTeam]);

    useEffect(() => {
        let matchCount = 0;
        let winCount = 0;
        let drawCount = 0;

        const first10FilteredData = filteredData.slice(0, 10);

        first10FilteredData.forEach((data) => {
            const tdValue = data.W_L;
            if (tdValue) {
                matchCount++;
            }
            if (tdValue === 'W') {
                winCount++;
            } else if (tdValue === 'D') {
                drawCount++;
            }

        });

        const totalMatches = winCount + drawCount + (filteredData.length - (winCount + drawCount));
        setMatchCount(matchCount);
        setWinCount(winCount);
        setDrawCount(drawCount);
        setTotalCount(totalMatches);
    }, [filteredData]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const away = (name) => {
        if (awayTeam === name) {
            const color = "blue";
            return color;
        }
    }

    const handleFilterChange = (filterType) => {
        if (activeFilter === filterType) {
            setActiveFilter("");
        } else {
            setActiveFilter(filterType);
        }
        setShowTable(!showTable);
    }

    const style = {
        textCenter: {
            textAlign: 'center',
        },
        awayHome: {
            backgroundColor: '#2495da',
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
                        <tr className="team-home" style={style.awayHome}>
                            <td colSpan="16">
                                <div style={style.title}>
                                    <label style={{ marginRight: '10px' }}>{awayTeam}</label>
                                    <div>
                                        <input
                                            onClick={() => handleFilterChange("Away")}
                                            type="checkbox"
                                            checked={activeFilter === "Away"}
                                        ></input>
                                        <label>Away</label>
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
                                        <td width="10%" height="30" style={{ color: away(e.Home) }}>{e.Home}</td>
                                        <td width="5%" height="30">
                                            {e.Score && e.HalfScore ? (
                                                <div>
                                                    <span style={{ color: "red" }}>{e.Score}</span>({e.HalfScore})
                                                </div>
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                        <td width="10%" height="30" style={{ color: away(e.Away) }}>{e.Away}</td>
                                        <td width="2%" height="30" className="HW">
                                            {/* {e.Corner && e.HalfCorner ? `${e.Corner}/${e.HalfCorner}` : '-'} */}
                                            <span className={`o-${e.W_L}`}>{e.W_L}</span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="12">No Data!</td>
                                </tr>
                            )
                        ) : (
                            Array.isArray(filteredData) ? (
                                filteredData.slice(0, 10).map((e, index) => (
                                    <tr key={index} name="oddsTr" className="tb-bgcolor1" cid="8" style={{ textAlign: 'center' }}>
                                        <td width="2%" height="30">{e.League}</td>
                                        <td width="5%" height="30">{formatDate(e.Date)}</td>
                                        <td width="10%" height="30" style={{ color: away(e.Home) }}>{e.Home}</td>
                                        <td width="5%" height="30">
                                            {e.Score && e.HalfScore ? (
                                                <div>
                                                    <span style={{ color: "red" }}>{e.Score}</span>({e.HalfScore})
                                                </div>
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                        <td width="10%" height="30" style={{ color: away(e.Away) }}>{e.Away}</td>
                                        <td width="2%" height="30" className="HW">
                                            {/* {e.Corner && e.HalfCorner ? `${e.Corner}/${e.HalfCorner}` : '-'} */}
                                            <span className={`o-${e.W_L}`}>{e.W_L}</span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="12">No Data!</td>
                                </tr>
                            )
                        )}
                        <tr className="tb-stat1">
                            <td align="center" colSpan="16" id="td_stat1">
                                Last <font className="red">{matchCount}</font> Matches, {winCount} Win, {drawCount} Draw, {matchCount - (winCount + drawCount)} Loss, Win rate: <font class="red">{((winCount / matchCount) * 100).toFixed(1)}%</font>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AwayAnalysis;
