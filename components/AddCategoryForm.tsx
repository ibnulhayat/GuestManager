import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

type Props = {
  onSubmit: (newCategory: string) => void;
};

const AddCategoryForm = ({ onSubmit }: Props) => {
  
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = () => {
    onSubmit(newCategory);
    setNewCategory('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Add Category"
        placeholderTextColor={"#BBB"}
        value={newCategory}
        onChangeText={setNewCategory}
        style={styles.input}
      />
      <Button title="Add Category" onPress={handleSubmit} />
    </View>
  );
};

export default AddCategoryForm;

const styles = StyleSheet.create({
  container: { 
    padding: 6,
    borderColor: 'blue',
    borderWidth: 1
  },
  input: { 
    marginBottom: 10,
    padding: 8,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5
  },
  picker: { 
    marginBottom: 10,
    padding: 8,
  },
});
