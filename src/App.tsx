import React from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import { Provider } from 'react-redux';
import { Header } from './components/Header/Header';
import { NewsList } from './components/NewsList/NewsList';
import { store } from './redux/store';
import { NewsDetails } from './components/NewsDetails/NewsDetails';

export const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <Header />
        <NewsDetails />
        <NewsList />
        <StatusBar style="auto" />
      </Container>
    </Provider>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding-top: 22px;
`;

export default App;
