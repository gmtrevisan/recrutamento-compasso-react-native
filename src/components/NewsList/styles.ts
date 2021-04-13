import styled from 'styled-components/native';

export const Item = styled.TouchableOpacity`
  backgroundColor: #FFF;
  paddingTop: 20px;
  paddingBottom: 20px;
  paddingLeft: 20px;
  paddingRight: 20px;
  borderBottomWidth: 1px;
  borderBottomColor: #CDCDCD;
`;

export const ItemLabel = styled.Text`
  color: #000;
  text-align: left;
`;

export const ErrorContainer = styled.View`
  flex: 1;
  text-align: center;
  justify-content: center;
  align-items: center;
  paddingLeft: 20px;
  paddingRight: 20px;
`;

export const Button = styled.TouchableOpacity`
  text-align: center;
  backgroundColor: #FFF;
  paddingTop: 10px;
  paddingBottom: 10px;
`;

export const ButtonLabel = styled.Text`
  color: #000;
  text-align: center;
  lineHeight: 20px;
`;

export const LoadingMore = styled.Text`
  color: #480087;
  text-align: center;
  marginTop: 20px;
  marginBottom: 20px;
  font-size: 14px;
`;