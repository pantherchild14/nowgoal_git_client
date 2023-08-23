import React, { useLayoutEffect, useMemo, useEffect, useCallback } from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { renderToString } from "react-dom/server";

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import * as actions from "../../../../redux/actions";
import { scheduleState$, oddsallState$ } from "../../../../redux/selectors";
import DataTable from "./DataTable";

const CaoThu = () => {
  const dispatch = useDispatch();
  const schedule = useSelector(scheduleState$);
  const odds = useSelector(oddsallState$);

  useLayoutEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(actions.getSchedule.getSchedulesRequest()),
        dispatch(actions.getOddsAllRT.getOddsAllRTRequest()),
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
      var tr = document.getElementById("tr_" + D.MATCH_ID);
      if (tr === null) continue;
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
      var tr = document.getElementById("tr_" + D.MATCH_ID);
      if (tr === null) continue;
      try {
        var oddsValue = tr.attributes["odds"]?.value;
        if (oddsValue && oddsValue.trim() !== "") {
          const old = JSON.parse(oddsValue);

          const upoddsHtml = getUpDownIconHtml(D.HomeHandicap, old.HomeHandicap);
          const goalHtml = getUpDownIconHtml(D.Handicap, old.Handicap);
          const downoddsHtml = getUpDownIconHtml(D.AwayHandicap, old.AwayHandicap);

          const up_t_oddsHtml = getUpDownIconHtml(D.Over, old.Over);
          const goal_t_Html = getUpDownIconHtml(D.Goals, old.Goals);
          const down_t_oddsHtml = getUpDownIconHtml(D.Under, old.Under);

          updateElement(upoddsHtml, "upodds_" + D.MATCH_ID);
          updateElement(goalHtml, "goal_" + D.MATCH_ID);
          updateElement(downoddsHtml, "downodds_" + D.MATCH_ID);

          updateElement(up_t_oddsHtml, "upodds_" + D.MATCH_ID);
          updateElement(goal_t_Html, "goal_" + D.MATCH_ID);
          updateElement(down_t_oddsHtml, "downodds_" + D.MATCH_ID);
        }
        function getUpDownIconHtml(newValue, oldValue) {
          if (parseFloat(oldValue) !== parseFloat(newValue)) {
            if (parseFloat(oldValue) > parseFloat(newValue)) {
              return (
                <span className="down" style={{ position: 'relative' }}>
                  {newValue} <ArrowDropDownIcon style={{ color: 'red', position: 'absolute', top: '-4px' }} />
                </span>
              );
            } else if (parseFloat(oldValue) < parseFloat(newValue)) {
              return (
                <span className="up" style={{ position: 'relative' }}>
                  {newValue} <ArrowDropUpIcon style={{ color: '#0d6efd', position: 'absolute', top: '-4px' }} />
                </span>
              );
            }
          }
          return newValue;
        }

        function updateElement(htmlValue, elementId) {
          const element = document.getElementById(elementId);
          if (element) {
            element.innerHTML = renderToString(htmlValue);
          }
        }

      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
      tr.attributes["odds"].value = JSON.stringify(odds);
    }
  }, []);

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

  if (schedule.data.length === 0 || odds.data.length === 0) {
    return;
  }

  return (
    <React.Fragment>
      <TableContent schedule={schedule} odds={odds} />
    </React.Fragment>
  );
};

export default CaoThu;

const TableContent = ({ schedule, odds }) => {
  const sortedMatches = useMemo(() => {
    return schedule.data.sort((a, b) => {
      const timeA = new Date(a.MATCH_TIME);
      const timeB = new Date(b.MATCH_TIME);
      return timeA - timeB;
    });
  }, [schedule.data]);

  return (
    <table className="dntable-list -td-0 table table-hover table-striped table-bordered align-middle">
      <thead>
        <tr>
          <td rowSpan="2" className="td-time">Time</td>
          <td rowSpan="2" className="td-timestart">Thời gian<br />mở kèo</td>
          <td rowSpan="2" className="td-league">League</td>
          <td rowSpan="2" className="td-match">Match</td>
          <td colSpan="7" className="td-handicap">Kèo Handicap</td>
          <td colSpan="7" className="td-overunder">Over/Under</td>
          <td rowSpan="2" className="td-view"></td>
        </tr>
        <tr>
          <td className="td-handicap-live">Kèo Live</td>
          <td className="td-handicap-odds-live">Odds Live</td>
          <td className="td-handicap-slot-open">Kèo Mở</td>
          <td className="td-handicap-odds-open">Odds Mở</td>
          <td className="td-handicap-bd-live">Biến động<br />kèo(Live)</td>
          <td className="td-handicap-odds-bd">Odds<br />biến động</td>
          <td className="td-handicap-tips">Tips</td>
          <td className="td-handicap-keo-live">Kèo Live</td>
          <td className="td-overunder-odds">Odds live</td>
          <td className="td-overunder-slot-open">Kèo mở</td>
          <td className="td-overunder-odds">Odds mở</td>
          <td className="td-overunder-bd-live">Biến động<br />Live</td>
          <td className="td-overunder-odds-bd">Odds<br />biến động</td>
          <td className="td-overunder-tip">Tips</td>
        </tr>
      </thead>
      <tbody id="tbody-data" className="tbody-data">
        <React.Fragment>
          {sortedMatches.filter((match) => match.STATUS >= 1).map((e) => {
            const oddsItemData = odds.data?.ODDS_DATA?.ODDS_ITEM;
            const matchedOddsItem = oddsItemData?.find(item => item.$?.MATCH_ID === e.MATCH_ID);

            if (matchedOddsItem) {
              return <DataTable key={e.MATCH_ID} e={e} odds={matchedOddsItem} />;
            }
            return null;
          })}
          {sortedMatches.filter((match) => match.STATUS < 1).map((e) => {
            const oddsItemData = odds.data?.ODDS_DATA?.ODDS_ITEM;
            const matchedOddsItem = oddsItemData?.find(item => item.$?.MATCH_ID === e.MATCH_ID);

            if (matchedOddsItem) {
              return <DataTable key={e.MATCH_ID} e={e} odds={matchedOddsItem} />;
            }
            return null;
          })}
        </React.Fragment>
      </tbody>
    </table>
  );
};
