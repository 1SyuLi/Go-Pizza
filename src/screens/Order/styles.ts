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

export const Form = styled.View`
    width: 100%;
    margin-top: ${RFValue(-140)}px;
    padding: 24px;
`;

export const Title = styled.Text`
    font-size: 32px;
    margin-bottom: 32px;
    text-align: center;

    font-family: ${({ theme }) => theme.FONTS.TITLE};
    color: ${({ theme }) => theme.COLORS.SECONDARY_900};
`;

export const Label = styled.Text`
    font-size: 14px;
    margin-bottom: 16px;

    font-family: ${({ theme }) => theme.FONTS.TEXT};
    color: ${({ theme }) => theme.COLORS.SECONDARY_900};
`;

export const FormRow = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`;

export const InputGroup = styled.View`
    width: 48%;
`;

export const Price = styled.Text`
    font-size: 14px;
    margin: 24px 0px;
    align-self: flex-end;

    font-family: ${({ theme }) => theme.FONTS.TEXT};
    color: ${({ theme }) => theme.COLORS.SECONDARY_900};
`;


export const ContentScroll = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
})`
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

