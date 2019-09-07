# Welcome the my awesome terminal-based homepage project!


## Why make a website that work like a terminal?

Because it's fun!

This actually startet out as just another Apple-ish website. I've even implemented SCSS, which is completely overkill for a terminal. But then the idea struck me, and I could not let it go.

I know, of the regular population, somewhere between 99.5% and 99.99% will never understand this website. But honestly I don't care. But this type of site isn't for them. It's more a curious approach of what I can do with a webbased terminal - Think of it as a toy.

## Does it work?

I've made some basic functionality. But no content yet. Heck, I haven't even made a Dockerfile.

The great list of functionality so far:

`cd`: e.g. cd blog, cd ..

`clear`: Bet you can guess what that does.

## Tecnologies

#### React:

I love React, so why not? - Don't answer that...

#### TypeScript:
I love TypeScript. Though currently, it's still a bit loosely implemented. I really need to get those definition files made.

#### IPFS:
InterPlanetaryFileSystem - What's not to love! IPFS is an Internet protocol that aims to replace HTTP. HTTP downloads files from one computer at a time instead of fethcing from multiply nodes simultaneously.
I really love the philosofy behind IPFS, which is why I've desided to play with it.
Currently, it's wrongly implemented, and I'm working on a side project for IPFS that I will integrate with this using Docker. I still have no idea what I will use it for, but I'll figure it out. And it's going to be awesome!

Read more: https://ipfs.io/#why

## Licence

The MIT License (MIT)

Copyright (c)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Source: https://opensource.org/licenses/MIT


## Latest updates

I desided to remove sass for several reasons:
1) It's a terminal - it's not really needed.
2) The webpack sass-loader has some heavy dependencies like node-sass, which rely on external binaries - And that will cause some problems, if you try to build the Dockerfile on a Raspberry Pi for instance. It really wasn't worth the hassel, and the solution I found really was a hack. Also the error track-record went way back, so the best decicion was to kill it off. 
