import { QouteLengthType } from "../types";


export const data = {
    apiUrl:  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001',


    theme : ['default ' , 'cyberpunk' , 'neon' , 'retro'],

    typemode :{
        time : [30 , 60 , 120],
        words : [20 , 30 ,50, 100],
        qoute : ['all' , 'short' , 'medium' , 'long'] as QouteLengthType[],
    },

    caret : ['line', 'underline' , 'block' , 'off'],

    punctuation : {
        marks : ['.', ',', '?', '!', ';', ':', '-', '"', '()'],
        words : [
            "aren't",
      "can't",
      "couldn't",
      "doesn't",
      "don't",
      "hadn't",
      "he'd",
      "he's",
      "I'd",
      "I'll",
      "I'm",
      "isn't",
      "it's",
      "I've",
      "she'd",
      "she's",
      "that's",
      "there's",
      "they'd",
      "they're",
      "they've",
      "wasn't",
      "we'd",
      "we'll",
      "we're",
      "weren't",
      "we've",
      "what's",
      "where's",
      "who'd",
      "who's",
      "won't",
      "wouldn't",
      "you'd",
      "you'll",
      "you're",
      "you've",
        ],
    },
} as const;