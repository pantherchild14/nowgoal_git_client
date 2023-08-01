import { useParams } from 'react-router-dom';
import MatchLive from '../components/match';

function MatchPage() {
    const { id } = useParams();

    return ( 
        <>
            <MatchLive matchID={id} />
        </>
    );
}

export default MatchPage;