/* eslint-disable @typescript-eslint/no-use-before-define */
import { ReactNode, Context } from "react";

export = App;
export as namespace App;

type VoidFunc<T> = (el: T) => void;

declare namespace App {
    interface ContentType {
        Component: ComponentType;
        date: number;
        routeData?: RouteData;
    }

    interface AppContext extends Context<any> {
        routeData: RouteData;
        changeRouteData: VoidFunc<RouteData>;
        changeContent: VoidFunc<ContentType | []>;
        addComponent: AddComponent;
        content: ContentType[];
    }
    interface RouteData {
        title: string;
        url: string;
        data: {
            hash: string;
            query: string;
        };
    }

    type ComponentType = ReactNode | Element;
    type AddComponent = (
        NewContent: ComponentType,
        routeData?: RouteData,
    ) => void;

    namespace Terminal {
        interface GoodiebagProps extends AppContext {
            setInputValue: VoidFunc<string>;
            setErrorMsg: VoidFunc<string | ReactNode>;
        }
    }

    namespace DataLoaders {
        namespace InitialLoaders {
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
    }
}
