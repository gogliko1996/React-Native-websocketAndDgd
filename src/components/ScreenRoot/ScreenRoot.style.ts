import styled from '@emotion/native';


import { ScreenContentProps, ScreenRootProps } from './ScreenRoot.props';
import { colors } from '../../ui-kit/theme/color';
import { themeSpacing } from '../../ui-kit/theme/spacer';



export const ScreenRoot = styled.SafeAreaView<ScreenRootProps>`
  flex: 1;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  background-color: ${({ backgroundColor = 'softPeach' }) => colors[backgroundColor]};
`;

export const ScreenContent = styled.View<ScreenContentProps>`
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: ${({ noPadding }) => (noPadding ? '0px' : `${themeSpacing(3)}px`)};
  padding-left: ${({ noPadding }) => (noPadding ? '0px' : `${themeSpacing(3)}px`)};
`;