"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useEventListener = (eventName, handler, element = window) => {
    react_1.useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported)
            throw Error('Element does not support eventlistener');
        element.addEventListener(eventName, handler);
        return () => {
            element.removeEventListener(eventName, handler);
        };
    }, [eventName, element]);
};
exports.default = useEventListener;
