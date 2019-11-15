import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const AddCar = props => {
  const [form, setForm] = React.useState({ price: '' });

  return (
    <TextInput
      label="price"
      value={form['price']}
      onChangeText={text => setForm({ ...form, price: text })}
    />
  );
};

export default AddCar;

const styles = StyleSheet.create({
  card: { padding: 20, marginVertical: 8, marginHorizontal: 16 },
  title: {
    fontSize: 16,
  },
});
