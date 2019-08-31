import React, { Fragment, useCallback } from "react";
import IpfsLoader from "./IpfsLoader";

export interface InitialLoadersProps {
    modules: {
        [moduleName: string]: object;
    };
    setModule: (modules: object) => void;
}

export type AddModuleRequirements = { moduleName: string; module: object };
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
        <Fragment>
            <IpfsLoader addModule={addModule} />I will start Each and every
            loader lazily
        </Fragment>
    );
}
