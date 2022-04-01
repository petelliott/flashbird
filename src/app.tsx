import React, { useState, useEffect } from 'react';
import { getRecordings, Recording } from './xenocanto';
import { Card } from './card';
import { randomChoice } from './util'

export const App = () => {
    const [recordings, setRecordings] = useState<Recording[]>();
    const [currentRec, setCurrentRec] = useState<Recording>();

    const randomRec = (recs: Recording[]) => {
        const rec = randomChoice(recs);
        console.log(`pssst: it's a ${rec.en} ya dummy!`);
        setCurrentRec(rec);
    };

    useEffect(() => {
        (async () => {
            const recordings = await getRecordings('cnt:canada');
            setRecordings(recordings);
            randomRec(recordings);
        })();
    }, []);

    if (recordings && currentRec) {
        return <Card
            key={currentRec.id}
            recording={currentRec}
            onAnswer={(answer, correct) => randomRec(recordings)}
        />;
    } else {
        return <p>loading...</p>
    }
};
