import { useEffect, useState, ReactNode } from "react";
// @ts-ignore;
import ipfs from "ipfs";
import { AddContent } from "./useHandleContent";

declare global {
    interface Window {
        ipfs: any;
    }
}

type SetReady = (val: boolean) => void;

async function createNode(setReady: SetReady, addContent: AddContent) {
    const node = await ipfs.create();
    window.ipfs = node;
    addContent("IPFS loaded!");
    setReady(true);
}

function useIPFS(addContent: AddContent) {
    const [ipfsReady, setReady] = useState(false);
    useEffect(() => {
        if (!window.ipfs) {
            addContent("Loading IPFS...");
            createNode(setReady, addContent);
        } else {
            addContent("IPFS loaded!");
            setReady(true);
        }
    }, []);
    return ipfsReady;
}

export default useIPFS;
