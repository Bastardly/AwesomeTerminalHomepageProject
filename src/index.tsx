import React from 'react';
import ReactDom from 'react-dom';

const App = () => <div>Hello World! React is cool, and Dan Abramov has got a horrible taste in music. But he's still pretty cool. Like React</div>

ReactDom.render(<App />, document.getElementById('app'))
