
import React, { Fragment } from 'react';
import mockText from '../mockText'
import ContentWrapper from 'src/terminal/ContentWrapper';

const yolo = '<YOLO />'

export default function LandingPage() {
    return (
        <ContentWrapper
            header=""
        >
            <div>{mockText}</div>
        </ContentWrapper>
    )
}
