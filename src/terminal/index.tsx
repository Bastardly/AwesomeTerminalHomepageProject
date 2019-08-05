import React, { useContext, FormEvent, useCallback, useState, useRef, ReactNode } from 'react';
import { routeContext } from '../App';
import BreadCrumb from '../ui/BreadCrumb/Breadcrumb';
import ErrorMsg from '../ui/ErrorMsg';
import useEventListener from '../hooks/useEventListener';
import runCommand from './commands';
import { RouteData } from '../router';

type StrFunc = (path: string) => void;

const TerminalId = 'TheInputTerminal'
const consoleHistory: string[] = [];

type TerminalProps = {
    changeHideRoute:(val: boolean) => void,
    hideRoute: boolean,
}

export type GoodiebagProps = {
    routeData: RouteData,
    changeRouteData: (val: RouteData) => void,
    setInputValue: StrFunc,
    setErrorMsg: (msg?: string | ReactNode) => void;
} & TerminalProps

export function runQuery(query: string, goodieBag: GoodiebagProps) {
    if (!query || !query.length) return;

    if (goodieBag.hideRoute) {
        goodieBag.changeHideRoute(false)
    }
    runCommand(query, goodieBag);
}

export function getFocus () {
    const activeElement = document.activeElement;
    const TheInputTerminal = document.getElementById(TerminalId) as HTMLElement;
    if (activeElement === TheInputTerminal) return;
    TheInputTerminal && TheInputTerminal.focus();
}

export default function Terminal({changeHideRoute, hideRoute}: TerminalProps) {
    const ref = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const [errorMsg, setErrorMsg] = useState();
    const [historyIndex, changeHistoryIndex] = useState(0);
    const { routeData, changeRouteData } = useContext(routeContext)

    useEventListener('keypress', getFocus, window)

    const handleInput = useCallback(() => {
        if (errorMsg) {
            setErrorMsg(undefined);
        }
        // @ts-ignore No, at this point it can never be null. TS you're drunk
        const value: string = ref.current && ref.current.value || '';
        setInputValue(value);        
    }, [inputValue])

    const updateTerminal = (newInput: string) => {
        const terminal = document.getElementById(TerminalId) as HTMLInputElement
        terminal.value = newInput;
        setInputValue(newInput)
    }

    const handleKeyUp = (e: KeyboardEvent | any) => {
        // We only use this to navigate the console history
        const isArrorDown = e.key === 'ArrowDown';
        const isArrorUp = e.key === 'ArrowUp';
        if (isArrorDown || isArrorUp) {
            const historyLenght = consoleHistory.length;
            if (!!historyLenght) {
                const newInput = consoleHistory[historyIndex] || '';
                updateTerminal(newInput);
                let newIndex: number = historyIndex;
                if (isArrorUp && historyIndex < historyLenght) {
                    changeHistoryIndex(newIndex + 1);
                } else if (isArrorDown && historyIndex > -1) {
                    changeHistoryIndex(newIndex - 1);
                }            
            }
        }
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        changeHistoryIndex(0); // So it starts at the beginning when using arrow up and down
        consoleHistory.unshift(inputValue)
        const goodieBag = {
            routeData,
            changeRouteData,
            setInputValue,
            setErrorMsg,
            changeHideRoute,
            hideRoute
        }
        runQuery(inputValue, goodieBag)
        updateTerminal('');
    }

    return <div className="terminal">
        <BreadCrumb routeData={routeData} />
        <form onSubmit={handleSubmit}>
            {'> '} <input ref={ref} id={TerminalId} type="text" onKeyUp={handleKeyUp} onKeyPress={handleInput} autoFocus autoComplete="off"/>
        </form>
        <ErrorMsg errorMsg={errorMsg} />
    </div>
}