import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../../src/screens/Profile';


test('check if show correctly user input name placeholder', () => {
    const { getByPlaceholderText } = render(<Profile />);
    const inputName = getByPlaceholderText('Nome');
    expect(inputName.props.placeholder).toBeTruthy();
});

test('check if show correctly user input lastname placeholder', () => {
    const { getByPlaceholderText } = render(<Profile />);
    const inputLastname = getByPlaceholderText('Sobrenome');
    expect(inputLastname.props.placeholder).toBeTruthy();
});

test('check if exist save button', () => {
    const { getByText } = render(<Profile />);
    const saveButton = getByText('Salvar');
    expect(saveButton).toBeTruthy();
});