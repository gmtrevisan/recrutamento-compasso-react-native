import React, { useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { apiPageLimit } from '../../constants';
import { News } from '../../redux/news/types';
import { Button, ErrorContainer, Item, ButtonLabel, ItemLabel, LoadingMore } from './styles';
import { ListItem } from './types';
import * as newsActions from './../../redux/news/actions';
import * as modalActions from './../../redux/modal/actions';

export const sanitizeData = (news: Array<News>) => {
  return news.map(({ _id, headline: { main } }) => ({ _id, headline: { main } }));
}

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
    const { headline: { main } } = item;
    return (
      <Item onPress={() => handleDetails(item)}>
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
    />
  )

  return error ? renderError() : renderList();
};