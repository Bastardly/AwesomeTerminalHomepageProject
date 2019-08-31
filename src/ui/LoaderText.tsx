import React, { useState, useEffect } from "react";
import SuccessErrorIcon from "./SuccessErrorIcon";

interface LoaderProps {
    name: string;
    progress: string;
    promiseState: "pending" | "rejected" | "fulfilled";
    procentage?: number;
}

export default function LoaderText({
    name,
    progress,
    promiseState,
    procentage,
}: LoaderProps) {
    const [statusUpdates, updateProgress] = useState("Loading");
    useEffect(() => {
        if (promiseState !== "fulfilled") {
            updateProgress(progress);
        } else updateProgress("");
    }, [progress, promiseState]);

    return (
        <p>
            {`${name}: `}
            <SuccessErrorIcon
                promiseState={promiseState}
                procentage={procentage}
            />{" "}
            {statusUpdates}
        </p>
    );
}
