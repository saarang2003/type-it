import { TypingResult } from "../types";
import { data } from "../(data)"; // Only valid if you're using the App Router

export async function typingStarted() {
    const res = await fetch(data.apiUrl + '/typing/started', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error('Failed to start typing session');
    }

    return res.json();
}

export async function completedTyping(result: TypingResult) {  // ✅ Accept result as parameter
    const transformedResult = { ...result };
    delete transformedResult.date;

    const res = await fetch(data.apiUrl + '/typing/completed', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(transformedResult),
    });

    if (!res.ok) {
        throw new Error('Failed to complete typing session');
    }

    return res.json();
}
