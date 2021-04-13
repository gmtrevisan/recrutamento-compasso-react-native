import styled from 'styled-components/native';

export const Buttons = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Button = styled.TouchableOpacity<{ selected?: boolean }>`
  flex: 1;
  text-align: center;
  backgroundColor: #480087;
  paddingTop: 20px;
  paddingBottom: 20px;
  borderColor: ${props => (props.selected ? '#FFB1A3' : '#663a8c' )};
  borderBottomWidth: 5px;
`;

export const Label = styled.Text<{ selected?: boolean }>`
  color: ${props => (props.selected ? '#FFB1A3' : '#FFF' )};
  text-align: center;
`;