import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

function TypesAnimauxList() {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Les types d'animaux disponibles :</Text>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
        <Text style={styles.backText}>Retour</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}><FontAwesome5 name="paw" size={20} color="black" /> Mammifères :</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>Chat -</Text>
          <Text style={styles.listItem}>Chien -</Text>
          <Text style={styles.listItem}>Lapin -</Text>
          <Text style={styles.listItem}>Hamster -</Text>
          <Text style={styles.listItem}>Cochon d'Inde -</Text>
          <Text style={styles.listItem}>Furet -</Text>
          <Text style={styles.listItem}>Chinchilla -</Text>
          <Text style={styles.listItem}>Souris -</Text>
          <Text style={styles.listItem}>Singe -</Text>
          <Text style={styles.listItem}>Hérisson</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}><MaterialIcons name="pool" size={20} color="black" /> Poissons :</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>Poissons rouges -</Text>
          <Text style={styles.listItem}>Carpes koï -</Text>
          <Text style={styles.listItem}>Poisson-clown -</Text>
          <Text style={styles.listItem}>Poisson-ange -</Text>
          <Text style={styles.listItem}>Poisson-chat</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}><FontAwesome5 name="feather" size={20} color="black" /> Oiseaux :</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>Perroquet -</Text>
          <Text style={styles.listItem}>Canari -</Text>
          <Text style={styles.listItem}>Poule -</Text>
          <Text style={styles.listItem}>Coq -</Text>
          <Text style={styles.listItem}>Canard -</Text>
          <Text style={styles.listItem}>Oie -</Text>
          <Text style={styles.listItem}>Dindon -</Text>
          <Text style={styles.listItem}>Perruche -</Text>
          <Text style={styles.listItem}>Pigeon -</Text>
          <Text style={styles.listItem}>Moineau</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}><FontAwesome5 name="frog" size={20} color="black" /> Reptiles et Amphibiens :</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>Tortue -</Text>
          <Text style={styles.listItem}>Lézard -</Text>
          <Text style={styles.listItem}>Gecko -</Text>
          <Text style={styles.listItem}>Serpent -</Text>
          <Text style={styles.listItem}>Axolotl -</Text>
          <Text style={styles.listItem}>Salamandre -</Text>
          <Text style={styles.listItem}>Iguane -</Text>
          <Text style={styles.listItem}>Caméléon -</Text>
          <Text style={styles.listItem}>Grenouille -</Text>
          <Text style={styles.listItem}>Triton</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  backText: {
    marginLeft: 8,
    fontSize: 18,
    color: '#007BFF',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    marginLeft: 16,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default TypesAnimauxList;
