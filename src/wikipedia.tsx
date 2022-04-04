import React, { useEffect, useState } from 'react';

interface ThumbResponse {
    query: {
        pages: {
            [key: string]: {
                thumbnail?: {
                    source: string;
                }
            }
        }
    }
}

export const GetBirdThumb = async (name: string, width: number): Promise<string | undefined> => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(name.toLowerCase())}&prop=pageimages&format=json&pithumbsize=${width}&origin=*`;
    const response = await fetch(url);
    if (!response.ok) {
        console.error(response);
    }
    const tr: ThumbResponse = await response.json();
    return Object.values(tr.query.pages)[0].thumbnail?.source;
};

export interface BirdThumbProps {
    name: string;
    width: number;
}

export const BirdThumb = (props: BirdThumbProps) => {
    const [url, setUrl] = useState<string>();

    useEffect(() => {
        (async () => {
            setUrl(await GetBirdThumb(props.name, props.width));
        })();
    }, [props.name, props.width]);

    if (url) {
        return <img src={url} alt={props.name}/>;
    } else {
        return <></>;
    }
};
