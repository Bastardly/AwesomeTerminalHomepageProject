import React, { ReactNode, Fragment, useEffect, useRef, MutableRefObject } from "react";

interface ContentWrapperProps {
    children: ReactNode;
    header?: string;
}

export default function ContentWrapper({ children, header = "" }: ContentWrapperProps) {
    const ref = useRef(null) as MutableRefObject<any>;
    useEffect(() => {
        const targetTop = ref.current && ref.current.offsetTop;
        window.scrollTo(0, targetTop);
    }, []);

    return (
        <Fragment>
            <h1 ref={ref}>{header}</h1>
            <div>{children}</div>
        </Fragment>
    );
}
