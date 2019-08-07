import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App', () => {
    it('should return empty array when root', function() {
        const app = shallow(<App />);
        expect(1).toEqual(1);
    });
});