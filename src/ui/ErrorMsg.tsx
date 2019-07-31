import React, { ReactNode } from 'react';

type ErrorMsgProps = {
    errorMsg?: string | ReactNode;
}

export default function ErrorMsg({errorMsg}: ErrorMsgProps) {
    if (!errorMsg) return null;
    
    return <div className="error">{errorMsg}</div>
}