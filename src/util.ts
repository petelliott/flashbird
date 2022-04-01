import { useState, useCallback } from 'react';

export const randomChoice = <T>(list: T[]): T =>
    list[Math.floor(Math.random() * list.length)];

export const useCounter = (): [number, (inc?: boolean) => void] => {
    const [n, setN] = useState<number>(0);
    const inc = useCallback((inc?: boolean) => {
        if (inc === undefined || inc) {
            setN(n + 1);
        }
    }, [n]);

    return [n, inc];
}
