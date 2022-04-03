import React, { useState, useEffect } from 'react';
import { getRecordings, Recording, birdFilter } from './xenocanto';
import { Card } from './card';
import { randomChoice, useCounter } from './util'
import { Filter } from './filter'

export const App = () => {
    const [recordings, setRecordings] = useState<Recording[]>();
    const [currentRec, setCurrentRec] = useState<Recording>();

    const [seen, incSeen] = useCounter();
    const [got, incGot] = useCounter();

    const [query, setQuery] = useState<string>('loc:alberta');

    const randomRec = () => {
        const rec = randomChoice(recordings!);
        console.log(`pssst: it's a ${rec.en} ya dummy!`);
        setCurrentRec(rec);
        incSeen();
    };

    useEffect(() => {
        (async () => {
            for await (const recordings of getRecordings(query, birdFilter)) {
                setRecordings(recordings);
            }
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    // when we get recordings, maybe update our current recording
    useEffect(() => {
        if (recordings && recordings.length > 0 && currentRec === undefined) {
            randomRec();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recordings]);

    if (recordings && currentRec) {
        return <div>
            <Filter query={query} setQuery={setQuery} recordings={recordings} />
            <p>{got}/{seen-1} ({Math.floor((got/(seen-1)) * 100)}%)</p>
            <Card
                key={currentRec.id}
                recording={currentRec}
                onAnswer={(answer, correct) => { randomRec(); incGot(correct); }}
            />
        </div>;
    } else {
        return <p>loading...</p>
    }
};
