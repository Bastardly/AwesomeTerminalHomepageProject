import React, { Fragment } from "react";
import { ContentType } from "./hooks/useHandleContent";

type ContentMapperProps = {
    content: ContentType[];
};

export default function ContentMapper({ content }: ContentMapperProps) {
    return (
        <Fragment>
            {content.map(({ date, Component }) => {
                return <div key={date}>{Component}</div>;
            })}
        </Fragment>
    );
}
