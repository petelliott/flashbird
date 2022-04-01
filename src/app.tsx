import React, { useState, useEffect } from 'react';
import { getRecordings, Recording } from './xenocanto';
import { Card } from './card';

export const App = () => {
    const [recordings, setRecordings] = useState<Recording[]>();

    useEffect(() => {
        (async () => {
            setRecordings(await getRecordings('cnt:canada'));
        })();
    }, []);

    if (recordings) {
        return <Card recording={recordings[0]} />;
    } else {
        return <p>loading...</p>
    }
};
