const X2Run = (props) => {

    const { parsedOdds } = props;
    if (!parsedOdds || !parsedOdds['OP']) {
        return null;
    }
    try {


        const JsonData = parsedOdds['OP'];

        console.log(JsonData);

        const style = {
            caothu: {
                height: '460px',
            },
            scroll: {
                maxHeight: '460px',
                // marginTop: '10px',
                padding: '0 5px',
                overflowY: 'auto',
                position: 'absolute',
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
            <div id='caothu' className='caothu-comp' style={style.caothu}>
                <table width="100%" border="0" align="center" cellPadding="2" cellSpacing="1">
                    <thead>
                        <tr align="center">
                            <th width="16%">Time</th>
                            <th width="16%">Score</th>
                            <th width="16%">Home</th>
                            <th width="16%">Draw</th>
                            <th width="16%">Away</th>
                            <th width="20%">Update</th>
                        </tr>
                    </thead>
                    <tbody style={style.scroll}>
                        {JsonData.map((data, index) => (
                            <tr key={index}>
                                <td width="16%" className="rb">
                                    {data['OP'] && data['OP']['ht'] ? data['OP']['ht'] : 'Live'}
                                </td>
                                <td width="16%" className="rb">{data['OP'] && data['OP']['gs']}-{data['OP'] && data['OP']['hs']}</td>
                                <td width="16%"><span data-o="1.13" className="up2">{data['OP'] && data['OP']['odds'] && data['OP']['odds']['u']}</span></td>
                                <td width="16%"><span data-o="0" className="">{data['OP'] && data['OP']['odds'] && data['OP']['odds']['g']}</span></td>
                                <td width="16%"><span data-o="0.76" className="down2">{data['OP'] && data['OP']['odds'] && data['OP']['odds']['d']}</span></td>
                                <td width="20%" className="lb time" name="timeData" data-t={data['OP'] && data['OP']['mt']} data-tf="6">
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