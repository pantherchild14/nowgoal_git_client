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
    const { nameTeam, awayTeam, league, title, style, H2H } = props;
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

        const totalMatches = winCount + drawCount + (filteredData.length - (winCount + drawCount));
        setWinCount(winCount);
        setDrawCount(drawCount);
        setTotalCount(totalMatches);
    }, [filteredData]);

    const dataJson = JSON.parse(H2H);

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
                                        <td width="10%" height="30" style={{ color: checkName(e.Home) }}>{e.Away}</td>
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
