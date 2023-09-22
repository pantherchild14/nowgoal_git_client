import React, { useLayoutEffect, useMemo, useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import * as actions from "../../../../redux/actions";
import { scheduleState$, oddsallState$, statusrtState$ } from "../../../../redux/selectors";
import DataTable from "./DataTable";
import DateSelector from "./Functions/DateSelector";
import { convertTime, convertTimeSelectOddRun, formatNumber } from "../../../../helpers";

const CaoThu = () => {
  const dispatch = useDispatch();
  const schedule = useSelector(scheduleState$);
  const odds = useSelector(oddsallState$);
  const statusRedux = useSelector(statusrtState$);

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedHandicap, setSelectedHandicap] = useState("");
  const [selectedOddHandicap, setSelectedOddHandicap] = useState("");
  const [selectedOver, setSelectedOver] = useState("");
  const [selectedOddOver, setSelectedOddOver] = useState("");
  const [selectedTimeRun, setSelectedTimeRun] = useState("");
  const [selectedTeamUp, setSelectedTeamUp] = useState("");
  const [bfRefresh, SetBfRefresh] = useState([]);
  const [threeIn1, Set3In1] = useState([]);

  useLayoutEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  const fetchData = async (date) => {
    await Promise.all([
      dispatch(actions.getSchedule.getSchedulesRequest(date)),
      dispatch(actions.getOddsAllRT.getOddsAllRTRequest()),
      dispatch(actions.getStatusRT.getStatusRTRequest()),
    ]);
  };

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

  useEffect(() => {
    var length = 0;
    length = bfRefresh?.length || 0;

    for (var i = 0; i < length; i++) {
      var D;
      D = bfRefresh?.[i]?.$;

      if (!D) continue;
      var tr = document.getElementById("tr_" + D.MATCH_ID);
      if (tr === null) continue;
      try {
        var DHandicapJson = JSON.parse(D.ODDS_AH_FT);
        var DOuJson = JSON.parse(D.ODDS_OU_FT);
        /* Asian Handicap */
        var upodds = tr.querySelector("#upodds_" + D.MATCH_ID);
        var downodds = tr.querySelector("#downodds_" + D.MATCH_ID);
        var goal = tr.querySelector("#goal_" + D.MATCH_ID);
        var goalLive = tr.querySelector("#goalLive_" + D.MATCH_ID);

        /* Over/Under */
        var goal_t1 = tr.querySelector("#goal_t1_" + D.MATCH_ID);
        var upodds_t = tr.querySelector("#upodds_t_" + D.MATCH_ID);
        var downodds_t = tr.querySelector("#downodds_t_" + D.MATCH_ID);

        updateElement(formatNumber(DHandicapJson.l.u), upodds);
        updateElement(formatNumber(DHandicapJson.l.g) < 0 ? formatNumber(-DHandicapJson.l.g) : formatNumber(-DHandicapJson.l.g), goal);
        updateElement(formatNumber(DHandicapJson.l.g) < 0 ? formatNumber(DHandicapJson.l.g) : formatNumber(DHandicapJson.l.g), goalLive);
        updateElement(formatNumber(DHandicapJson.l.d), downodds);

        updateElement(formatNumber(DOuJson.l.u), upodds_t);
        updateElement(formatNumber(DOuJson.l.g), goal_t1);
        updateElement(formatNumber(DOuJson.l.d), downodds_t);

        function updateElement(newValue, element) {
          element.textContent = newValue;
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }


  }, [bfRefresh])

  useEffect(() => {
    const get3In1 = () => {
      const length = threeIn1?.length || 0;

      for (let i = 0; i < length; i++) {
        const D = threeIn1?.[i]?.$;

        if (!D) continue;

        const tr = document.getElementById("tr_" + D._MATCH_ID);
        if (!tr) continue;

        try {
          const odds = JSON.parse(D._ODDS);
          const oddAH_ft = odds.ODDS_FT.AH;
          const oddOU_ft = odds.ODDS_FT.OU;

          if (selectedTimeRun !== "") {
            updateAHOdds(tr, D, oddAH_ft);
            updateOUOdds(tr, D, oddOU_ft);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    }

    // Hàm cập nhật AH odds
    const updateAHOdds = (tr, D, oddAH_ft) => {
      if (oddAH_ft && oddAH_ft.length > 0) {

        oddAH_ft.sort((a, b) => Math.abs(hourse(a.AH.mt) - selectedTimeRun) - Math.abs(hourse(b.AH.mt) - selectedTimeRun));
        const nearestOdd = oddAH_ft.find(odd => hourse(odd.AH.mt) <= selectedTimeRun);

        if (nearestOdd) {
          const upodds = tr.querySelector("#upodds_" + D._MATCH_ID);
          const downodds = tr.querySelector("#downodds_" + D._MATCH_ID);
          const goal = tr.querySelector("#goal_" + D._MATCH_ID);
          const goalLive = tr.querySelector("#goalLive_" + D._MATCH_ID);

          updateElement(formatNumber(nearestOdd.AH.odds.u), upodds);
          updateElement(formatNumber(nearestOdd.AH.odds.g) < 0 ? formatNumber(-nearestOdd.AH.odds.g) : formatNumber(-nearestOdd.AH.odds.g), goal);
          updateElement(formatNumber(nearestOdd.AH.odds.g) < 0 ? formatNumber(nearestOdd.AH.odds.g) : formatNumber(nearestOdd.AH.odds.g), goalLive);
          updateElement(formatNumber(nearestOdd.AH.odds.d), downodds);
        }
      }
    }

    // Hàm cập nhật OU odds
    const updateOUOdds = (tr, D, oddOU_ft) => {
      if (oddOU_ft && oddOU_ft.length > 0) {
        oddOU_ft.sort((a, b) => Math.abs(hourse(a.OU.mt) - selectedTimeRun) - Math.abs(hourse(b.OU.mt) - selectedTimeRun));
        const nearestOdd = oddOU_ft.find(odd => hourse(odd.OU.mt) <= selectedTimeRun);

        if (nearestOdd) {
          const goal_t1 = tr.querySelector("#goal_t1_" + D._MATCH_ID);
          const upodds_t = tr.querySelector("#upodds_t_" + D._MATCH_ID);
          const downodds_t = tr.querySelector("#downodds_t_" + D._MATCH_ID);

          updateElement(formatNumber(nearestOdd.OU.odds.u), upodds_t);
          updateElement(formatNumber(nearestOdd.OU.odds.g), goal_t1);
          updateElement(formatNumber(nearestOdd.OU.odds.d), downodds_t);
        }
      }
    }

    const hourse = (time) => {
      var mtInSeconds = time;
      var mtInMilliseconds = mtInSeconds * 1000;
      var mtDate = new Date(mtInMilliseconds);

      var mtHours = mtDate.getHours();
      return mtHours;
    }


    // Hàm cập nhật phần tử HTML
    const updateElement = (newValue, element) => {
      element.innerHTML = newValue;
    }

    get3In1();
  }, [threeIn1, selectedTimeRun]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const socket = io.connect(`${process.env.REACT_APP_URL_SERVER}`);
        socket.on("connect", () => {
          console.log("con ws");
        });

        socket.on("XML_ODDS", async (data) => {
          try {
            const dataJson = JSON.parse(data);
            if (dataJson && dataJson['ODDS_DATA'] && dataJson['ODDS_DATA']['ODDS_ITEM']) {
              SetBfRefresh(dataJson['ODDS_DATA']['ODDS_ITEM']);
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

        socket.on("3IN1", async (data) => {
          try {
            const dataJson = JSON.parse(data);
            if (dataJson && dataJson['ODDS_DATA'] && dataJson['ODDS_DATA']['ODDS_ITEM']) {
              Set3In1(dataJson['ODDS_DATA']['ODDS_ITEM']);
            }
          } catch (error) {
            console.error("Error while parsing JSON data:", error.message);
          }
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
    return <div style={{ textAlign: 'center' }}><CircularProgress /></div>;
  }

  const handleReset = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
    setSelectedHandicap("");
    setSelectedOddHandicap("");
    setSelectedOver("");
    setSelectedOddOver("");
    setSelectedTimeRun("");
    setSelectedTeamUp("");
    SetBfRefresh([]);
    Set3In1([]);
  };

  return (
    <React.Fragment>
      <Box style={{ paddingBottom: '30px' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
          <Grid item xs={2}>
            <DateSelector selectedDate={selectedDate} onSelectDate={setSelectedDate} />
          </Grid>
          <Grid item xs={2}>
            <div>
              <label>
                Thời gian biến động kèo::
                <select value={selectedTimeRun} onChange={(e) => setSelectedTimeRun(e.target.value)} >
                  <option value="">All</option>
                  <option value="3">3H</option>
                  <option value="6">6H</option>
                  <option value="12">12H</option>
                  <option value="24">1 Ngày</option>
                  <option value="48">2 Ngày</option>
                  <option value="52">3 Ngày</option>
                </select>
              </label>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div>
              <label>
                Biến động Handicap:
                <select value={selectedHandicap} onChange={(e) => setSelectedHandicap(e.target.value)}>
                  <option value="">All</option>
                  <option value="0.25">0.25</option>
                  <option value="0.5">0.5</option>
                  <option value="0.75">0.75</option>
                  <option value="1">1</option>
                </select>
              </label>
            </div>
          </Grid>

          <Grid item xs={6}>
            <div>
              <label>
                Biến động Tài / Xỉu:
                <select value={selectedOver} onChange={(e) => setSelectedOver(e.target.value)}>
                  <option value="">All</option>
                  <option value="0.25">0.25</option>
                  <option value="0.5">0.5</option>
                  <option value="0.75">0.75</option>
                  <option value="1">1</option>
                </select>
              </label>
            </div>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}>
            <div>
              <label>
                Đội kèo trên:
                <select value={selectedTeamUp} onChange={(e) => setSelectedTeamUp(e.target.value)} >
                  <option value="">All</option>
                  <option value="home">Home</option>
                  <option value="away">Away</option>
                </select>
              </label>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div>
              <label>
                Biến động Odds Handicap:
                <select value={selectedOddHandicap} onChange={(e) => setSelectedOddHandicap(e.target.value)}>
                  <option value="">All</option>
                  <option value="0.05">0.05</option>
                  <option value="0.10">0.10</option>
                  <option value="0.15">0.15</option>
                  <option value="0.20">0.20</option>
                </select>
              </label>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div>
              <label>
                Biến động Odds Tài / Xỉu :
                <select value={selectedOddOver} onChange={(e) => setSelectedOddOver(e.target.value)}>
                  <option value="">All</option>
                  <option value="0.05">0.05</option>
                  <option value="0.10">0.10</option>
                  <option value="0.15">0.15</option>
                  <option value="0.20">0.20</option>
                </select>
              </label>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div>
              <label>
                Reset Tất Cả:
                <button onClick={handleReset}>Reset</button>
              </label>
            </div>
          </Grid>
        </Grid>
      </Box>

      <TableContent schedule={schedule} statusRedux={statusRedux} odds={odds} selectedOddHandicap={selectedOddHandicap} selectedHandicap={selectedHandicap} selectedOddOver={selectedOddOver} selectedOver={selectedOver} selectedTeamUp={selectedTeamUp} />
    </React.Fragment>
  );
};

export default CaoThu;

const TableContent = ({ schedule, odds, selectedHandicap, selectedOddHandicap, selectedOddOver, selectedOver, statusRedux, selectedTeamUp }) => {
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
            const matchedOddsItem = oddsItemData?.find(item => item?.$?.MATCH_ID === e.MATCH_ID);

            const scheduleItemDataRT = statusRedux.data?.SCHEDULE_DATA?.SCHEDULE_ITEM;
            const matchedScheduleItemRT = scheduleItemDataRT?.find(item => item.$?.MATCH_ID === e.MATCH_ID);

            const bdCellInsertUpOdd = document.getElementById("insertUpOdd_" + e.MATCH_ID);
            const bdCellInsertGoal = document.getElementById("insertGoal_" + e.MATCH_ID);
            const bdCellInsertGoal_t1 = document.getElementById("insertGoal_t1_" + e.MATCH_ID);
            const bdCellInsertUpodds_t = document.getElementById("insertUpodds_t_" + e.MATCH_ID);
            const bdValueInsertUpOdd = bdCellInsertUpOdd?.textContent;
            const bdValueInsertGoal = bdCellInsertGoal?.textContent;
            const bdValueInsertGoal_t1 = bdCellInsertGoal_t1?.textContent;
            const bdValueInsertUpodds_t = bdCellInsertUpodds_t?.textContent;

            if (matchedOddsItem) {
              if ((!selectedHandicap || (bdValueInsertGoal && parseFloat(bdValueInsertGoal) <= parseFloat(selectedHandicap))) &&
                (!selectedOddHandicap || (bdValueInsertUpOdd && parseFloat(bdValueInsertUpOdd) <= parseFloat(selectedOddHandicap))) &&
                (!selectedOver || (bdValueInsertGoal_t1 && parseFloat(bdValueInsertGoal_t1) <= parseFloat(selectedOver))) &&
                (!selectedOddOver || (bdValueInsertUpodds_t && parseFloat(bdValueInsertUpodds_t) <= parseFloat(selectedOddOver)))) {

                return <DataTable key={e.MATCH_ID} selectedTeamUp={selectedTeamUp} e={e} odds={matchedOddsItem} statusRedux={matchedScheduleItemRT} />;
              }
            }

            return null;
          })}

          {sortedMatches.filter((match) => match.STATUS <= 0).map((e) => {
            const oddsItemData = odds.data?.ODDS_DATA?.ODDS_ITEM;
            const matchedOddsItem = oddsItemData?.find(item => item?.$?.MATCH_ID === e.MATCH_ID);

            const scheduleItemDataRT = statusRedux.data?.SCHEDULE_DATA?.SCHEDULE_ITEM;
            const matchedScheduleItemRT = scheduleItemDataRT?.find(item => item.$?.MATCH_ID === e.MATCH_ID);

            const bdCellInsertUpOdd = document.getElementById("insertUpOdd_" + e.MATCH_ID);
            const bdCellInsertGoal = document.getElementById("insertGoal_" + e.MATCH_ID);
            const bdCellInsertGoal_t1 = document.getElementById("insertGoal_t1_" + e.MATCH_ID);
            const bdCellInsertUpodds_t = document.getElementById("insertUpodds_t_" + e.MATCH_ID);
            const bdValueInsertUpOdd = bdCellInsertUpOdd?.textContent;
            const bdValueInsertGoal = bdCellInsertGoal?.textContent;
            const bdValueInsertGoal_t1 = bdCellInsertGoal_t1?.textContent;
            const bdValueInsertUpodds_t = bdCellInsertUpodds_t?.textContent;

            if (matchedOddsItem) {
              if ((!selectedHandicap || (bdValueInsertGoal && parseFloat(bdValueInsertGoal) <= parseFloat(selectedHandicap))) &&
                (!selectedOddHandicap || (bdValueInsertUpOdd && parseFloat(bdValueInsertUpOdd) <= parseFloat(selectedOddHandicap))) &&
                (!selectedOver || (bdValueInsertGoal_t1 && parseFloat(bdValueInsertGoal_t1) <= parseFloat(selectedOver))) &&
                (!selectedOddOver || (bdValueInsertUpodds_t && parseFloat(bdValueInsertUpodds_t) <= parseFloat(selectedOddOver)))) {

                return <DataTable key={e.MATCH_ID} selectedTeamUp={selectedTeamUp} e={e} odds={matchedOddsItem} statusRedux={matchedScheduleItemRT} />;
              }
            }
            return null;
          })}

        </React.Fragment>
      </tbody>
    </table>
  );
};
