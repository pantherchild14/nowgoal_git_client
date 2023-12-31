import { UTCtoLocalTime, convertTime } from "../../../../helpers";

const OverUnderRun = (props) => {

    const { parsedOdds, parsedOddsRun } = props;

    if (!parsedOdds || !parsedOdds['OU']) {
        return null;
    }



    try {
        let JsonData;

        if (parsedOddsRun && parsedOddsRun['OU']) {
            JsonData = parsedOddsRun['OU'];
        } else {
            JsonData = parsedOdds['OU'];
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
                            <th colspan="6">Over/Under Odds</th>
                        </tr>
                        <tr align="center" className="flexed1">
                            <th width="16%">Time</th>
                            <th width="16%">Score</th>
                            <th width="16%">Home</th>
                            <th width="16%">Draw</th>
                            <th width="16%">Away</th>
                            <th width="20%">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {JsonData.map((data, index) => (
                            <tr key={index}>
                                <td width="16%" className="rb">
                                    {data['OU'] && data['OU']['ht'] ? data['OU']['ht'] : 'Live'}
                                </td>
                                <td width="16%" className="rb">{data['OU'] && data['OU']['gs']}-{data['OU'] && data['OU']['hs']}</td>
                                <td width="16%"><span data-o="1.13" className="up2">{data['OU'] && data['OU']['odds'] && data['OU']['odds']['u']}</span></td>
                                <td width="16%"><span data-o="0" className="">{data['OU'] && data['OU']['odds'] && data['OU']['odds']['g']}</span></td>
                                <td width="16%"><span data-o="0.76" className="down2">{data['OU'] && data['OU']['odds'] && data['OU']['odds']['d']}</span></td>
                                <td width="20%" className="lb time" name="timeData" data-t={data['OU'] && data['OU']['mt']} data-tf="6">
                                    {data['OU'] && data['OU']['mt'] ? convertTime(data['OU']['mt']) : ''}
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

export default OverUnderRun