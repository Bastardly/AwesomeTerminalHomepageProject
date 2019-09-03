import React, { useCallback } from "react";
import MockLoader from "./MockLoader";

export default function InitialLoaders({
    modules,
    setModule,
}: DataLoaders.InitialLoaders.InitialLoadersProps) {
    const addModule: DataLoaders.InitialLoaders.AddModule = useCallback(
        ({
            moduleName,
            module,
        }: DataLoaders.InitialLoaders.AddModuleRequirements) => {
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
