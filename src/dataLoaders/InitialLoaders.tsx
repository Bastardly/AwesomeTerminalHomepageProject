import React, { useCallback } from "react";

export interface InitialLoadersProps {
    modules: {
        [moduleName: string]: object;
    };
    setModule: (modules: object) => void;
}

export interface AddModuleRequirements {
    moduleName: string;
    module: object;
}
export type AddModule = (el: AddModuleRequirements) => void;

export default function InitialLoaders({
    modules,
    setModule,
}: InitialLoadersProps) {
    const addModule: AddModule = useCallback(
        ({ moduleName, module }: AddModuleRequirements) => {
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
            <p>Nothing to see here. Carry on...</p>
        </fieldset>
    );
}
