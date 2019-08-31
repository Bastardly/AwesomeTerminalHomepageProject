export interface InitialLoadersProps {
    modules: {
        [moduleName: string]: object;
    };
    setModule: (modules: object) => void;
}

export type AddModuleRequirements = { moduleName: string; module: object };
