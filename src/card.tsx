import React from 'react';
import { Recording } from './xenocanto';

export interface CardProps {
    recording: Recording;
}

const QuestionCard = (props: CardProps) => {
    return <div>
        <audio controls src={props.recording.file}>stop using netscape navigator lol</audio>
    </div>;
}

export const Card = (props: CardProps) => {
    return <QuestionCard {...props}/>
}
