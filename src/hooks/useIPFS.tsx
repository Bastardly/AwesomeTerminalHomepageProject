import { useEffect, useState } from "react";
// @ts-ignore;
import ipfs from "ipfs";

declare global {
    interface Window {
        ipfs: any;
    }
}

type SetReady = (val: boolean) => void;

async function createNode(setReady: SetReady) {
    const node = await ipfs.create();
    window.ipfs = node;
    setReady(true);
}

function useIPFS() {
    const [ipfsReady, setReady] = useState(false);
    useEffect(() => {
        if (!window.ipfs) {
            createNode(setReady);
        } else {
            setReady(true);
        }
    }, []);
    return ipfsReady;
}

export default useIPFS;
