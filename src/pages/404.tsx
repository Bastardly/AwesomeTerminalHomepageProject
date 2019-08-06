
import React from 'react';
import ContentWrapper from '../terminal/ContentWrapper';

export default function notFound() {

    return (
        <ContentWrapper
            header="404 !"
        >
            <h2>This is the annoying 404 page</h2>
            <p>
                It means that I can't find the page you're looking for. And I've searched freaking everywhere! I mean, it's gone - Like Puff the Magic Dragon gone. Which is a fact that makes me kinda nostalgic, and a bit sad.<br />
                ...Even though the song was about smoking weed.
            </p>
            <p>
                Anyhow, my guess it that you've had one G&T too many, and that your fingers aren't working properly. It happens, I know!
            </p>
        </ContentWrapper>
    )
}
