
export interface Recording {
    id: string;
    gen: string;
    sp: string;
    ssp: string;
    en: string;
    rec: string;
    cnt: string;
    loc: string;
    lat: string;
    lng: string;
    alt: string;
    type: string;
    url: string;
    file: string;
    sono: {
        small?: string;
        medium?: string;
        large?: string;
        full?: string;
    };
    lic: string;
    q: string;
    length: string;
    time: string;
    date: string;
    uploaded: string;
    also: string[];
    rmk: string;
    'bird-seen': string;
    'playback-used': string;
}

interface RecordingResponse {
    numRecordings: string;
    numSpecies: string;
    page: number;
    numPages: number;
    recordings: Recording[];
}

const recordingUrl = (query: string, page?: number) =>
    `https://xeno-canto.org/api/2/recordings?query=${query}&page=${page ?? 1}`;

export async function* getRecordings(query: string, filter?: (rs: Recording[]) => Recording[]): AsyncIterable<Recording[]> {
    let recordings: Recording[] = [];
    let numPages = Infinity;

    for (let page = 1; page <= numPages; ++page) {
        const response = await fetch(recordingUrl(query, page));
        if (!response.ok) {
            console.error(response);
        }
        const rr: RecordingResponse = await response.json();
        numPages = rr.numPages;
        recordings = recordings.concat((filter)? filter(rr.recordings) : rr.recordings);
        yield recordings;
    }
};

export const birdFilter = (recordings: Recording[]) =>
    recordings
        .filter(r => r.also.length === 1 && r.also[0] === '') // filter multi bird recordings
        .filter(r => r.en !== 'Identity unknown'); // filter unknown birds
