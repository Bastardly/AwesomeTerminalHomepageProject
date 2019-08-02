import React from 'react';
import {shallow} from 'enzyme';
import Terminal from '../terminal';

describe('Terminal', function() {
  describe('UI', function() {
      it('should render app with one input', function() {
        const wrapper = shallow(<Terminal />)
        const terminal = wrapper.find('input');
        expect(terminal && terminal.length).toBe(1)
      })
  });
});