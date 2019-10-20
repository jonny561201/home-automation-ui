import React from 'react';
import { shallow } from 'enzyme';
import SecurityPanel from '../../../components/panels/SecurityPanel';

describe('SecurityPanel', () => {

    let securityPanel;

    beforeEach(() => {
        securityPanel = shallow(<SecurityPanel />);
    });

    it('should show the Security Panel', () => {
        const actual = securityPanel.find('.security-panel');
        expect(actual).toHaveLength(1);
    });

    it('should show security icon', () => {
        const actual = securityPanel.find('.security-panel img').prop('alt');
        expect(actual).toEqual('security');
    });
});