import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.KeyboardAvoidingView`
   flex: 1;
`;

export const Header = styled(LinearGradient).attrs(
    (({ theme }) => ({
        colors: theme.COLORS.GRADIENT,
    }))
)`
    padding: ${getStatusBarHeight() + 33}px 20px 24px;
`;

export const Photo = styled.Image`
    width: ${RFValue(240)}px;
    height: ${RFValue(240)}px;
    border-radius: ${RFValue(120)}px;
    align-self: center;
    position: relative;
    top: -120px;
`;

export const Sizes = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 40px;
`;