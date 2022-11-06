import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {theme, mocks} from '../constants';
import {Button, Text} from '../components';
// import {categories} from '../constants/mocks';

export default class Browse extends Component {
  state = {
    active: 'Products',
    categories: [],
  };
  componentDidMount() {
    this.setState({categories: this.props.categories});
  }
  handleTab = tab => {
    const {categories} = this.props;
    const filtered = categories.filter(category =>
      category.tags.includes(tab.toLowerCase()),
    );
    this.setState({active:tab, categories: filtered});
  };
  renderTab(tab) {
    const {active} = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.handleTab(tab)}
        style={[styles.tab, isActive ? styles.active : null]}>
        <Text title medium gray={isActive} secondaray={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  }
  render() {
    const {navigation} = this.props;
    const {categories} = this.state;
    const tabs = ['Products', 'Inspirations', 'Shop'];
    return (
      <SafeAreaView>
        <View style={styles.header}>
          <Text h1 bold>
            Browse
          </Text>
          <Button>
            <Image
              source={require('../assets/IMG_9833.png')}
              style={styles.avatar}
            />
          </Button>
        </View>
        <View style={styles.tabs}>{tabs.map(tab => this.renderTab(tab))}</View>
        <ScrollView>
          <View style={styles.categoriesWrapper}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.name}
                onPress={() => navigation.navigate('Explore')}>
                <View style={styles.card}>
                  <View>
                    <Image source={category.image} />
                  </View>
                  <Text bold>{category.name}</Text>
                  <Text gray captions>
                    {category.count} products
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

Browse.defaultProps = {
  categories: mocks.categories,
};

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
  tabs: {
    marginHorizontal: theme.sizes.base + 4,
    paddingBottom: theme.sizes.base,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
  },
  categoriesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#e5e5e5',
    // marginHorizontal: theme.sizes.base + 4,
  },
  card: {
    borderRadius: theme.sizes.radius,
    padding: theme.sizes.base + 4,
    marginBottom: theme.sizes.base,
    width: 170,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: theme.sizes.base + 2,
  },
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
  },
});
