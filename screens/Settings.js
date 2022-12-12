import React, {useState} from 'react';
import {Block, Input} from '../components';
import {Button, ScrollView, StyleSheet, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  addCategory,
  deleteCategory,
  editCategory,
  selectCategory,
} from '../reducers/slices/category';
import {theme} from '../constants';

const Settings = () => {
  const categories = useSelector(selectCategory);
  const dispatch = useDispatch();
  const [category, setCategory] = useState({
    name: '',
    tags: '',
    count: '',
    id: '',
  });

  const handleEditCategory = value => {
    setCategory(prev => ({
      ...prev,
      name: value.name,
      tags: value.tags,
      count: value.count,
      id: value.id,
    }));
  };

  return (
    <ScrollView>
      <Block padding={[0, theme.sizes.base]}>
        <Block>
          <Block middle>
            <Input
              label="Name"
              onChangeText={value => {
                setCategory(prev => ({...prev, name: value}));
              }}
              value={category.name}
            />
            <Input
              label="Tags"
              onChangeText={value => {
                setCategory(prev => ({...prev, tags: value}));
              }}
              value={category.tags.toString()}
            />
            <Input
              label="Count"
              onChangeText={value => {
                setCategory(prev => ({...prev, count: value}));
              }}
              value={category.count.toString()}
            />
            {/*<Input label="Image" />*/}
            <Input
              label="ID"
              onChangeText={value => {
                setCategory({...category, id: value});
              }}
              value={category.id}
            />
          </Block>
          <Block style={{backgroundColor: 'white'}}>
            <Button
              color={'black'}
              title="Submit"
              onPress={() => {
                if (
                  categories.find(categoryEle => categoryEle.id === category.id)
                ) {
                  dispatch(editCategory(category));
                } else {
                  dispatch(addCategory(category));
                }
              }}
            />
          </Block>
        </Block>
        <Block>
          <Block style={styles.title}>
            <Text style={[styles.fields, styles.width]}>ID</Text>
            <Text style={[styles.fields, styles.width]}>Name</Text>
            <Text
              style={[styles.fields, styles.width, styles.action]}
            >Action</Text>
          </Block>
          {categories.map((category, index) => (
            <Block style={styles.row} key={index}>
              <Text style={styles.width}>{category.id}</Text>
              <Text style={styles.width}>{category.name}</Text>
              <Button
                style={styles.width}
                title="Edit"
                onPress={() => {
                  handleEditCategory(category);
                }}
              />
              <Button
                style={styles.width}
                title="Delete"
                onPress={() => {
                  dispatch(deleteCategory(category));
                }}
              />
            </Block>
          ))}
        </Block>
      </Block>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  container: {
    marginTop: 100,
  },
  submitButton: {
    backgroundColor: 'red',
    color: 'red',
  },
  title: {
    flexDirection: 'row',
  },
  fields: {
    fontWeight: '700',
    paddingVertical: 10,
  },
  width: {
    width: 140,
  },
  action: {
    padding: 30,
  },
});

export default Settings;
