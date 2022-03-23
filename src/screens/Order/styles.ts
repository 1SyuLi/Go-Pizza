import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.KeyboardAvoidingView`
   flex: 1;
`;

export const Header = styled(LinearGradient).attrs(
    (({ theme }) => ({
        colors: theme.COLORS.GRADIENT,
    }))
)`
    /* width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between; */

    padding: ${getStatusBarHeight() + 33}px 20px 24px;
`;