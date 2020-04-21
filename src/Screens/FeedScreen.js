import * as React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {Searchbar, FAB} from 'react-native-paper';
import FeedItem from '../Components/FeedItem';
import Loader from '../Components/Loader';
import {connect} from 'react-redux';
import {getFeed} from '../Store/actions/feedActions';

let originalPosts;

const FeedScreen = ({navigation, allFeeds, dispatch, getAllFeed}) => {
  // AsyncStorage.clear();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [feeds, setFeeds] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  React.useEffect(() => {
    setFeeds(allFeeds);
    setIsLoaded(true);
    console.log('12333');
  }, [allFeeds]);

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

const mapStateToProps = (state, ownProps) => ({
  allFeeds: state.feed.allFeeds,
});

export default connect(mapStateToProps)(FeedScreen);
