import React, {useEffect,useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import io from "socket.io-client";
import { scheduleState$} from '../../redux/selectors';


export default function List6in1() {
    const dispatch = useDispatch();
    const schedule = useSelector(scheduleState$);
    
    useEffect(() => {
        dispatch(actions.getSchedule.getSchedulesRequest());
        
        const socket = io.connect("http://localhost:5000");
        socket.on("connect", () => {
            console.log("con ws");
        });

        socket.on("ODDS", async (data) => {
            try {
                const dataJson = JSON.parse(data);
                if (dataJson && dataJson['ODDS_DATA'] && dataJson['ODDS_DATA']['ODDS_ITEM']) {
                    const dataOdds = dataJson['ODDS_DATA']['ODDS_ITEM'];
                    await bf_refresh(dataOdds);
                }
            } catch (error) {
                console.error("Error while parsing JSON data:", error.message);
            }
        });

        socket.on("SCHEDULE", async (data) => {
            try{
                const dataJson = JSON.parse(data);
                if (dataJson && dataJson['SCHEDULE_DATA'] && dataJson['SCHEDULE_DATA']['SCHEDULE_ITEM']) {
                    tb_refresh(dataJson['SCHEDULE_DATA']['SCHEDULE_ITEM']);
                }
            }catch(error) {
                console.error("Error while parsing JSON data:", error.message);
            }
        });

        socket.on("disconnect", () => {
            console.log("dis ws");
        });

        return () => {
            socket.disconnect();
        };
    }, [dispatch]);
    
    function tb_refresh(data) {
        var length = 0;
        length = data.length;
        for (var i = 0; i < length; i++) {
            var D = data[i].$;
            var match = D;
            
            var tr = document.getElementById("table_" + D.MATCH_ID);
            if (tr === null) continue;
            try {
                var HOME_SCORE = tr.querySelector("#hs" + D.MATCH_ID);
                var AWAY_SCORE = tr.querySelector("#gs" + D.MATCH_ID); 
                var STATUS_MATCH = tr.querySelector("#ms" + D.MATCH_ID); 

                HOME_SCORE.innerHTML = D.HOME_SCORE;
                AWAY_SCORE.innerHTML = D.AWAY_SCORE;
                STATUS_MATCH.innerHTML = D.START_TIME;
                // var scheduleValue = tr.attributes["data-s"].value;

                // var HOME_SCORE = tr.querySelector("#hs" + D.MATCH_ID);
                // var AWAY_SCORE = tr.querySelector("#gs" + D.MATCH_ID); 
                // var STATUS_MATCH = tr.querySelector("#ms" + D.MATCH_ID); 

                // if (scheduleValue && scheduleValue.trim() !== "") {
                //     const schedule = JSON.parse(scheduleValue);
                //     updateElement(D.HOME_SCORE, schedule.HOME_SCORE, "hs", HOME_SCORE);
                //     updateElement(D.AWAY_SCORE, schedule.AWAY_SCORE, "gs", AWAY_SCORE);
                //     updateElement(D.START_TIME, schedule.START_TIME, "ms", STATUS_MATCH);
                // }

                // function updateElement(newValue, oldValue, elementPrefix, element) {
                //     if (parseFloat(oldValue) !== parseFloat(newValue)) {
                //         newValue = '<span class="change_status">' + newValue + '</span>';
                //     }
                //     element.innerHTML = '<span class="change_status">' + newValue + '</span>';
                // }
                // HOME_SCORE.innerHTML = D.HOME_SCORE;
                // AWAY_SCORE.innerHTML = D.AWAY_SCORE;
                // STATUS_MATCH.innerHTML = D.START_TIME;
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
            

            tr.attributes["data-s"].value = JSON.stringify(match.STATUS);
            tr.attributes["data-t"].value = JSON.stringify(match);
        }
    }

    function bf_refresh(data, type) {
        var length = 0;
        length = data.length;
        
        for (var i = 0; i < length; i++) {
            var D = data[i].$;
            var odds = D;
            var tr = document.getElementById("table_" + D.MATCH_ID);
            if (tr === null) continue;
            try {
                var oddsValue = tr.attributes["odds"].value;
                /* 1X2 */
                var homewin = tr.querySelector("#homewin_" + D.MATCH_ID);
                var guestwin = tr.querySelector("#guestwin_" + D.MATCH_ID);
                var Standoff = tr.querySelector("#Standoff_" + D.MATCH_ID);

                /* Asian Handicap */
                var upodds = tr.querySelector("#upodds_" + D.MATCH_ID);
                var downodds = tr.querySelector("#downodds_" + D.MATCH_ID);
                var goal = tr.querySelector("#goal_" + D.MATCH_ID);

                /* Over/Under */
                var goal_t1 = tr.querySelector("#goal_t1_" + D.MATCH_ID);
                var goal_t2 = tr.querySelector("#goal_t2_" + D.MATCH_ID);
                var upodds_t = tr.querySelector("#upodds_t_" + D.MATCH_ID);
                var downodds_t = tr.querySelector("#downodds_t_" + D.MATCH_ID);

                if (oddsValue && oddsValue.trim() !== "") {
                    const old = JSON.parse(oddsValue);
                    updateElement(D.HomeHandicap, old.HomeHandicap, "upodds_", upodds);
                    updateElement(D.Handicap, old.Handicap, "goal_", goal);
                    // updateElementType1(D.Handicap, old.Handicap, "goal_a", goal_aElement);
                    updateElement(D.AwayHandicap, old.AwayHandicap, "downodds_", downodds);

                    updateElement(D.Over, old.Over, "upodds_t_", upodds_t);
                    updateElement(D.Goals, old.Goals, "goal_t1_", goal_t1);
                    updateElement(D.Under, old.Under, "downodds_t_", downodds_t);

                    updateElement(D.HW, old.HW, "homewin_", homewin);
                    updateElement(D.D, old.D, "Standoff_", Standoff);
                    updateElement(D.AW, old.AW, "guestwin_", guestwin);
                }
                function updateElement(newValue, oldValue, elementPrefix, element) {
                    if (parseFloat(oldValue) !== parseFloat(newValue)) {
                        if (parseFloat(oldValue) > parseFloat(newValue)) {
                            newValue = '<span class="down">' + newValue + '</span>';
                            
                        } else if (parseFloat(oldValue) < parseFloat(newValue)) {
                            newValue = '<span class="up">' + newValue + '</span>';
                        }
                    }
                    element.innerHTML = newValue;
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
            tr.attributes["odds"].value = JSON.stringify(odds);
        }
    }

    function MatchTable({ e }) {
        return (
            <table width="100%" border="0" cellPadding="4" cellSpacing="1" style={{ marginBottom: "-1px", textAlign: "center" }} className="odds-table-bg dataItem" leagueid="388" id={'table_' + e.MATCH_ID} data-s="" data-t="" odds="">
            <tbody>
                <tr name="LeaguestitleTr" data-l={e.LEAGUE_ID}>
                    <td colSpan="9" className="Leaguestitle"><span className="l1"><a href="#" target="_blank">{e.LEAGUE_NAME}</a></span></td>
                </tr>
                <tr className="b1" id={'tr_' + e.MATCH_ID}>
                    <td rowSpan="3" width="3%"></td>
                    <td rowSpan="3" width="5%"><span id={'t_'+ e.MATCH_ID} name="timeData" style={{fontSize:'13px'}}>{e.MATCH_TIME}</span><br /><span id={'tos_'+e.MATCH_ID} style={{fontSize:'13px'}} className="red">{e.STATUS}</span></td>
                    <td className="sl" width="23%" id={'home_'+e.MATCH_ID}><a href="#">{e.HOME_NAME}</a></td>
                    <td width="6%" rowSpan="3" style={{ textAlign: 'center' }}><span id={'hs'+e.MATCH_ID} className="blue"></span><br /><span id={'ms'+e.MATCH_ID}></span><br /><span id={'gs'+e.MATCH_ID} className="blue"></span></td>
                    <td width="7%"><a href="#" className="sb" id={'homewin_'+e.MATCH_ID}></a></td>
                    <td width="14%" className="sr"><a href="#" className="pk" id={'goal_'+e.MATCH_ID}></a> &nbsp;<a href="#" className="sb" id={'upodds_'+e.MATCH_ID}></a></td>
                    <td className="sr" width="14%"><a href="#" className="pk" id={'goal_t1_'+e.MATCH_ID}></a> <a href="#" className="sb" id={'upodds_t_'+e.MATCH_ID}></a> </td>
                    <td width="14%" className="sr sbg"><a href="#" className="pk" id={'goal2_'+e.MATCH_ID}></a> &nbsp;<a href="#" className="sb" id={'upodds2_'+e.MATCH_ID}></a></td>
                    <td className="sr sbg" width="14%"><a href="#" className="pk" id={'goal_t12_'+e.MATCH_ID}></a> <a href="#" className="sb" id={'upodds_t2_'+e.MATCH_ID}></a> </td>
                </tr>
                <tr className="b1" id={'tr2_'+e.MATCH_ID}>
                    <td className="sl" id={'away_'+e.MATCH_ID}><a href="#">{e.AWAY_NAME}</a></td>
                    <td><a href="#" className="sb" id={'guestwin_'+e.MATCH_ID}></a></td>
                    <td className="sr"><a href="#" className="sb" id={'downodds_'+e.MATCH_ID}></a></td>
                    <td className="sr"><a href="#" className="sb" id={'downodds_t_'+e.MATCH_ID}></a> </td>
                    <td className="sr sbg"><a href="#" className="sb" id={'downodds2_'+e.MATCH_ID}></a></td>
                    <td className="sr sbg"><a href="#" className="sb" id={'downodds_t2_'+e.MATCH_ID}></a> </td>
                </tr>
                <tr className="b1" id={'tr3_'+e.MATCH_ID}>
                    <td className="sl">Draw</td>
                    <td><a href="#" className="sb" id={'Standoff_'+e.MATCH_ID}></a></td>
                    <td colSpan="4" className="sr underLine"><a href='#'>Analysis</a>&nbsp;<a href='#'>Odds</a> &nbsp;<a href='#'>1X2</a></td>
                </tr>
            </tbody>
        </table>
        );
    }

    const sortedMatches = schedule.data.sort((a, b) => {
        const timeA = new Date(a.MATCH_TIME);
        const timeB = new Date(b.MATCH_TIME);
        return timeA - timeB;
    });

    return (
        <div id='teamid'>
            <div id='6in1'>
                <table width="100%" border="0" align="center" cellPadding="2" cellSpacing="1" className="odds-table-bg">
                    <tbody>
                        <tr className="oodstable-t" align="center">
                            <td width="3%"></td>
                            <td width="5%">Date</td>
                            <td width="23%" className="sl">Teams</td>
                            <td width="6%">Score</td>
                            <td width="7%">1X2</td>
                            <td width="14%">Asian Handicap</td>
                            <td width="14%">Over/Under</td>
                            <td width="14%">HT Asian Handicap</td>
                            <td width="14%">HT Over/Under</td>
                        </tr>
                    </tbody>
                </table>
                
                {sortedMatches.filter((match) => match.STATUS >= 1).map((e) => (
                    <MatchTable key={e.MATCH_ID} e={e} />
                ))}
                {sortedMatches.filter((match) => match.STATUS < 1).map((e) => (
                    <MatchTable key={e.MATCH_ID} e={e} />
                ))}
            </div>
        </div>
    )
}