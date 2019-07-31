
import React, { Fragment } from 'react';
import mockText from '../mockText'

const yolo = '<YOLO />'

export default function LandingPage() {
    return (
        <Fragment>
            <h1>Yo Bro! {yolo}</h1>
            <div>{mockText}</div>

        </Fragment>
    )
}
