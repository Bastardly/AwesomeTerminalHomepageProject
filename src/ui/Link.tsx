import React, { useContext, useCallback } from 'react';
import { getRouteData } from '../router';
import { routeContext } from '../App';

interface LinkProps {
    name: string,
    path: string,
    hash?: string,
    query?: string,
    disabled?: boolean,
}

export default function Link({name, path, hash, query, disabled}: LinkProps) {
    const { changeRouteData } = useContext(routeContext)
    const handleClick = useCallback(() => changeRouteData(getRouteData(path, hash, query)), [path, hash, query])

    return <button onClick={handleClick} disabled={disabled}>{name}</button>
}