import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {theme, mocks} from '../constants';
import {Button, Text} from '../components';

const {width, height} = Dimensions.get('window');

export default class Explore extends Component {
  constructor() {
    super();
    this.state = {
      images: mocks.explore,
    };
  }
  componentDidMount() {
    // get data from API (axios.get(url).then(res => this.setState({images: res.data}))
  }
  renderImage(img, index) {
    const {navigation} = this.props;
    const sizes = Image.resolveAssetSource(img);
    const fullWidth = width - theme.sizes.padding * 2.5;
    const resize = (sizes.width * 100) / fullWidth;
    const imgWidth = resize > 75 ? fullWidth : sizes.width * 1;

    return (
      <TouchableOpacity
        key={`img-${index}`}
        onPress={() => navigation.navigate('Product')}>
        <Image
          source={img}
          style={[styles.image, {minWidth: imgWidth, maxWidth: imgWidth}]}
        />
      </TouchableOpacity>
    );
  }

  renderExplore() {
    const {images} = this.state;
    const {navigation} = this.props;
    const mainImage = images[0];

    return (
      <View>
        <TouchableOpacity
          style={[styles.image, styles.mainImage]}
          onPress={() => navigation.navigate('Product')}>
          <Image source={mainImage} style={[styles.image, styles.mainImage]} />
        </TouchableOpacity>
        <View>
          {images.slice(1).map((img, index) => this.renderImage(img, index))}
        </View>
      </View>
    );
  }

  renderFooter() {
    return (
      <View>
        <Text>renderFooter</Text>
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView>
        <View style={styles.header}>
          <Text h1 bold>
            Explore
          </Text>
          <Button>
            <Image
              source={require('../assets/IMG_9833.png')}
              style={styles.avatar}
            />
          </Button>
        </View>
        <ScrollView style={styles.explore}>{this.renderExplore()}</ScrollView>
        {this.renderFooter()}
      </SafeAreaView>
    );
  }
}

// Explore.defaultProps = {
//   images: mocks.explore,
// };

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base + 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 10,
  },
  explore: {
    marginHorizontal: theme.sizes.padding * 1.25,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    minHeight: 100,
    maxHeight: 130,
    maxWidth: width - theme.sizes.padding * 2.5,
    marginBottom: theme.sizes.base,
    borderRadius: 4,
  },
  mainImage: {
    minWidth: width - theme.sizes.padding * 2.5,
    minHeight: width - theme.sizes.padding * 2.5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.1,
    width,
    paddingBottom: theme.sizes.base * 4,
  },
});
