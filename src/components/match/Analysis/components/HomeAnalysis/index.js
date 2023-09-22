import React, { useState, useEffect } from "react";

const OU = (score) => {
    if (score) {
        const scoreParts = score.split('-');
        if (scoreParts.length === 2) {
            const beforeDash = parseInt(scoreParts[0], 10);
            const afterDash = parseInt(scoreParts[1], 10);
            const OU = beforeDash + afterDash;
            if (OU >= 2.5) {
                return "O";
            } else {
                return "U";
            }
        }
    }
};

const HomeAnalysis = (props) => {
    const { nameTeam, LAST_MATCH_HOME, updateStatisticsHome, LAST_MATCH_HOME_IO } = props;
    const [showTable, setShowTable] = useState(false);
    const [activeFilter, setActiveFilter] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [listData, setListData] = useState([]);
    const [matchCount, setMatchCount] = useState(0);
    const [winCount, setWinCount] = useState(0);
    const [drawCount, setDrawCount] = useState(0);
    const [winOUCount, setWinOUCount] = useState(0);
    const [total3MatchFirst, setTotal3MatchFirst] = useState(0);
    const [total3MatchMedium, setTotal3MatchMedium] = useState(0);
    const [selectMatchCount, setSelectMatchCount] = useState(10);

    useEffect(() => {
        try {
            // const data = LAST_MATCH_HOME;
            let data;
            if (LAST_MATCH_HOME_IO) {
                data = (LAST_MATCH_HOME_IO);
            } else {
                data = LAST_MATCH_HOME;
            }

            setListData(data);
            const applyFilter = () => {
                if (activeFilter === "Home") {
                    setFilteredData(data.filter(e => e.Home === nameTeam));
                } else {
                    setFilteredData(data);
                }
            };
            applyFilter();
        } catch (error) {
            console.error("Error parsing JSON data:", error.message);
        }
    }, [activeFilter, LAST_MATCH_HOME, nameTeam]);

    useEffect(() => {
        let matchCount = 0;
        let winCount = 0;
        let drawCount = 0;
        let totalOU = 0;

        const first10FilteredData = filteredData.slice(0, selectMatchCount);

        first10FilteredData.forEach((data) => {
            const tdValue = data.W_L;
            const tdScore = data.Score;

            if (tdValue) {
                matchCount++;
            }
            if (tdValue === 'W') {
                winCount++;
            } else if (tdValue === 'D') {
                drawCount++;
            }

            if (tdScore) {
                const scoreParts = tdScore.split('-');
                if (scoreParts.length === 2) {
                    const beforeDash = parseInt(scoreParts[0], 10);
                    const afterDash = parseInt(scoreParts[1], 10);
                    const Over = beforeDash + afterDash;
                    if (Over >= 2.5) {
                        totalOU++;
                    }
                }
            }

        });
        setWinOUCount(totalOU);
        setMatchCount(matchCount);
        setWinCount(winCount);
        setDrawCount(drawCount);
    }, [filteredData, selectMatchCount]);

    useEffect(() => {
        try {
            let totalScore3MatchFirstAllTeams = 0;
            let totalScore3MatchFirstNameTeam = 0;
            const first3FilteredDataAllTeams = filteredData.slice(0, 3);
            first3FilteredDataAllTeams.forEach((data) => {
                const tdValue = data.Score;
                if (tdValue) {
                    const scoreParts = tdValue.split('-');
                    if (scoreParts.length === 2) {
                        const beforeDash = parseInt(scoreParts[0], 10);
                        const afterDash = parseInt(scoreParts[1], 10);
                        totalScore3MatchFirstAllTeams += beforeDash + afterDash;
                        totalScore3MatchFirstNameTeam += beforeDash / 3;
                    }
                }
            });

            setTotal3MatchFirst(totalScore3MatchFirstAllTeams);
            setTotal3MatchMedium(totalScore3MatchFirstNameTeam);
        } catch (error) {
            console.error("Error parsing JSON data:", error.message);
        }
    }, [filteredData]);

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

    const handleFilterChange = (filterType) => {
        setActiveFilter((prevFilter) => (prevFilter === filterType ? "" : filterType));
        setShowTable(!showTable);
    }

    const handleSelectMatch = (event) => {
        const selected = parseInt(event.target.value, 10);
        setSelectMatchCount(selected);
    };

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
                                    <label style={{ marginRight: '10px' }}>{nameTeam}</label>
                                    <div>
                                        <input
                                            onClick={() => handleFilterChange("Home")}
                                            type="checkbox"
                                            checked={activeFilter === "Home"}
                                        ></input>
                                        <label>Home</label>
                                    </div>
                                    <select value={selectMatchCount} onChange={handleSelectMatch}>
                                        {listData.map((e, index) => (
                                            <option key={index} value={index + 1}>
                                                Last {index + 1}
                                            </option>
                                        ))}
                                    </select>
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
                            <th width="2%">O/U</th>
                        </tr>
                        {showTable ? (
                            Array.isArray(filteredData) ? (
                                filteredData.slice(0, selectMatchCount).map((e, index) => (
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
                                        <td width="2%" height="30" className="HW">
                                            {/* {e.Corner && e.HalfCorner ? `${e.Corner}/${e.HalfCorner}` : '-'} */}
                                            <span className={`o-${e.W_L}`}>{e.W_L}</span>
                                        </td>
                                        <td width="2%" height="30" className="HW">
                                            <span className={`o-${OU(e.Score)}`}>
                                                {OU(e.Score)}
                                            </span>
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
                                filteredData.slice(0, selectMatchCount).map((e, index) => (
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
                                        <td width="2%" height="30" className="HW">
                                            {/* {e.Corner && e.HalfCorner ? `${e.Corner}/${e.HalfCorner}` : '-'} */}
                                            <span className={`o-${e.W_L}`}>{e.W_L}</span>
                                        </td>
                                        <td width="2%" height="30" className="HW">
                                            <span className={`o-${OU(e.Score)}`}>
                                                {OU(e.Score)}
                                            </span>
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
                                Last <font className="red">{matchCount}</font> Matches,
                                {winCount} Win,
                                {drawCount} Draw,
                                {matchCount - (winCount + drawCount)} Loss,
                                Win rate: <font className="red">{((winCount / matchCount) * 100).toFixed(1)}%</font>,
                                Over rate: <font className="red">{((winOUCount / matchCount) * 100).toFixed(1)}%</font>,
                                Total the goals: <font className="red">{total3MatchFirst}</font>,
                                Total the average goals: <font className="red">{total3MatchMedium.toFixed(2)}</font>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default HomeAnalysis;
