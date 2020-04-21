import Feed from '../../Models/Feed';
import AsyncStorage from '@react-native-community/async-storage';
import * as actionTypes from './actionTypes';

export const addFeedNow = allFeeds => ({
  type: actionTypes.ADD_FEED,
  payload: {
    allFeeds: allFeeds,
  },
});

export const addFeed = feed => {
  return async dispatch => {
    try {
      let allPosts = await AsyncStorage.getItem(actionTypes.ALL_POSTS);
      if (!allPosts) {
        allPosts = [];
        allPosts.push(feed);
      } else {
        allPosts = JSON.parse(allPosts);
        allPosts.push(feed);
      }
      await AsyncStorage.setItem(
        actionTypes.ALL_POSTS,
        JSON.stringify(allPosts),
      );
      dispatch(addFeedNow(allPosts.reverse()));
    } catch {
      console.log('err');
    }
  };
};

export const getFeedNow = (allFeeds: Feed[]) => ({
  type: actionTypes.GET_FEED,
  payload: {allFeeds: allFeeds},
});

export const getFeed = () => {
  return async dispatch => {
    try {
      let allFeeds = await AsyncStorage.getItem(actionTypes.ALL_POSTS);
      allFeeds = JSON.parse(allFeeds);
      allFeeds
        ? dispatch(getFeedNow(allFeeds.reverse()))
        : dispatch(getFeedNow([]));
    } catch (e) {
      console.log(e);
    }
  };
};
