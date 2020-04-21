import * as React from 'react';
import {StyleSheet, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {TextInput, Button} from 'react-native-paper';
import Video from 'react-native-video';
import moment from 'moment';
import {connect} from 'react-redux';
import {addFeed} from '../Store/actions/feedActions';

const AddPostScreen = ({navigation, currentUser, addNewFeed}) => {
  const [text, setText] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [mediaType, setMediaType] = React.useState('image');

  const pickMedia = () => {
    const options = {
      title: 'Choose a media from...',
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Camera',
      chooseFromLibraryButtonTitle: 'Gallery',
      mediaType: 'mixed',
      videoQuality: 'low',
      storageOptions: {
        path: 'FeedGLLFL',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (!response.didCancel) {
        setSelectedFile(response.uri);
        setMediaType(response.type.includes('image') ? 'image' : 'video');
      }
    });
  };

  const removeMedia = () => setSelectedFile(null);

  const postNow = async () => {
    if (text.trim().length > 0 || selectedFile != null) {
      let currentPost = {
        text: text,
        name: currentUser.user.username,
        selectedFile: selectedFile,
        mediaType: selectedFile ? mediaType : null,
        time: moment.now(),
      };
      addNewFeed(currentPost);
      navigation.goBack();
    }
  };

  return (
    <>
      <TextInput
        label="Write a new post..."
        value={text}
        multiline
        style={styles.input}
        onChangeText={newtext => setText(newtext)}
      />
      {selectedFile ? (
        mediaType === 'image' ? (
          <Image
            style={styles.media}
            resizeMode="contain"
            source={{uri: selectedFile}}
          />
        ) : (
          <Video
            muted
            resizeMode="contain"
            repeat
            source={{uri: selectedFile}}
            style={styles.media}
          />
        )
      ) : null}
      <Button
        style={styles.input}
        icon={!selectedFile ? 'camera' : 'delete'}
        mode="text"
        onPress={!selectedFile ? pickMedia : removeMedia}>
        {!selectedFile ? 'Add Photo or Video' : 'Remove Media'}
      </Button>
      <Button style={styles.postButton} mode="contained" onPress={postNow}>
        Post
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 16,
  },
  media: {
    height: 200,
    maxHeight: 200,
  },
  postButton: {
    bottom: 20,
    right: 0,
    left: 0,
    position: 'absolute',
    marginHorizontal: 16,
  },
});

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.auth.user,
});
const actionCreators = {
  addNewFeed: addFeed,
};

export default connect(
  mapStateToProps,
  actionCreators,
)(AddPostScreen);
