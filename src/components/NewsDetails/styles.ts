import styled from 'styled-components/native';


export const ModalContainer = styled.View`
  flex: 1;
  text-align: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  backgroundColor: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 2;
  marginTop: 22px;
  paddingTop: 20px;
  paddingBottom: 20px;
  paddingLeft: 20px;
  paddingRight: 20px;
`;

export const Modal = styled.View`
  backgroundColor: #fff;
  paddingTop: 20px;
  paddingBottom: 20px;
  paddingLeft: 20px;
  paddingRight: 20px;
  border-radius: 5px;
`;

export const ModalRow = styled.View`
  marginBottom: 10px;
`;

export const ModalText = styled.Text`
  color: #000;
  text-align: left;
  fontSize: 14px;
`;

export const MainText = styled(ModalText)`
  fontSize: 18px;
  fontWeight: bold;
`;

export const Buttons = styled.View`
  display: flex;
  flex-direction: row;
  marginTop: 10px;
`;

export const Button = styled.TouchableOpacity`
  flex: 1;
  text-align: center;
  backgroundColor: #480087;
  paddingTop: 10px;
  paddingBottom: 10px;
  border-radius: 5px;
`;

export const ButtonOpen = styled(Button)`
  marginLeft: 10px;
`;

export const ButtonClose = styled(Button)`
  marginRight: 10px;
`;

export const Label = styled.Text`
  color: #FFF;
  text-align: center;
`;



