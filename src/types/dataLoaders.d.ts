/* eslint-disable @typescript-eslint/no-use-before-define */

export = InitialLoaders;
export as namespace InitialLoaders;

declare namespace InitialLoaders {
    interface InitialLoadersProps {
        modules: {
            [moduleName: string]: object;
        };
        setModule: (modules: object) => void;
    }

    interface AddModuleRequirements {
        moduleName: string;
        module: object;
    }
    type AddModule = (el: AddModuleRequirements) => void;
}
