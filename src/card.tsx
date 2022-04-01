import React, { useRef, useState } from 'react';
import { Recording } from './xenocanto';

export interface CardProps {
    recording: Recording;
    onAnswer?: (answer: string, correct: boolean) => void;
}

interface QuestionProps {
    recording: Recording;
    onSubmit: (answer: string) => void;
}

const QuestionCard = (props: QuestionProps) => {
    const ref = useRef<HTMLInputElement | null>(null);
    return <div>
        <audio controls autoPlay loop src={props.recording.file}>stop using netscape navigator lol</audio>
        <br/>
        <form onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit(ref.current?.value ?? '');
        }}>
            <input type="text" placeholder="common name" ref={ref}/>
        </form>
    </div>;
};

interface AnswerProps {
    recording: Recording;
    correct: boolean;
    onFinish: () => void;
}

const AnswerCard = (props: AnswerProps) => {
    const nextButton = <button onClick={props.onFinish}>next bird</button>;

    if (props.correct) {
        return <div>
            <p>Correct!</p>
            {nextButton}
        </div>;
    } else {
        return <div>
            <p>Incorrect. the correct answer was the {props.recording.en}</p>
            {nextButton}
        </div>;
    }
};

export const Card = (props: CardProps) => {
    const [answer, setAnswer] = useState<string>();

    if (answer !== undefined) {
        const correct = answer.localeCompare(props.recording.en, undefined, { sensitivity: 'accent' }) === 0;
        return <AnswerCard
            recording={props.recording}
            correct={correct}
            onFinish={() => props.onAnswer && props.onAnswer(answer, correct)}
        />;
    } else {
        return <QuestionCard
            recording={props.recording}
            onSubmit={setAnswer}
        />;
    }
};
