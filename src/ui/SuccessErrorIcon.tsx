import React, { Fragment } from "react";

interface SuccessErrorIconProps {
    promiseState: "pending" | "rejected" | "fulfilled";
    procentage?: number;
}

export default function SuccessErrorIcon({
    promiseState,
    procentage,
}: SuccessErrorIconProps) {
    let icon = <Fragment />;
    let className = "";
    const isSuccess = promiseState === "fulfilled";
    const isError = promiseState === "rejected";
    if (isSuccess) {
        icon = <Fragment>&#10004;</Fragment>;
        className = "success";
        procentage = 100;
    }
    if (isError) {
        icon = <Fragment>&#10006;</Fragment>;
        className = "error";
        procentage = 0;
    }
    const procentageText = procentage ? ` ${procentage}% ` : "";
    return (
        <span className={className}>
            {procentageText} {icon}
        </span>
    );
}
