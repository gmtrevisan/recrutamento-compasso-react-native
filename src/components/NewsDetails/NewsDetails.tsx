import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Label, ModalContainer, Modal, ModalRow, ModalText, Buttons, ButtonOpen, ButtonClose, MainText } from './styles';
import * as modalActions from './../../redux/modal/actions';
import { Linking } from 'react-native';

export const NewsDetails = () => {
  const dispatch = useDispatch();
  const selector = useSelector(({ modalReducer }) => modalReducer);
  const { open, news } = selector;
  const { abstract, web_url, headline: { main } } = news;

  const handleClose = () => {
    dispatch(modalActions.setModalOpenAction(false));
  }

  const handleOpen = () => {
    Linking.openURL(web_url);
  }

  if (!open) {
    return null;
  }

  return (
    <ModalContainer testID="ModalContainer">
      <Modal>
        <ModalRow>
          <MainText>{main}</MainText>
        </ModalRow>
        <ModalRow>
          <ModalText>{abstract}</ModalText>
        </ModalRow>
        <ModalRow>
          <ModalText>{web_url}</ModalText>
        </ModalRow>
        <Buttons>
          <ButtonClose onPress={handleClose}>
            <Label>Fechar</Label>
          </ButtonClose>
          <ButtonOpen onPress={handleOpen}>
            <Label>Ver notícia</Label>
          </ButtonOpen>
        </Buttons>
      </Modal>
    </ModalContainer>
  );
};