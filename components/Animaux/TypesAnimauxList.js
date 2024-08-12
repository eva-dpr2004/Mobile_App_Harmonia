import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function TypesAnimauxList() {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Les types d'animaux disponibles :</Text>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Icon name="arrow-back" size={24} />
        <Text>Retour</Text>
      </TouchableOpacity>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}><Icon name="pets" size={20} /> Mammifères :</Text>
        <Text style={styles.listItem}>Chat -</Text>
        <Text style={styles.listItem}>Chien -</Text>
        <Text style={styles.listItem}>Lapin -</Text>
        {/* Add more animals here */}
      </View>
      {/* Add more sections for fish, birds, reptiles */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItem: {
    fontSize: 16,
  },
});

export default TypesAnimauxList;
