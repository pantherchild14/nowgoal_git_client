import React, { useState, useEffect } from "react";

const styles = {
    textCenter: {
        textAlign: 'center',
    },
    awayHome: {
        backgroundColor: '#888',
        color: '#fff',
        textAlign: 'center',
        lineHeight: '28px',
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
    }
};

const H2H = (props) => {
    const { nameTeam, awayTeam, league, title, style, H2H, updateStatistics } = props;
    const [showTable, setShowTable] = useState(false);
    const [activeFilter, setActiveFilter] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [filterApplied, setFilterApplied] = useState(false);
    const [matchCount, setMatchCount] = useState(0);
    const [winCount, setWinCount] = useState(0);
    const [drawCount, setDrawCount] = useState(0);
    const [total3MatchFirst, setTotal3MatchFirst] = useState(0);
    const [total3MatchMedium, setTotal3MatchMedium] = useState(0);

    const statistics = () => {
        let score3MatchFirst = total3MatchFirst;
        let score3MatchMedium = total3MatchMedium;
        let analysisWin = `${((winCount / matchCount) * 100).toFixed(1)}%`;

        props.updateStatistics(score3MatchFirst, score3MatchMedium, analysisWin);
    };

    useEffect(() => {
        try {
            const data = JSON.parse(H2H);

            const applyFilter = () => {
                if (activeFilter === "Home") {
                    setFilteredData(data.filter(e => e.Home === nameTeam));
                } else if (activeFilter === "Same League") {
                    setFilteredData(data.filter(e => e.League === league));
                } else if (activeFilter === "Same League" && activeFilter === "Home") {
                    setFilteredData(data.filter(e => e.League === league && e.Home === nameTeam));
                } else {
                    setFilteredData(data);
                }
            };
            statistics();
            applyFilter();
        } catch (error) {
            console.error("Error parsing JSON data:", error.message);
        }
    }, [activeFilter, H2H, nameTeam, league]);

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
            setMatchCount(matchCount);
        });

        setWinCount(winCount);
        setDrawCount(drawCount);
    }, [filteredData]);

    useEffect(() => {
        try {
            const data = JSON.parse(H2H);
            let totalScore3MatchFirstAllTeams = 0;
            const first3FilteredDataAllTeams = data.slice(0, 3);
            first3FilteredDataAllTeams.forEach((data) => {
                const tdValue = data.Score;
                if (tdValue) {
                    const scoreParts = tdValue.split('-');
                    if (scoreParts.length === 2) {
                        const beforeDash = parseInt(scoreParts[0], 10);
                        const afterDash = parseInt(scoreParts[1], 10);
                        totalScore3MatchFirstAllTeams += beforeDash + afterDash;
                    }
                }
            });

            const dataTotalMedium = data.filter((e) => e.Home === nameTeam);
            let totalScore3MatchFirstNameTeam = 0;
            const first3FilteredDataNameTeam = dataTotalMedium.slice(0, 3);
            first3FilteredDataNameTeam.forEach((data) => {
                const tdValue = data.Score;
                if (tdValue) {
                    const scoreParts = tdValue.split('-');
                    if (scoreParts.length === 2) {
                        const beforeDash = parseInt(scoreParts[0], 10);
                        // const afterDash = parseInt(scoreParts[1], 10);
                        totalScore3MatchFirstNameTeam += beforeDash;
                    }
                }
            });

            setTotal3MatchFirst(totalScore3MatchFirstAllTeams);
            setTotal3MatchMedium(totalScore3MatchFirstNameTeam);

        } catch (error) {
            console.error("Error parsing JSON data:", error.message);
        }
    }, []);


    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const checkName = (name) => {
        let color;
        if (awayTeam === name) {
            color = "blue";
        } else {
            color = "red";
        }
        return color;
    }

    const handleFilterChange = (filterType) => {
        if (activeFilter === filterType) {
            setActiveFilter("");
        } else {
            setActiveFilter(filterType);
        }
        setShowTable(!showTable);
    }




    return (
        <React.Fragment>
            <div style={style} id='CompanyOddsDiv' className='company-comp'>
                <h2 align="center">{title}</h2>
                <table width="100%" border="0" align="center" cellPadding="2" cellSpacing="1" className="odds-table-bg" data-t="">
                    <tbody>
                        <tr className="team-home" style={styles.awayHome}>
                            <td colSpan="16">
                                <div style={styles.title}>
                                    <label style={{ marginRight: '10px' }}>{nameTeam}</label>
                                    <div style={{ marginRight: '10px' }}>
                                        <input
                                            onClick={() => handleFilterChange("Home")}
                                            type="checkbox"
                                            checked={activeFilter === "Home"}
                                        ></input>
                                        <label>Home</label>
                                    </div>
                                    <div>
                                        <input
                                            onClick={() => handleFilterChange("Same League")}
                                            type="checkbox"
                                            checked={activeFilter === "Same League"}
                                        ></input>
                                        <label>Same League</label>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="tr-title" align="center" height="25">
                            <th width="5%">League/Cup</th>
                            <th width="5%">Date</th>
                            <th width="10%">Home</th>
                            <th width="5%">Score</th>
                            <th width="10%">Away</th>
                            <th width="2%">W/L</th>
                        </tr>
                        {filterApplied || showTable ? (
                            Array.isArray(filteredData) ? (
                                filteredData.slice(0, 10).map((e, index) => (
                                    <tr key={index} name={`oddsTr_${index + 1}`} className="tb-bgcolor1" cid="8">
                                        <td width="5%" height="30">{e.League}</td>
                                        <td width="5%" height="30">{formatDate(e.Date)}</td>
                                        <td width="10%" height="30" style={{ color: checkName(e.Home) }}>{e.Home}</td>
                                        <td width="5%" height="30">
                                            {e.Score && e.HalfScore ? (
                                                <div>
                                                    <span style={{ color: "red" }}>{e.Score}</span>({e.HalfScore})
                                                </div>
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                        <td width="10%" height="30" style={{ color: checkName(e.Away) }}>{e.Away}</td>
                                        <td width="2%" height="30" >
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
                                    <tr key={index} name={`oddsTr_${index + 1}`} className="tb-bgcolor1" cid="8" style={{ textAlign: 'center' }}>
                                        <td width="2%" height="30">{e.League}</td>
                                        <td width="5%" height="30">{formatDate(e.Date)}</td>
                                        <td width="10%" height="30" style={{ color: checkName(e.Home) }}>{e.Home}</td>
                                        <td width="5%" height="30">
                                            {e.Score && e.HalfScore ? (
                                                <div>
                                                    <span style={{ color: "red" }}>{e.Score}</span>({e.HalfScore})
                                                </div>
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                        <td width="10%" height="30" style={{ color: checkName(e.Away) }}>{e.Away}</td>
                                        <td width="2%" height="30" >
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
        </React.Fragment>
    );
};

export default H2H;
