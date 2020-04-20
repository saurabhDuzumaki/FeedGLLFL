import * as React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {Searchbar, FAB, ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import FeedItem from '../Components/FeedItem';
import Loader from '../Components/Loader';

const ALL_POSTS = 'ALL_POSTS';
let originalPosts;

const FeedScreen = ({navigation}) => {
  // AsyncStorage.clear();
  const [searchQuery, setSearchQuery] = React.useState('');

  const [feeds, setFeeds] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // setIsLoaded(false);
      let allFeeds = await AsyncStorage.getItem(ALL_POSTS);
      if (allFeeds && allFeeds.length > 0) {
        originalPosts = JSON.parse(allFeeds).reverse();
        allFeeds ? setFeeds(originalPosts) : [];
      }
      // console.log(allFeeds);
      setIsLoaded(true);
    });

    return unsubscribe;
  }, [navigation]);

  const _onChangeSearch = text => {
    setSearchQuery(text);
    if (text.trim().length > 0) {
      let filteredPosts = originalPosts.filter(item => {
        // console.log(item);
        if (
          item.text &&
          item.text.toUpperCase().includes(text.trim().toUpperCase())
        ) {
          return item;
        }
      });
      setFeeds(filteredPosts);
    } else {
      setFeeds(originalPosts);
    }
  };

  const searchBar = () => (
    <Searchbar
      style={{margin: 12}}
      collapsable={true}
      placeholder="Search"
      onChangeText={_onChangeSearch}
      value={searchQuery}
    />
  );

  return (
    <>
      {searchBar()}
      {isLoaded ? (
        feeds.length > 0 ? (
          <FlatList
            data={feeds}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => (
              <FeedItem feed={item} style={styles.feedItem} />
            )}
          />
        ) : (
          <View style={[styles.noText, {marginHorizontal: 20}]}>
            <Text>No feeds to show. Add one now!</Text>
          </View>
        )
      ) : (
        <Loader />
      )}
      <FAB
        style={styles.fab}
        label="Add Post"
        icon="plus"
        onPress={() => navigation.navigate('AddPost')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  feedItem: {
    marginBottom: 12,
    marginHorizontal: 12,
  },
  fab: {
    position: 'absolute',
    margin: 24,
    right: 0,
    bottom: 0,
  },
  noText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FeedScreen;
