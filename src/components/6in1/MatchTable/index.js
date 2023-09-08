import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { UTCtoLocalTime } from '../../../helpers';

const MatchTable = (props) => {
    const { e, oddsRedux, statusRedux } = props;
    const odd = oddsRedux?.$;
    const schedule = statusRedux?.$;
    const isLocalTimeZone = localStorage.getItem('TIME_ZONE')

    const [oddsValue, setOddsValue] = useState('');

    const updateElement = useCallback((newValue, oldValue, elementPrefix, element) => {
        if (parseFloat(oldValue) !== parseFloat(newValue)) {
            let newValueHtml = newValue;
            if (parseFloat(oldValue) > parseFloat(newValue)) {
                newValueHtml = `<span class='down'>${newValue}</span>`;
            } else if (parseFloat(oldValue) < parseFloat(newValue)) {
                newValueHtml = `<span class='up'>${newValue}</span>`;
            }
            element.innerHTML = newValueHtml;
        }
    }, []);

    useEffect(() => {
        if (oddsValue && oddsValue.trim() !== '') {
            const old = JSON.parse(oddsValue);
            const tr = document.getElementById('table_' + e.MATCH_ID);
            if (!tr) return;

            updateElement(e.HomeHandicap, old.HomeHandicap, 'upodds_', tr.querySelector('#upodds_' + e.MATCH_ID));
            updateElement(e.Handicap, old.Handicap, 'goal_', tr.querySelector('#goal_' + e.MATCH_ID));
            updateElement(e.AwayHandicap, old.AwayHandicap, 'downodds_', tr.querySelector('#downodds_' + e.MATCH_ID));
            updateElement(e.Over, old.Over, 'upodds_t_', tr.querySelector('#upodds_t_' + e.MATCH_ID));
            updateElement(e.Goals, old.Goals, 'goal_t1_', tr.querySelector('#goal_t1_' + e.MATCH_ID));
            updateElement(e.Under, old.Under, 'downodds_t_', tr.querySelector('#downodds_t_' + e.MATCH_ID));
            updateElement(e.HW, old.HW, 'homewin_', tr.querySelector('#homewin_' + e.MATCH_ID));
            updateElement(e.D, old.D, 'Standoff_', tr.querySelector('#Standoff_' + e.MATCH_ID));
            updateElement(e.AW, old.AW, 'guestwin_', tr.querySelector('#guestwin_' + e.MATCH_ID));
        }
    }, [e, oddsValue, updateElement]);

    return (
        <table width="100%" border="0" cellPadding="4" cellSpacing="1" style={{ marginBottom: '-1px', textAlign: 'center' }} className="odds-table-bg dataItem" leagueid="388" id={'table_' + e.MATCH_ID} data-s={schedule?.STATUS} data-t={JSON.stringify(schedule)} odds={JSON.stringify(e)}>
            <tbody>
                <tr name="LeaguestitleTr" data-l={e.LEAGUE_ID}>
                    <td colSpan="9" className="Leaguestitle"><span className="l1"><Link to="/">{e.LEAGUE_NAME}</Link></span></td>
                </tr>
                <tr className="b1" id={'tr_' + e.MATCH_ID}>
                    <td rowSpan="3" width="3%"></td>
                    <td rowSpan="3" width="5%"><span id={'t_' + e.MATCH_ID} name="timeData" style={{ fontSize: '13px' }}>{UTCtoLocalTime(e.MATCH_TIME, isLocalTimeZone)}</span><br /><span id={'tos_' + e.MATCH_ID} style={{ fontSize: '13px' }} className="red">{schedule?.STATUS}</span></td>
                    <td className="sl" width="23%" id={'home_' + e.MATCH_ID}><Link to={`/match/${e.MATCH_ID}`}>{e.HOME_NAME}</Link></td>
                    <td width="6%" rowSpan="3" style={{ textAlign: 'center' }}><span id={'hs' + e.MATCH_ID} className="blue">{schedule?.HOME_SCORE}</span><br /><span id={'ms' + e.MATCH_ID}>{schedule?.START_TIME}</span><br /><span id={'gs' + e.MATCH_ID} className="blue">{schedule?.AWAY_SCORE}</span></td>
                    <td width="7%"><Link to="#" className="sb" id={'homewin_' + e.MATCH_ID}>{odd?.HW}</Link></td>
                    <td width="14%" className="sr"><Link to="#" className="pk" id={'goal_' + e.MATCH_ID}>{odd?.Handicap}</Link> &nbsp;<Link to="#" className="sb" id={'upodds_' + e.MATCH_ID}>{odd?.HomeHandicap}</Link></td>
                    <td className="sr" width="14%"><Link to="#" className="pk" id={'goal_t1_' + e.MATCH_ID}>{odd?.Goals}</Link> <Link to="#" className="sb" id={'upodds_t_' + e.MATCH_ID}>{odd?.Over}</Link> </td>
                    <td width="14%" className="sr sbg"><Link to="#" className="pk" id={'goal2_' + e.MATCH_ID}></Link> &nbsp;<Link to="#" className="sb" id={'upodds2_' + e.MATCH_ID}></Link></td>
                    <td className="sr sbg" width="14%"><Link to="#" className="pk" id={'goal_t12_' + e.MATCH_ID}></Link> <Link to="#" className="sb" id={'upodds_t2_' + e.MATCH_ID}></Link> </td>
                </tr>
                <tr className="b1" id={'tr2_' + e.MATCH_ID}>
                    <td className="sl" id={'away_' + e.MATCH_ID}><Link to={`/match/${e.MATCH_ID}`}>{e.AWAY_NAME}</Link></td>
                    <td><Link to="#" className="sb" id={'guestwin_' + e.MATCH_ID}>{odd?.AW}</Link></td>
                    <td className="sr"><Link to="#" className="sb" id={'downodds_' + e.MATCH_ID}>{odd?.AwayHandicap}</Link></td>
                    <td className="sr"><Link to="#" className="sb" id={'downodds_t_' + e.MATCH_ID}>{odd?.Under}</Link> </td>
                    <td className="sr sbg"><Link to="#" className="sb" id={'downodds2_' + e.MATCH_ID}></Link></td>
                    <td className="sr sbg"><Link to="#" className="sb" id={'downodds_t2_' + e.MATCH_ID}></Link> </td>
                </tr>
                <tr className="b1" id={'tr3_' + e.MATCH_ID}>
                    <td className="sl">Draw</td>
                    <td><Link to="#" className="sb" id={'Standoff_' + e.MATCH_ID}>{odd?.D}</Link></td>
                    <td colSpan="4" className="sr underLine"><Link to='#'>Analysis</Link>&nbsp;<Link to='#'>Odds</Link> &nbsp;<Link to='#'>1X2</Link></td>
                </tr>
            </tbody>
        </table>
    );
};

export default MatchTable;
