import React from "react";
import cd from "./cd";
import clear from "./clear";
import { GoodiebagProps } from "..";
import ContentWrapper from "../ContentWrapper";

interface Method {
    method: (elements: string[], goodiebag: GoodiebagProps) => void;
    header: string;
    description: string;
}

interface Methods {
    [key: string]: Method;
}

export function getElements(query: string): string[] {
    return query.trim().split(" ");
}

export const methods: Methods = {
    cd: {
        method: cd,
        header: "cd",
        description:
            "Change directory, by writing 'cd blog' to access the blog from root.  ",
    },
    clear: {
        method: clear,
        header: "clear",
        description: "Clears the directory, and brings the console to the top.",
    },
};

function AddCommandToTerminal(
    commandName: string,
    query: string,
    commandFound: boolean,
) {
    if (commandFound) {
        // The content will draw focus, therefore we don't need the content wrapper for a valid query.
        return <p>>: {query}</p>;
    }
    return (
        <ContentWrapper>
            >: The command '{commandName}' was not found
        </ContentWrapper>
    );
}

export default function runCommand(query: string, goodiebag: GoodiebagProps) {
    if (!query || !query.length) return;
    const elements = getElements(query);
    const commandName = elements[0]; // e.g. cd, clear or ls
    const command = methods[commandName];
    goodiebag.addContent(() =>
        AddCommandToTerminal(commandName, query, !!command), ''
    );
    return command && command.method(elements, goodiebag);
}
