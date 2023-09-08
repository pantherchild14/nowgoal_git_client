import React, { useEffect, useState, useCallback, useLayoutEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import io from "socket.io-client";
import { scheduleState$, rtState$, statusrtState$ } from '../../redux/selectors';
import MatchTable from './MatchTable';

export default function List6in1() {
  const dispatch = useDispatch();
  const schedule = useSelector(scheduleState$);
  const oddsRedux = useSelector(rtState$);
  const statusRedux = useSelector(statusrtState$);

  useLayoutEffect(() => {
    const fetchData = async () => {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      await Promise.all([
        dispatch(actions.getSchedule.getSchedulesRequest(formattedDate)),
        dispatch(actions.getRT.getRTRequest()),
        dispatch(actions.getStatusRT.getStatusRTRequest()),
      ]);
    };

    fetchData();
  }, [dispatch]);

  const tb_refresh = useCallback((data, type) => {
    var length = 0;
    if (type === 1) {
      length = data?.length || 0;
    } else {
      length = data?.data?.SCHEDULE_DATA?.SCHEDULE_ITEM?.length || 0;
    }
    for (var i = 0; i < length; i++) {
      var D;
      if (type === 0) {
        D = data?.data?.SCHEDULE_DATA?.SCHEDULE_ITEM?.[i]?.$;
      } else {
        D = data?.[i]?.$;
      }
      if (!D) continue;
      var match = D;
      var tr = document.getElementById("table_" + D.MATCH_ID);
      if (tr === null) continue;
      try {
        var HOME_SCORE = tr.querySelector("#hs" + D.MATCH_ID);
        var AWAY_SCORE = tr.querySelector("#gs" + D.MATCH_ID);
        var STATUS_MATCH = tr.querySelector("#ms" + D.MATCH_ID);
        var STATUS = tr.querySelector("#tos_" + D.MATCH_ID);

        HOME_SCORE.innerHTML = D.HOME_SCORE;
        AWAY_SCORE.innerHTML = D.AWAY_SCORE;
        STATUS_MATCH.innerHTML = D.START_TIME;
        STATUS.innerHTML = D.STATUS;
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
  }, []);

  const bf_refresh = useCallback((data, type) => {
    var length = 0;
    if (type === 1) {
      length = data?.length || 0;
    } else {
      length = data?.data?.ODDS_DATA?.ODDS_ITEM?.length || 0;
    }

    for (var i = 0; i < length; i++) {
      var D;
      if (type === 1) {
        D = data?.[i]?.$;
      } else {
        D = data?.data?.ODDS_DATA?.ODDS_ITEM?.[i]?.$;
      }
      if (!D) continue;
      var odds = D;
      var tr = document.getElementById("table_" + D.MATCH_ID);
      if (tr === null) continue;
      try {
        var oddsValue = tr.attributes["odds"]?.value;
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
  }, []);

  // bf_refresh(oddsRedux, 0);
  // tb_refresh(statusRedux, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const socket = io.connect(`${process.env.REACT_APP_URL_SERVER}`);
        socket.on("connect", () => {
          console.log("con ws");
        });

        socket.on("ODDS", async (data) => {
          try {
            const dataJson = JSON.parse(data);
            if (dataJson && dataJson['ODDS_DATA'] && dataJson['ODDS_DATA']['ODDS_ITEM']) {
              const dataOdds = dataJson['ODDS_DATA']['ODDS_ITEM'];
              await bf_refresh(dataOdds, 1);
            }
          } catch (error) {
            console.error("Error while parsing JSON data:", error.message);
          }
        });

        socket.on("SCHEDULE", async (data) => {
          try {
            const dataJson = JSON.parse(data);
            if (dataJson && dataJson['SCHEDULE_DATA'] && dataJson['SCHEDULE_DATA']['SCHEDULE_ITEM']) {
              tb_refresh(dataJson['SCHEDULE_DATA']['SCHEDULE_ITEM'], 1);
            }
          } catch (error) {
            console.error("Error while parsing JSON data:", error.message);
          }
        });

        socket.on("disconnect", () => {
          console.log("dis ws");
        });



        return () => {
          socket.disconnect();
        };
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const sortedMatches = useMemo(() => {
    return schedule.data.sort((a, b) => {
      const timeA = new Date(a.MATCH_TIME);
      const timeB = new Date(b.MATCH_TIME);
      return timeA - timeB;
    });
  }, [schedule.data]);

  return (
    <div id='teamid'>
      <div id='6in1'>
        <table width="100%" border="0" align="center" cellPadding="2" cellSpacing="1" className="odds-table-bg" data-t="">
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

        <React.Fragment>
          {sortedMatches.filter((match) => match.STATUS >= 1).map((e) => {
            const oddsItemData = oddsRedux.data?.ODDS_DATA?.ODDS_ITEM;
            const scheduleItemData = statusRedux.data?.SCHEDULE_DATA?.SCHEDULE_ITEM;
            const matchedOddsItem = oddsItemData?.find(item => item.$?.MATCH_ID === e.MATCH_ID);
            const matchedScheduleItem = scheduleItemData?.find(item => item.$?.MATCH_ID === e.MATCH_ID);

            if (matchedOddsItem || matchedScheduleItem) {
              return <MatchTable key={e.MATCH_ID} e={e} oddsRedux={matchedOddsItem} statusRedux={matchedScheduleItem} />;
            }

            return null;
          })}
          {sortedMatches.filter((match) => match.STATUS < 1).map((e) => {
            const oddsItemData = oddsRedux.data?.ODDS_DATA?.ODDS_ITEM;
            const scheduleItemData = statusRedux.data?.SCHEDULE_DATA?.SCHEDULE_ITEM;
            const matchedOddsItem = oddsItemData?.find(item => item.$?.MATCH_ID === e.MATCH_ID);
            const matchedScheduleItem = scheduleItemData?.find(item => item.$?.MATCH_ID === e.MATCH_ID);

            if (matchedOddsItem || matchedScheduleItem) {
              return <MatchTable key={e.MATCH_ID} e={e} oddsRedux={matchedOddsItem} statusRedux={matchedScheduleItem} />;
            }

            return null;
          })}
        </React.Fragment>
      </div>
    </div>
  );
}