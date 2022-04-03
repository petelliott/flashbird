import React, { useRef, useMemo } from 'react';
import { Recording } from './xenocanto';

export interface FilterProps {
    query: string;
    setQuery: (q: string) => void;
    recordings: Recording[];
}

export const Filter = (props: FilterProps) => {
    const queryRef = useRef<HTMLInputElement | null>(null);

    const nspecies = useMemo(
        () => (new Set<string>(props.recordings.map(r => r.en))).size,
        [props.recordings]
    );

    return <div>
        <input type="text" placeholder={props.query} ref={queryRef}/>
        <button onClick={() => props.setQuery(queryRef.current?.value ?? '')}>filter</button>
        {props.recordings.length} recordings, {nspecies} species.
    </div>;
};
