import React, { useState, useEffect } from "react";
import LoaderText from "src/ui/LoaderText";
import delay from "src/helpers/promises/delay";
import { AddModule } from "./InitialLoaders";

interface IpfsLoader {
    addModule: AddModule;
}

export default function IpfsLoader({ addModule }: IpfsLoader) {
    const [progress, setProgress] = useState("");
    const [procentage, setProcentage] = useState(0);
    const [promiseState, setPromiseState] = useState<
        "pending" | "rejected" | "fulfilled"
    >("pending");
    const [failedAttempts, setFailedAttempt] = useState(0);

    useEffect(() => {
        const init = () => {
            setProcentage(5); // Fake it till you make it <3
            //@ts-ignore
            import("ipfs")
                .then(async ipfs => {
                    setProcentage(50);
                    const node = await ipfs.create();
                    setProgress("IPFS node created...");
                    setProcentage(80);
                    // const dir = await ipfs.files.ls("/");

                    const module = {
                        node,
                    };
                    await delay();

                    addModule({ moduleName: "ipfs", module });
                    setPromiseState("fulfilled");
                })
                .catch(async (e: ErrorEvent) => {
                    if (failedAttempts < 3) {
                        setFailedAttempt(failedAttempts + 1);
                        setProgress(
                            `Loading IPFS failed. ${failedAttempts < 3 &&
                                "Trying again"}`,
                        );
                        delay(2000);
                        init();
                    } else {
                        setProgress(`IPFS could not be loaded. ${e.message}`);
                        setPromiseState("rejected");
                    }
                });
        };
        init();
    }, [, failedAttempts, addModule, promiseState]);
    console.log(promiseState);

    return (
        <LoaderText
            name="IPFS"
            progress={progress}
            promiseState={promiseState}
            procentage={procentage}
        />
    );
}
