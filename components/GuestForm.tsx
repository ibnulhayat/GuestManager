import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Guest } from '@/types/guest';

type Props = {
  onSubmit: (guest: Omit<Guest, 'id'>) => void;
  initialData?: Guest;
  categories: string[];
};

const GuestForm = ({ onSubmit, initialData, categories}: Props) => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    onSubmit({ name, email, category });
    setName('');
    setEmail('');
    setCategory(categories[0]);
  };

  useEffect(()=>{
    setName(initialData?.name || "")
    setEmail(initialData?.email || "")
    setCategory(initialData?.category || categories[0])
  },[initialData])


  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="Name" 
        placeholderTextColor={"#BBB"}
        value={name} 
        onChangeText={setName} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Email" 
        placeholderTextColor={"#BBB"}
        value={email} 
        onChangeText={setEmail} 
        style={styles.input}
      />
      <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
        {categories.map((cat) => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>
      <Button title={initialData ? 'Update Guest' : 'Add New Guest'} onPress={handleSubmit}/>
    </View>
  );
};

export default GuestForm;

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
