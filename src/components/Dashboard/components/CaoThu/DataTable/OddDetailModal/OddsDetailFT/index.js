import React from "react";

const OddsDetailFT = (props) => {
    const { parsedOdds } = props;

    try {
        const JsonData = (parsedOdds['AH']);
        const style = {
            scroll: {
                maxHeight: '460px',
                marginTop: '10px',
                padding: '0 5px',
                overflowY: 'auto',
            }
        };

        const convertTime = (time) => {
            const timestamp = time * 1000;
            const dt_object = new Date(timestamp);

            const year = dt_object.getFullYear();
            const month = (dt_object.getMonth() + 1).toString().padStart(2, '0');
            const day = dt_object.getDate().toString().padStart(2, '0');
            const hours = dt_object.getHours().toString().padStart(2, '0');
            const minutes = dt_object.getMinutes().toString().padStart(2, '0');

            const formattedTime = `${day}-${month} ${hours}:${minutes}`;
            return formattedTime;
        };

        return (
            <div id='caothu' className='caothu-comp' style={style.scroll}>
                <table width="100%" border="0" align="center" cellPadding="2" cellSpacing="1">
                    <tbody>
                        <tr align="center">
                            <th width="16%">Time</th>
                            <th width="16%">Score</th>
                            <th width="16%">Home</th>
                            <th width="16%">Draw</th>
                            <th width="16%">Away</th>
                            <th width="20%">Update</th>
                        </tr>
                        {JsonData.map((data, index) => (
                            <tr key={index}>
                                <td className="rb">
                                    {data['AH']['ht'] ? data['AH']['ht'] : 'Live'}
                                </td>
                                <td className="rb">{data['AH']['gs']}-{data['AH']['hs']}</td>
                                <td><span data-o="1.13" className="up2">{data['AH']['odds']['u']}</span></td>
                                <td><span data-o="0" className="">{data['AH']['odds']['g']}</span></td>
                                <td><span data-o="0.76" className="down2">{data['AH']['odds']['d']}</span></td>
                                <td className="lb time" name="timeData" data-t={data['AH']['mt']} data-tf="6">
                                    {convertTime(data['AH']['mt'])}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } catch (error) {
        console.error("Error parsing JSON data:", error.message);
        return null;
    }
};

export default OddsDetailFT;
