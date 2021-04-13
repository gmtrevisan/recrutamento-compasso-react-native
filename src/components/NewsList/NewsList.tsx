import React, { useEffect } from 'react';
import { FlatList, RefreshControl, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { apiPageLimit } from '../../constants';
import { News, NewsMultimedia } from '../../redux/news/types';
import { Button, ErrorContainer, Item, ButtonLabel, ItemLabel, LoadingMore, ImageContainer } from './styles';
import { ListItem } from './types';
import * as newsActions from './../../redux/news/actions';
import * as modalActions from './../../redux/modal/actions';

export const NewsList = () => {
  const dispatch = useDispatch();
  const selector = useSelector(({ newsReducer }) => newsReducer);
  const { loading, error, news, page } = selector;

  useEffect(() => {
    dispatch(newsActions.fetchNewsAction());
  }, [dispatch]);

  const handleLoadMore = () => {
    if (!loading && page < apiPageLimit) {
      dispatch(newsActions.setNewsPageAction(page + 1));
    }
  }

  const handleDetails = (news:News) => {
    dispatch(modalActions.setModalNewsAction(news));
    dispatch(modalActions.setModalOpenAction(true));
  }

  const handleRefresh = () => {
    dispatch(newsActions.resetNewsAction());
  }

  const renderFooter = () => loading ? <LoadingMore>Carregando...</LoadingMore> : null;

  const renderRefresh = () => <RefreshControl colors={['#480087']} refreshing={false} onRefresh={handleRefresh} />;

  const renderError = () => (
    <ErrorContainer>
      <Button onPress={() => handleRefresh()}>
        <ButtonLabel>Erro ao carregar, espere alguns segundos e tente novamente.</ButtonLabel>
      </Button>
    </ErrorContainer>
  )

  const renderItem = ({ item }:ListItem) => {
    const { headline: { main }, multimedia } = item;
    const thumbnail = multimedia.find((media:NewsMultimedia) => media.subtype === 'thumbnail');
    return (
      <Item onPress={() => handleDetails(item)}>
        {!!thumbnail && (<ImageContainer><Image style={{ width: 75, height: 75 }} source={{ uri: `https://www.nytimes.com/${thumbnail.url}` }} /></ImageContainer>)}
        <ItemLabel>{main}</ItemLabel>
      </Item>
    );
  }

  const renderList = () => (
    <FlatList
      data={news}
      keyExtractor={(item: News) => item._id}
      renderItem={renderItem}
      refreshControl={renderRefresh()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
      testID="FlatList"
    />
  )

  return error ? renderError() : renderList();
};