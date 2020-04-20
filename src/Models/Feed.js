import moment from 'moment';

class Feed {
  constructor(text: string, name: string, selectedFile: string, mediaType) {
    this.text = text;
    this.name = name;
    this.selectedFile = selectedFile;
    this.mediaType = mediaType;
    this.time = moment.now();
  }
}

export default Feed;
