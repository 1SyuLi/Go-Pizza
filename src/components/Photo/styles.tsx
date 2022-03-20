import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native'

export const Image = styled.Image`
    width: 160px;
    height: 160px;
    border-radius: 80px;

`;

export const Placeholder = styled.View`
    width: 160px;
    height: 160px;
    border-radius: 80px;
    justify-content: center;
    align-items: center;

    border: 1px dashed ${({ theme }) => theme.COLORS.SECONDARY_900};
`;

export const PlaceholderTitle = styled.Text`
    font-size: ${RFValue(14)}px;
    text-align: center;

    ${({ theme }) => css`
        font-family: ${theme.FONTS.TEXT};
        color: ${theme.COLORS.SECONDARY_900}
    `}
`;