import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../../src/screens/Profile';


test('check if show correctly user input name placeholder', () => {
    const { getByPlaceholderText } = render(<Profile />);
    const input = getByPlaceholderText('Nome');
    expect(input).toBeTruthy();
})