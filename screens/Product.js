// import React from 'react';
// import {SafeAreaView, Text} from 'react-native';
//
// export default () => {
//   return (
//     <SafeAreaView>
//       <Text>Product</Text>
//     </SafeAreaView>
//   );
// };

import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

import {Text} from '../components';
import {theme, mocks} from '../constants';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service'; // remove PROVIDER_GOOGLE import if not using Google Maps

const {width, height} = Dimensions.get('window');

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      coordinates: [],
    };
  }
  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinates: this.state.coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        });
      },
      error => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );

    Geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinates: this.state.coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        });
      },
      error => {
        console.log(error);
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 0,
      },
    );
  }
  renderGallery() {
    const {product} = this.props;
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        data={product.images}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item}) => (
          <Image
            source={item}
            resizeMode="contain"
            style={{width, height: height / 2.8}}
          />
        )}
      />
    );
  }

  render() {
    const {product} = this.props;

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {this.renderGallery()}

        <View style={styles.product}>
          <Text h2 bold>
            {product.name}
          </Text>
          <View flex={false} row margin={[theme.sizes.base, 0]}>
            {product.tags.map(tag => (
              <Text key={`tag-${tag}`} caption gray style={styles.tag}>
                {tag}
              </Text>
            ))}
          </View>
          <Text gray light height={22}>
            {product.description}
          </Text>
          <View style={styles.container}>
            <MapView
              provider={MapView.PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              region={{
                latitude: 16.059809,
                longitude: 108.243498,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                coordinate={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                }}
              />
            </MapView>
          </View>
          <View>
            <Text semibold>Gallery</Text>
            <View
              margin={[theme.sizes.padding * 0.9, 0]}
              style={styles.gallery}>
              {product.images.slice(2).map((image, index) => (
                <Image
                  key={`gallery-${index}`}
                  source={image}
                  style={styles.image}
                />
              ))}
              <View
                flex={false}
                card
                center
                middle
                color="rgba(197,204,214,0.20)"
                style={styles.more}>
                <Text gray>+{product.images.slice(3).length}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

Product.defaultProps = {
  product: mocks.products[0],
};

const styles = StyleSheet.create({
  product: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.padding,
  },
  tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.625,
  },
  image: {
    width: width / 3.26,
    height: width / 3.26,
    marginRight: theme.sizes.base,
  },
  more: {
    width: 55,
    height: 55,
  },
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: 400,
    width: width / 1.2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
