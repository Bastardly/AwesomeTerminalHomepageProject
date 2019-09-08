import React, { Fragment } from "react";

type ContentMapperProps = {
    content: App.ContentType[];
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
