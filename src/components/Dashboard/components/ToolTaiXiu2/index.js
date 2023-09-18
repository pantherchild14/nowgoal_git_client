import React, { useState, useEffect } from "react";


const ToolTaiXiu2 = () => {
    return (
        <React.Fragment>
            <div className="tool_tx_2">
                <table>
                    <thead>
                        <tr>
                            <th width="30%" colSpan={2}>GIẢI BÓNG ĐÁ NỮ NHẬT BẢN HẠNG NHẤT</th>
                            <th width="10%">Cược chấp toàn trận</th>
                            <th width="10%">Tài Xỉu Toàn Trận</th>
                            <th width="10%">Bàn Thắng Tiếp Theo</th>
                            <th width="10%">Cược Chấp Hiệp 1</th>
                            <th width="10%">Tài Xỉu Hiệp 1</th>
                            <th width="10%">1X2 Hiệp 1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td width="7%">
                                <div className="c-match__timer">
                                    <div className="c-match-score"><span className="c-text">1</span><span className="c-text">-</span><span className="c-text">1</span></div>
                                    <div className="c-match-timer-info">
                                        <span className="c-match-h-time"><span className="c-match-time__item">H.Time <font className="c-match-time__minute"></font></span></span>
                                    </div>
                                </div>
                            </td>
                            <td width="23%">
                                <div className="c-match__event">
                                    <div className="c-match__team">
                                        <div className="c-team c-team--favor" title="Iga FC Kunoichi Mie (Nữ)"><div className="c-team__info"><span className="c-team-name">Iga FC Kunoichi Mie (Nữ)</span></div></div>
                                    </div>
                                    <div className="c-match__team">
                                        <div className="c-team" title="Asahi Intecc Loveledge Nagoya (Nữ)">
                                            <div className="c-team__info"><span class="c-team-name">Asahi Intecc Loveledge Nagoya (Nữ)</span></div>
                                        </div>
                                    </div>
                                    <div className="c-match__team">
                                        <div className="c-text">Hòa</div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default ToolTaiXiu2;