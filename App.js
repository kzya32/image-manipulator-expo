import React from 'react';
import { Button, TouchableOpacity, Text, View, Image } from 'react-native';
import { Asset, ImageManipulator } from 'expo';

// import Colors from '../constants/Colors';

export default class ImageManipulatorSample extends React.Component {
  state = {
    ready: false,
    image: null,
  };

  componentWillMount() {
    (async () => {
      const image = Asset.fromModule(require('./assets/icon0.png'));
      await image.downloadAsync();
      this.setState({
        ready: true,
        image,
      });
    })();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: 30 }}>
          <Button title="Test" onPress={this._rotate90andFlip} />
          {this.state.ready && this._renderImage()}
        </View>
      </View>
    );
  }

  _rotate90andFlip = async () => {
    const manipResult = await ImageManipulator.manipulate(
      this.state.image.localUri || this.state.image.uri,
      [{ rotate: 90}, { flip: { vertical: true }}],
      { format: 'png' }
    );
    this.setState({ image: manipResult });
  }

  _renderImage = () => {
    return (
      <View style={{marginVertical: 10, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={{ uri: this.state.image.localUri || this.state.image.uri }}
          style={{ width: 300, height: 300, resizeMode: 'contain' }}
        />
      </View>
    );
  };
}
