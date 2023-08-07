import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const Odds = (props) => {
    const { odds } = props;

    if(!odds || !odds['data'] || !odds['data'].$) {
        return;
    }

    const oddsKeys = ['ODDS_AH_FT', 'ODDS_AH_HT', 'ODDS_EURO_FT', 'ODDS_EURO_HT', 'ODDS_OU_FT', 'ODDS_OU_HT'];
    const parseJSON = (jsonString) => {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return {};
        }
    };

    const parsedOdds = oddsKeys.reduce((acc, key) => {
    acc[key] = parseJSON(odds['data'].$[key]);
    return acc;
    }, {});

    const { ODDS_AH_FT, ODDS_AH_HT, ODDS_EURO_FT, ODDS_EURO_HT, ODDS_OU_FT, ODDS_OU_HT } = parsedOdds;

    const styles = {
        arrowUp: {
            color: 'green', 
        },
        arrowDown: {
            color: 'red', 
        },
        relative: {
            position: 'relative',
        },
        iconPosition: {
            position: 'absolute',
            top: '2px',
        }
    };

    return (
        <>
        <div id='CompanyOddsDiv' className='company-comp'>
            <table width="100%" border="0" align="center" cellPadding="2" cellSpacing="1" className="odds-table-bg" data-t="">
                <tbody>
                    <tr className="tr-title" align="center" height="25">
                        <th width="15%" rowSpan='2' colSpan='2'>Company</th>
                        <th colSpan='3' className='sb'>Asian Handicap Odds</th>
                        <th colSpan='3' className='sb'>1X2 Odds	</th>
                        <th colSpan='3' className='sb'>Over/Under Odds	</th>
                        
                    </tr>
                    <tr align="center" className="tr-title" height="25">
                        <th className="lb">Home</th>
                        <th>Handicap</th>
                        <th className="rb">Away</th>
                        <th className="lb">HW</th>
                        <th>D</th>
                        <th className="rb">AW</th>
                        <th className="lb">Over</th>
                        <th>Goals</th>
                        <th className="rb">Under</th>
                    </tr>
                    {(!odds || !odds['data'] || !odds['data'].$) ? (
                        <tr>
                            <td colSpan="10"><p>No Data!</p></td>
                        </tr>
                    ) : (
                        <tr name="oddsTr" className="tb-bgcolor1" cid="8">
                            <td width="10%" height="30">Bet365</td>
                            <td width="5%" height="30" className="lb">
                                <span>Early</span>
                                <span>Live</span>
                                <span className="red">Run</span>
                            </td>
                            <td width="7%" className="lb">
                                <span data-o={ODDS_AH_FT.f.u}>{ODDS_AH_FT.f.u}</span>
                                <span className="up2" data-o={ODDS_AH_FT.l.u} style={styles.relative}>
                                    {ODDS_AH_FT.l.u}
                                    {ODDS_AH_FT.f.u < ODDS_AH_FT.l.u ? (
                                        <ArrowDropUpIcon style={{ ...styles.arrowUp, ...styles.iconPosition }} />
                                    ) : ODDS_AH_FT.f.u > ODDS_AH_FT.l.u ? (
                                        <ArrowDropDownIcon style={{ ...styles.arrowDown, ...styles.iconPosition }} />
                                    ) : (
                                        ''
                                    )}
                                </span>
                                <span data-o={ODDS_AH_FT.r.u}>
                                    {ODDS_AH_FT.r.u !== ODDS_AH_FT.l.u ? (ODDS_AH_FT.r.u) : ('-')}
                                </span>
                            </td>
                            <td width="7%">
                                <span data-o={ODDS_AH_FT.f.g}>{ODDS_AH_FT.f.g}</span>
                                <span className="" data-o={ODDS_AH_FT.l.g} style={styles.relative}>
                                    {ODDS_AH_FT.l.g}

                                    {ODDS_AH_FT.f.g < ODDS_AH_FT.l.g ? (
                                        <ArrowDropUpIcon style={{ ...styles.arrowUp, ...styles.iconPosition }} />
                                    ) : ODDS_AH_FT.f.g > ODDS_AH_FT.l.g ? (
                                        <ArrowDropDownIcon style={{ ...styles.arrowDown, ...styles.iconPosition }} />
                                    ) : (
                                        ''
                                    )}
                                </span>
                                <span data-o={ODDS_AH_FT.r.g}>
                                    {ODDS_AH_FT.r.g !== ODDS_AH_FT.l.g ? (ODDS_AH_FT.r.g) : ('-')}
                                </span>
                            </td>
                            <td width="7%" className="rb">
                                <span data-o={ODDS_AH_FT.f.d}>{ODDS_AH_FT.f.d}</span>
                                <span className="down2" data-o={ODDS_AH_FT.l.d} style={styles.relative}>
                                    {ODDS_AH_FT.l.d}

                                    {ODDS_AH_FT.f.d < ODDS_AH_FT.l.d ? (
                                        <ArrowDropUpIcon style={{ ...styles.arrowUp, ...styles.iconPosition }} />
                                    ) : ODDS_AH_FT.f.d > ODDS_AH_FT.l.d ? (
                                        <ArrowDropDownIcon style={{ ...styles.arrowDown, ...styles.iconPosition }} />
                                    ) : (
                                        ''
                                    )}
                                </span>
                                <span data-o={ODDS_AH_FT.r.d}>
                                    {ODDS_AH_FT.r.d !== ODDS_AH_FT.l.d ? (ODDS_AH_FT.r.d) : ('-')}
                                </span>
                            </td>
                            <td width="7%" className="lb">
                                <span data-o={ODDS_EURO_FT.f.u}>{ODDS_EURO_FT.f.u}</span>
                                <span className="up2" data-o={ODDS_EURO_FT.l.u} style={styles.relative}>
                                    {ODDS_EURO_FT.l.u}

                                    {ODDS_EURO_FT.f.u < ODDS_EURO_FT.f.u ? (
                                        <ArrowDropUpIcon style={{ ...styles.arrowUp, ...styles.iconPosition }} />
                                    ) : ODDS_EURO_FT.f.u > ODDS_EURO_FT.f.u ? (
                                        <ArrowDropDownIcon style={{ ...styles.arrowDown, ...styles.iconPosition }} />
                                    ) : (
                                        ''
                                    )}
                                </span>
                                <span data-o={ODDS_EURO_FT.r.u}>
                                    {ODDS_EURO_FT.r.u !== ODDS_EURO_FT.l.u ? (ODDS_EURO_FT.r.u) : ('-')}
                                </span>
                            </td>
                            <td width="7%">
                                <span data-o={ODDS_EURO_FT.f.g}>{ODDS_EURO_FT.f.g}</span>
                                <span className="" data-o={ODDS_EURO_FT.l.g} style={styles.relative}>
                                    {ODDS_EURO_FT.l.g}

                                    {ODDS_EURO_FT.f.g < ODDS_EURO_FT.l.g ? (
                                        <ArrowDropUpIcon style={{ ...styles.arrowUp, ...styles.iconPosition }} />
                                    ) : ODDS_EURO_FT.f.g > ODDS_EURO_FT.l.g ? (
                                        <ArrowDropDownIcon style={{ ...styles.arrowDown, ...styles.iconPosition }} />
                                    ) : (
                                        ''
                                    )}
                                </span>
                                <span data-o={ODDS_EURO_FT.r.g}>
                                    {ODDS_EURO_FT.r.g !== ODDS_EURO_FT.l.g ? (ODDS_EURO_FT.r.g) : ('-')}
                                </span>
                            </td>
                            <td width="7%" className="rb">
                                <span data-o={ODDS_EURO_FT.f.d}>{ODDS_EURO_FT.f.d}</span>
                                <span className="down2" data-o={ODDS_EURO_FT.l.d} style={styles.relative}>
                                    {ODDS_EURO_FT.l.d}

                                    {ODDS_EURO_FT.f.d < ODDS_EURO_FT.l.d ? (
                                        <ArrowDropUpIcon style={{ ...styles.arrowUp, ...styles.iconPosition }} />
                                    ) : ODDS_EURO_FT.f.d > ODDS_EURO_FT.l.d ? (
                                        <ArrowDropDownIcon style={{ ...styles.arrowDown, ...styles.iconPosition }} />
                                    ) : (
                                        ''
                                    )}
                                </span>
                                <span data-o={ODDS_EURO_FT.r.d}>
                                    {ODDS_EURO_FT.r.d !== ODDS_EURO_FT.l.d ? (ODDS_EURO_FT.r.d) : ('-')}
                                </span>
                            </td>
                            <td width="7%" className="lb">
                                <span data-o={ODDS_OU_FT.f.u}>{ODDS_OU_FT.f.u}</span>
                                <span className="down2" data-o={ODDS_OU_FT.l.u} style={styles.relative}>
                                    {ODDS_OU_FT.l.u}

                                    {ODDS_OU_FT.f.u < ODDS_OU_FT.l.u ? (
                                        <ArrowDropUpIcon style={{ ...styles.arrowUp, ...styles.iconPosition }} />
                                    ) : ODDS_OU_FT.f.u > ODDS_OU_FT.l.u ? (
                                        <ArrowDropDownIcon style={{ ...styles.arrowDown, ...styles.iconPosition }} />
                                    ) : (
                                        ''
                                    )}
                                </span>
                                <span data-o={ODDS_OU_FT.r.u}>
                                    {ODDS_OU_FT.r.u !== ODDS_OU_FT.l.u ? (ODDS_OU_FT.r.u) : ('-')}
                                </span>
                            </td>
                            <td width="7%">
                                <span data-o={ODDS_OU_FT.f.g}>{ODDS_OU_FT.f.g}</span>
                                <span className="" data-o={ODDS_OU_FT.l.g} style={styles.relative}>
                                    {ODDS_OU_FT.l.g}

                                    {ODDS_OU_FT.f.g < ODDS_OU_FT.l.g ? (
                                        <ArrowDropUpIcon style={{ ...styles.arrowUp, ...styles.iconPosition }} />
                                    ) : ODDS_OU_FT.f.g > ODDS_OU_FT.l.g ? (
                                        <ArrowDropDownIcon style={{ ...styles.arrowDown, ...styles.iconPosition }} />
                                    ) : (
                                        ''
                                    )}
                                </span>
                                <span data-o={ODDS_OU_FT.r.g}>
                                    {ODDS_OU_FT.r.g !== ODDS_OU_FT.l.g ? (ODDS_OU_FT.r.g) : ('-')}
                                </span>
                            </td>
                            <td width="7%" className="rb">
                                <span data-o={ODDS_OU_FT.f.d}>{ODDS_OU_FT.f.d}</span>
                                <span className="up2" data-o={ODDS_OU_FT.l.d} style={styles.relative}>
                                    {ODDS_OU_FT.l.d}

                                    {ODDS_OU_FT.f.d < ODDS_OU_FT.l.d ? (
                                        <ArrowDropUpIcon style={{ ...styles.arrowUp, ...styles.iconPosition }} />
                                    ) : ODDS_OU_FT.f.d > ODDS_OU_FT.l.d ? (
                                        <ArrowDropDownIcon style={{ ...styles.arrowDown, ...styles.iconPosition }} />
                                    ) : (
                                        ''
                                    )}
                                </span>
                                <span data-o={ODDS_OU_FT.r.d}>
                                    {ODDS_OU_FT.r.d !== ODDS_OU_FT.l.d ? (ODDS_OU_FT.r.d) : ('-')}
                                </span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default Odds;