import React, { useContext, FormEvent, useCallback, useState, useRef, ReactNode } from 'react';
import { routeContext } from '../App';
import BreadCrumb from '../ui/Breadcrumb';
import ErrorMsg from '../ui/ErrorMsg';
import useEventListener from '../hooks/useEventListener';
import getCommandMethod from './getCommandMethod';

type StrFunc = (path: string) => void;

const TerminalId = 'TheInputTerminal'
const consoleHistory: string[] = [];

export type GoodiebagProps = {
    routeData: string,
    changeRouteData: StrFunc,
    setInputValue: StrFunc,
    setErrorMsg: (msg?: string | ReactNode) => void;
}

export function getElements(query: string): string[] {
    return query.trim().split(' ');
}

export function runQuery(query: string, goodieBag: GoodiebagProps) {
    if (!query || !query.length) return;
    const elements = getElements(query);
    const command = elements[0];
    const commandMethod = getCommandMethod(command); // e.g. cd or ls
    if (commandMethod) {
        commandMethod(elements, goodieBag)
    } else {
        const errorMsg = `${command}: The command '${command}' does not exist. Type 'help' for assistance`;
        goodieBag.setErrorMsg(errorMsg);
    }
}

export function getFocus () {
    const activeElement = document.activeElement;
    const TheInputTerminal = document.getElementById(TerminalId) as HTMLElement;
    if (activeElement === TheInputTerminal) return;
    TheInputTerminal && TheInputTerminal.focus();
}

export default function Terminal() {
    const ref = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const [errorMsg, setErrorMsg] = useState();
    const [historyIndex, changeHistoryIndex] = useState(0);
    const { routeData, changeRouteData } = useContext(routeContext)

    useEventListener('keypress', getFocus, window)

    const handleInput = useCallback(() => {
        // @ts-ignore - We got this covered I think!
        if (errorMsg) {
            setErrorMsg(undefined);
        }
        // @ts-ignore
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
        }
        runQuery(inputValue, goodieBag)
        updateTerminal('');
    }

    return <div className="terminal">
        <BreadCrumb />
        <form onSubmit={handleSubmit}>
            {'> '} <input ref={ref} id={TerminalId} type="text" onKeyUp={handleKeyUp} onKeyPress={handleInput} autoFocus autoComplete="off"/>
        </form>
        <ErrorMsg errorMsg={errorMsg} />
    </div>
}