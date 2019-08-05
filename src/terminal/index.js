"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const App_1 = require("../App");
const Breadcrumb_1 = __importDefault(require("../ui/BreadCrumb/Breadcrumb"));
const ErrorMsg_1 = __importDefault(require("../ui/ErrorMsg"));
const useEventListener_1 = __importDefault(require("../hooks/useEventListener"));
const commands_1 = __importDefault(require("./commands"));
const TerminalId = 'TheInputTerminal';
const consoleHistory = [];
function getFocus() {
    const activeElement = document.activeElement;
    const TheInputTerminal = document.getElementById(TerminalId);
    if (activeElement === TheInputTerminal)
        return;
    TheInputTerminal && TheInputTerminal.focus();
}
exports.getFocus = getFocus;
function Terminal() {
    const ref = react_1.useRef(null);
    const [inputValue, setInputValue] = react_1.useState('');
    const [errorMsg, setErrorMsg] = react_1.useState();
    const [historyIndex, changeHistoryIndex] = react_1.useState(0);
    const { routeData, changeRouteData, content, changeContent } = react_1.useContext(App_1.appContext);
    useEventListener_1.default('keypress', getFocus, window);
    const handleInput = react_1.useCallback(() => {
        if (errorMsg) {
            setErrorMsg(undefined);
        }
        // @ts-ignore No, at this point it can never be null. TS you're drunk
        const value = ref.current && ref.current.value || '';
        setInputValue(value);
    }, [inputValue]);
    const updateTerminal = (newInput) => {
        const terminal = document.getElementById(TerminalId);
        terminal.value = newInput;
        setInputValue(newInput);
    };
    const handleKeyUp = (e) => {
        // We only use this to navigate the console history
        const isArrorDown = e.key === 'ArrowDown';
        const isArrorUp = e.key === 'ArrowUp';
        if (isArrorDown || isArrorUp) {
            const historyLenght = consoleHistory.length;
            if (!!historyLenght) {
                const newInput = consoleHistory[historyIndex] || '';
                updateTerminal(newInput);
                let newIndex = historyIndex;
                if (isArrorUp && historyIndex < historyLenght) {
                    changeHistoryIndex(newIndex + 1);
                }
                else if (isArrorDown && historyIndex > -1) {
                    changeHistoryIndex(newIndex - 1);
                }
            }
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        changeHistoryIndex(0); // So it starts at the beginning when using arrow up and down
        consoleHistory.unshift(inputValue);
        const goodieBag = {
            routeData,
            changeRouteData,
            setInputValue,
            setErrorMsg,
            content,
            changeContent,
        };
        commands_1.default(inputValue, goodieBag);
        updateTerminal('');
    };
    return react_1.default.createElement("div", { className: "terminal" },
        react_1.default.createElement(Breadcrumb_1.default, { routeData: routeData }),
        react_1.default.createElement("form", { onSubmit: handleSubmit },
            '$ ',
            " ",
            react_1.default.createElement("input", { ref: ref, id: TerminalId, type: "text", onKeyUp: handleKeyUp, onKeyPress: handleInput, autoFocus: true, autoComplete: "off" })),
        react_1.default.createElement(ErrorMsg_1.default, { errorMsg: errorMsg }));
}
exports.default = Terminal;
