import React, { useState, useEffect } from "react";

const styles = {
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
};

const H2H = (props) => {
    const { nameTeam, awayTeam, league, title, style, H2H } = props;
    const [showTable, setShowTable] = useState(false);
    const [activeFilter, setActiveFilter] = useState("Home");
    const [filteredData, setFilteredData] = useState([]);
    const [filterApplied, setFilterApplied] = useState(false);

    useEffect(() => {
        try {
            const data = JSON.parse(H2H);

            const applyFilter = () => {
                if (activeFilter === "Home") {
                    setFilteredData(data.filter(e => e.Home === nameTeam));
                } else if (activeFilter === "Same League") {
                    setFilteredData(data.filter(e => e.League === league));
                } else {
                    setFilteredData(data);
                }
            };
            applyFilter();
        } catch (error) {
            console.error("Error parsing JSON data:", error.message);
        }
    }, [activeFilter, H2H, nameTeam, league]);

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
        setActiveFilter(filterType);
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
                                    <label >{nameTeam}</label>
                                    <div>
                                        <input onClick={() => handleFilterChange("Home")} type="checkbox"></input>
                                        <label>Home</label>
                                    </div>
                                    <div>
                                        <input onClick={() => handleFilterChange("Same League")} type="checkbox"></input>
                                        <label>Same League </label>
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
                                    <tr key={index} name="oddsTr" className="tb-bgcolor1" cid="8">
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
                            Array.isArray(dataJson) ? (
                                dataJson.slice(0, 10).map((e, index) => (
                                    <tr key={index} name="oddsTr" className="tb-bgcolor1" cid="8" style={{ textAlign: 'center' }}>
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
        </React.Fragment>
    );
};

export default H2H;
