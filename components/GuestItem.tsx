import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Guest } from '../types/guest';

interface GuestItemProps {
  guest: Guest;
  onDelete: (id: string) => void;
  onUpdate: (guest: Guest) => void;
}

export default function GuestItem({ guest, onDelete, onUpdate }: GuestItemProps) {

  return (
    <View style={styles.item}>
        <Text style={styles.text}>
        {guest.name} ({guest.category})
        </Text>
        <Text style={styles.email}>{guest.email}</Text>
        <View style={styles.buttons}>
        <Button title="Edit" onPress={() => onUpdate(guest)} />
        <Button title="Delete" onPress={() => onDelete(guest.id)} color="red" />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
  },
  text: { fontWeight: 'bold' },
  email: { color: 'gray', marginBottom: 5 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
});
