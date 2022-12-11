import React, {Component, useEffect, useState} from 'react';
import {Block, Input} from '../components';
import {Button, Modal, StyleSheet, Text, TextInput} from 'react-native';
import axios from 'axios';
import {categories} from '../constants/mocks';
import {useSelector, useDispatch} from 'react-redux';
import {
  addCategory,
  deleteCategory,
  editCategory,
  selectCategory,
} from '../reducers/slices/category';

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
    <Block>
      <Block>
        <Block>
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
              setCategory(prev => ({...prev, id: value}));
            }}
            value={category.id}
          />
        </Block>
        <Block>
          <Button
            title="Submit"
            onPress={() => {
              if (categories.find(value => value.id == category.id)) {
                dispatch(editCategory(category));
              } else {
                dispatch(addCategory(category));
              }
            }}
          />
        </Block>
      </Block>
      <Block>
        {categories.map((category, index) => (
          <Block style={styles.row} key={index}>
            <Text>{category.name}</Text>
            <Text>{category.id}</Text>
            <Button
              title="Edit"
              onPress={() => {
                handleEditCategory(category);
              }}
            />
            <Button
              title="Delete"
              onPress={() => {
                dispatch(deleteCategory(category));
              }}
            />
          </Block>
        ))}
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Settings;
