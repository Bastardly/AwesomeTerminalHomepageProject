import React, { useCallback } from "react";
import MockLoader from "./MockLoader";

export default function InitialLoaders({
    modules,
    setModule,
}: InitialLoaders.InitialLoadersProps) {
    const addModule: InitialLoaders.AddModule = useCallback(
        ({ moduleName, module }: InitialLoaders.AddModuleRequirements) => {
            setModule({
                ...modules,
                [moduleName]: module,
            });
        },
        [modules, setModule],
    );
    return (
        <fieldset>
            <legend>Loading Modules</legend>
            <MockLoader addModule={addModule} />
        </fieldset>
    );
}
