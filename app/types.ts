export type TypingResult = {
    timeline : {
        wpm : number ;
        accuracy : number;
        raw : number ;
        second : number;
    }[],
    error : number;
    testType : string | null;
    qouteAuthor : string;
    date? : Date;
};

export type QouteLengthType = 'short' | 'medium' | 'long' |'all';
