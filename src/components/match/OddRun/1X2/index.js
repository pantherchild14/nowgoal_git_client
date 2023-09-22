import { UTCtoLocalTime, convertTime } from "../../../../helpers";

const X2Run = (props) => {

    const { parsedOdds, parsedOddsRun } = props;
    if (!parsedOdds || !parsedOdds['OP']) {
        return null;
    }

    try {
        let JsonData;
        if (parsedOddsRun && parsedOddsRun['OP']) {
            JsonData = parsedOddsRun['OP'];
        } else {
            JsonData = parsedOdds['OP'];
        }
        const style = {
            caothu: {
                height: '460px',
            },
        };

        return (
            <div id='caothu' className='caothu-comp' style={style.caothu}>
                <table width="100%" border="0" align="center" cellPadding="2" cellSpacing="1">
                    <thead>
                        <tr align="center" className="flexed" height="30">
                            <th colspan="6">1X2 Odds</th>
                        </tr>
                        <tr align="center" className="flexed1">
                            <th width="10%">Time</th>
                            <th width="10%">Score</th>
                            <th width="10%">Home</th>
                            <th width="10%">Draw</th>
                            <th width="10%">Away</th>
                            <th width="15%">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {JsonData.map((data, index) => (
                            <tr key={index}>
                                <td width="10%" className="rb">
                                    {data['OP'] && data['OP']['ht'] ? data['OP']['ht'] : 'Live'}
                                </td>
                                <td width="10%" className="rb">{data['OP'] && data['OP']['gs']}-{data['OP'] && data['OP']['hs']}</td>
                                <td width="10%"><span data-o="1.13" className="up2">{data['OP'] && data['OP']['odds'] && data['OP']['odds']['u']}</span></td>
                                <td width="10%"><span data-o="0" className="">{data['OP'] && data['OP']['odds'] && data['OP']['odds']['g']}</span></td>
                                <td width="10%"><span data-o="0.76" className="down2">{data['OP'] && data['OP']['odds'] && data['OP']['odds']['d']}</span></td>
                                <td width="15%" className="lb time" name="timeData" data-t={data['OP'] && data['OP']['mt']} data-tf="6">
                                    {data['OP'] && data['OP']['mt'] ? convertTime(data['OP']['mt']) : ''}
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
}

export default X2Run