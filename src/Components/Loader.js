import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const Loader = () => (
  <View style={styles.loader}>
    <ActivityIndicator animating={true} size="large" />
  </View>
);

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
