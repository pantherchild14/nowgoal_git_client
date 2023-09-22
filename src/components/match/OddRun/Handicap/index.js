import { UTCtoLocalTime, convertTime } from "../../../../helpers";

const HandicapRun = (props) => {

    const { parsedOdds, parsedOddsRun } = props;

    if (!parsedOdds || !parsedOdds['AH']) {
        return null;
    }


    try {
        let JsonData;
        if (parsedOddsRun && parsedOddsRun['AH']) {
            JsonData = (parsedOddsRun['AH']);
        } else {
            JsonData = (parsedOdds['AH']);
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
                            <th colspan="6">Asian Handicap Odds</th>
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
                                    {data['AH'] && data['AH']['ht'] ? data['AH']['ht'] : 'Live'}
                                </td>
                                <td width="16%" className="rb">{data['AH'] && data['AH']['gs']}-{data['AH'] && data['AH']['hs']}</td>
                                <td width="16%"><span data-o="1.13" className="up2">{data['AH'] && data['AH']['odds'] && data['AH']['odds']['u']}</span></td>
                                <td width="16%"><span data-o="0" className="">{data['AH'] && data['AH']['odds'] && data['AH']['odds']['g']}</span></td>
                                <td width="16%"><span data-o="0.76" className="down2">{data['AH'] && data['AH']['odds'] && data['AH']['odds']['d']}</span></td>
                                <td width="20%" className="lb time" name="timeData" data-t={data['AH'] && data['AH']['mt']} data-tf="6">
                                    {data['AH'] && data['AH']['mt'] ? convertTime(data['AH']['mt']) : ''}
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

export default HandicapRun