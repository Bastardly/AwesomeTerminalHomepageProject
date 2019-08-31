export default function delay(ms?: number) {
    const delayMilliSeconds = ms || 1000;
    return new Promise(resolve => setTimeout(resolve, delayMilliSeconds));
}
