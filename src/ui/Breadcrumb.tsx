import React from 'react';
import Link from './Link';

export default function BreadCrumb() {
    
    return <span className="breadCrumb">site:/<Link name="home" path="/" />/<Link name="blog" path="/blog" /></span>
}