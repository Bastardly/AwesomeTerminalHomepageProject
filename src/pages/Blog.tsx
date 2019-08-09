import React from "react";
import ContentWrapper from "../terminal/ContentWrapper";
import Link from "src/ui/Link";
export default function Blog() {
    return (
        <ContentWrapper header="Blog">
            <div>
                <div>
                    <Link name="LatestBlogPosts" path="/" /> /
                </div>
                <div>
                    <Link name="TopBlogPosts" path="/" /> /
                </div>
                <div>
                    <Link name="Something else" path="/" /> /
                </div>
            </div>
        </ContentWrapper>
    );
}
