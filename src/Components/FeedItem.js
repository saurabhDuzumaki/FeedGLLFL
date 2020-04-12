import * as React from 'react';
import {Avatar, Card, Paragraph} from 'react-native-paper';
import moment from 'moment';
import Video from 'react-native-video';

const FeedItem = ({feed, style}) => {
  // console.log(feed.text);

  return (
    <Card style={style}>
      <Card.Title
        title={feed.name}
        subtitle={moment(feed.time).format('LT, LL')}
        left={props => <Avatar.Text {...props} label={feed.name.slice(0, 1)} />}
      />
      {feed.selectedFile ? (
        feed.mediaType === 'image' ? (
          <Card.Cover source={{uri: feed.selectedFile}} />
        ) : (
          <Video
            source={{uri: feed.selectedFile}}
            muted
            repeat
            resizeMode="contain"
            style={{height: 200, maxHeight: 200}}
          />
        )
      ) : null}
      {feed.text ? (
        <Card.Content style={{marginTop: 12}}>
          <Paragraph>{feed.text}</Paragraph>
        </Card.Content>
      ) : null}
    </Card>
  );
};

export default FeedItem;
