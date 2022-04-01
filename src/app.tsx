import React, { useState, useEffect } from 'react';
import { getRecordings, Recording, birdFilter } from './xenocanto';
import { Card } from './card';
import { randomChoice, useCounter } from './util'

export const App = () => {
    const [recordings, setRecordings] = useState<Recording[]>();
    const [currentRec, setCurrentRec] = useState<Recording>();

    const [seen, incSeen] = useCounter();
    const [got, incGot] = useCounter();


    const randomRec = (recs: Recording[]) => {
        const rec = randomChoice(recs);
        console.log(`pssst: it's a ${rec.en} ya dummy!`);
        setCurrentRec(rec);
        incSeen();
    };

    useEffect(() => {
        (async () => {
            const recordings = await getRecordings('cnt:canada');
            const filteredRecs = birdFilter(recordings);
            setRecordings(filteredRecs);
            randomRec(filteredRecs);
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (recordings && currentRec) {
        return <div>
            <p>{got}/{seen-1} ({Math.floor((got/(seen-1)) * 100)}%)</p>
            <Card
                key={currentRec.id}
                recording={currentRec}
                onAnswer={(answer, correct) => { randomRec(recordings); incGot(correct); }}
            />
        </div>;
    } else {
        return <p>loading...</p>
    }
};
