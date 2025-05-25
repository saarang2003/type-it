import { createContext } from "vm";
import { TypemodeTime, TypemodeType, TypemodeWords } from "../(data)/types";
import { QouteLengthType } from "../types";





type QuoteTagsType = { name: string; isSelected: boolean }[];
type QuoteTagsModeType = 'all' | 'only selected';


interface Context {
    mode : TypemodeType;
    time : TypemodeTime;
    words : TypemodeWords;
    qoute : QouteLengthType;
    punctuation : boolean;
    numbers : boolean;
    qouteTagsMode : QuoteTagsModeType ;
    qouteTags : QuoteTagsType;
    onMode : (mode : TypemodeType) => void;
    onTime : (time : TypemodeTime) => void;
    onWords : (words : TypemodeWords) => void;
    onQoute : (qoute : QouteLengthType) => void;
    onPunctuationToggle : ()    => void;
    onNumbersToggle : () => void;
    onToggleQouteTag : (index : number) => void;
    onUpdateQouteTagsMode : (mode : QuoteTagsModeType) => void;
    onClearSelectedQouteTags : () => void;
}



const initial : Context = {
    mode :'qoute',
    time : 30,
    words : 30 ,
    qoute : 'short',
    punctuation : true,
    numbers : false, 
    qouteTagsMode : 'all',
    qouteTags : [],
    onMode: () => {},
    onTime: () => {},
    onWords: () => {},
    onQoute: () => {},
    onPunctuationToggle: () => {},
    onNumbersToggle: () => {},
    onToggleQouteTag: () => {},
    onUpdateQouteTagsMode: () => {},
    onClearSelectedQouteTags: () => {},
};

export const TypeModeContext = createContext(initial);

interface Props{
    children : React.ReactNode;
}


export const TypeModecontextProvider = ({ children} : Props) =>{

    const [mode , setMode] = useLocalStorageState('typing-mode' , initial.mode);
}