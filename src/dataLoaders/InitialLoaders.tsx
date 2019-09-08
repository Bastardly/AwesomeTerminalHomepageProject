import React, { useCallback } from "react";
import MockLoader from "./mockLoader";

export default function InitialLoaders({
    modules,
    setModule,
}: App.DataLoaders.InitialLoaders.InitialLoadersProps) {
    const addModule: App.DataLoaders.InitialLoaders.AddModule = useCallback(
        ({
            moduleName,
            module,
        }: App.DataLoaders.InitialLoaders.AddModuleRequirements) => {
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
