import React from 'react';
import { render, screen } from '@testing-library/react';
import SecurityPanel from '../../../components/panels/SecurityPanel';

describe('SecurityPanel', () => {

    it('should show the Security Panel text', () => {
        render(<SecurityPanel />);
        const actual = screen.getByText('Security').textContent;
        expect(actual).toEqual('Security');
    });

    it('should show security icon', () => {
        render(<SecurityPanel />);
        const actual = screen.getByRole('img');
        expect(actual).toBeDefined();
    });
});