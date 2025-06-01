import AddCategoryForm from '@/components/AddCategoryForm';
import GuestForm from '@/components/GuestForm';
import GuestItem from '@/components/GuestItem';
import { Guest } from '@/types/guest';
import { categories } from '@/utils/categories';
import { showToast } from '@/utils/toast';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { v4 as uuidv4 } from 'uuid';


export default function HomeScreen() {
  const [showForm, setShowForm] = useState(false)
  const [addCategory, setAddCategory] = useState(false)
  const [hasSearch, setSearch] = useState(false)
  const [guests, setGuests] = useState<Guest[]>([]);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>(['Family', 'Friend', 'Colleague']);
  const [searchQuery, setSearchQuery] = useState('');


  const addGuest = (guest: Omit<Guest, 'id'>) => {
    if (editingGuest) {
      setGuests(prev =>
        prev.map(g => (g.id === editingGuest.id ? { ...g, ...guest } : g))
      );
      setEditingGuest(null);
      showToast("Guest updated","success");
    }else{
      setGuests(prev => [...prev, { id: uuidv4(), ...guest }]);
      showToast("Guest added", 'success');
    }
    setShowForm(!showForm)
  };

  const updateGuest = (updatedGuest: Guest) => {
    setShowForm(!showForm)
    setEditingGuest(updatedGuest)
  };

  const deleteGuest = (id: string) => {
    // ConfirmAleart(id) // it's not opening in web
    DeleteConfirm(id)
    
  };
  const ConfirmAleart = async (id: string) => {
      Alert.alert(
          "Confirmation!",
          'Are you sure?',
          [
              {
                  text: "Cancle",
                  style: "cancel"
              },
              {
                  text: "Yes",
                  onPress: () => DeleteConfirm(id)
              }
          ]
      )
  }

  const DeleteConfirm = (id: string) =>{
    setGuests(guests.filter(g => g.id !== id));
    showToast("Guest deleted", "success");
  }


  const AddNewCategory = (newCategory: string) => {
    if (newCategory && !categories.includes(newCategory )) {
      setCategories([...categories, newCategory ]);

      showToast(`Category "${newCategory}" added`, 'success');
    } else {
      showToast('Duplicate or invalid category', 'error');
    }
    setAddCategory(!addCategory)
  };

  // const filteredGuests =
  //   filter === 'All' ? guests : guests.filter(g => g.category === filter);

  const filteredGuests = guests.filter((g) => {
    const matchCategory = filter === 'All' || g.category === filter;
    const matchSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        g.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });
  return (
    <View style={styles.container}>
      {
        showForm? <GuestForm onSubmit={addGuest} initialData={editingGuest || undefined} categories={categories}/> 
        : addCategory ? <AddCategoryForm onSubmit={AddNewCategory} /> :
        <View style={styles.topBar}>
          <Button title='Add Guest' onPress={()=>setShowForm(!showForm)}/>
          <Button title='Add Category' onPress={()=>setAddCategory(!addCategory)}/>
          {/* <Button title='Saerch Guest' onPress={()=>setSearch(!hasSearch)} /> */}
        </View>
      }
      
      <View style={styles.filterContainer}>
        <Text>Filter by Category:</Text>
        <Picker
          selectedValue={filter}
          onValueChange={(val) => setFilter(val)}
          style={styles.picker}
        >
          <Picker.Item label="All" value="All" />
          {categories.map(cat => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>
      
      <TextInput
        placeholder="Search by name or category"
        placeholderTextColor={"#BBB"}
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.input}
      />

      <FlatList
        data={filteredGuests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GuestItem
            guest={item}
            onDelete={deleteGuest}
            onUpdate={updateGuest}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 16, 
    flex: 1 
  },
  topBar:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  filterContainer: { 
    marginVertical: 15 
  },  
  picker: { 
    marginVertical: 8,
    padding: 8
  },
  input: { 
    marginBottom: 10,
    padding: 8,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5
  },
});