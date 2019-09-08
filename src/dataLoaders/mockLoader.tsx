import React, { useState, useEffect } from "react";
import LoaderText from "src/ui/LoaderText";
import delay from "src/helpers/promises/delay";

interface IpfsLoader {
    addModule: App.DataLoaders.InitialLoaders.AddModule;
}

export default function MockLoader({ addModule }: IpfsLoader) {
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
            delay(500)
                .then(async () => {
                    setProcentage(50);
                    setProgress("Making coffee...");
                    setProcentage(80);
                    await delay();
                    const module = {
                        whatIs: "this is nothing",
                    };
                    addModule({ moduleName: "MockModule", module });
                    setPromiseState("fulfilled");
                })
                // This will never happen on mock, but I'll make the loaders more dry in the future
                .catch(async (e: ErrorEvent) => {
                    if (failedAttempts < 3) {
                        setFailedAttempt(failedAttempts + 1);
                        setProgress(
                            `Loading Mock failed. ${failedAttempts < 3 &&
                                "Trying again"}`,
                        );
                        delay(2000);
                        init();
                    } else {
                        setProgress(`Mock could not be loaded. ${e.message}`);
                        setPromiseState("rejected");
                    }
                });
        };
        init();
    }, [, failedAttempts, addModule, promiseState]);

    return (
        <LoaderText
            name="IPFS"
            progress={progress}
            promiseState={promiseState}
            procentage={procentage}
        />
    );
}
