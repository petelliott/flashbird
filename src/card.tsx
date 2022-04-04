import React, { useRef, useState } from 'react';
import { Recording } from './xenocanto';
import './card.css';

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
    return <div className="card question">
        <div className="audiobox">
            <audio controls autoPlay loop src={props.recording.file}>stop using netscape navigator lol</audio>
        </div>
        <br/>
        <form onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit(ref.current?.value ?? '');
        }}>
            <input className="answerbox" type="text" placeholder="common name" ref={ref}/>
        </form>
    </div>;
};

interface AnswerProps {
    recording: Recording;
    correct: boolean;
    onFinish: () => void;
}

const AnswerCard = (props: AnswerProps) => {
    return <div className="card answer">
        {
            (props.correct)?
                <p className="correct">Correct ✔</p> :
                <p className="incorrect">Incorrect ✘</p>
        }
        <p>{props.recording.en} ({props.recording.gen} {props.recording.sp})</p>
        <p>recorded by {props.recording.rec} at {props.recording.loc}</p>
        <button className="next" onClick={props.onFinish}>next bird</button>
    </div>;
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
