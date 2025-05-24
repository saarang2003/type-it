import { TypingResult } from "../types";
import { data } from "../(data)";

export async function typingStarted(){
    const res = await fetch(data.apiUrl + '/typing/started', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if(!res.ok){
        throw new Error('Failed to start typing session');
    }
    return res.json();
}

export async function CompletedTyping(){
    const tranformedResult  = {...result};

    delete tranformedResult.date;

    const res = await fetch(data.apiUrl + '/typing/completed', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept : 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(tranformedResult),
    })

    if(!res.ok){
        throw new Error('Failed to complete typing session');
    }

    return res.json();
}