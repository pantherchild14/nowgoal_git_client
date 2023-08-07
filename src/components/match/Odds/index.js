import BasicTabs from './HeaderOdds';
import OddsFT from './OddsTab/OddsFT';
import OddsHT from './OddsTab/OddsHT';

const Odds = (props) => {
    const { odds } = props;

    if(!odds || !odds['data'] || !odds['data'].$) {
        return;
    }

    const oddsKeys = ['ODDS_AH_FT', 'ODDS_AH_HT', 'ODDS_EURO_FT', 'ODDS_EURO_HT', 'ODDS_OU_FT', 'ODDS_OU_HT'];
    const parseJSON = (jsonString) => {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return {};
        }
    };

    const parsedOdds = oddsKeys.reduce((acc, key) => {
    acc[key] = parseJSON(odds['data'].$[key]);
    return acc;
    }, {});

    const { ODDS_AH_FT, ODDS_AH_HT, ODDS_EURO_FT, ODDS_EURO_HT, ODDS_OU_FT, ODDS_OU_HT } = parsedOdds;
    

    return (
        <BasicTabs ODDS_AH_FT={ODDS_AH_FT} ODDS_EURO_FT={ODDS_EURO_FT} ODDS_OU_FT={ODDS_OU_FT} ODDS_AH_HT={ODDS_AH_HT} ODDS_EURO_HT={ODDS_EURO_HT} ODDS_OU_HT={ODDS_OU_HT}/>
    );
}

export default Odds;