import { useState } from 'react';

export const randomChoice = <T>(list: T[]): T =>
    list[Math.floor(Math.random() * list.length)];

export const useCounter = (): [number, (inc?: boolean) => void] => {
    const [n, setN] = useState<number>(0);
    const inc = (inc?: boolean) => {
        if (inc === undefined || inc) {
            setN(n + 1);
        }
    }

    return [n, inc];
}
