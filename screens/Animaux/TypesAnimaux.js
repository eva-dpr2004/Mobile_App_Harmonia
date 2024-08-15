import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function TypesAnimaux() {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
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
        <Text style={styles.listItem}>Hamster -</Text>
        <Text style={styles.listItem}>Cochon d'Inde -</Text>
        <Text style={styles.listItem}>Furet -</Text>
        <Text style={styles.listItem}>Chinchilla -</Text>
        <Text style={styles.listItem}>Souris -</Text>
        <Text style={styles.listItem}>Singe -</Text>
        <Text style={styles.listItem}>Hérisson</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}><Icon name="emoji-nature" size={20} /> Poissons :</Text>
        <Text style={styles.listItem}>Poissons rouges -</Text>
        <Text style={styles.listItem}>Carpes koï -</Text>
        <Text style={styles.listItem}>Poisson-clown -</Text>
        <Text style={styles.listItem}>Poisson-ange -</Text>
        <Text style={styles.listItem}>Poisson-chat</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}><Icon name="emoji-nature" size={20} /> Oiseaux :</Text>
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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}><Icon name="emoji-nature" size={20} /> Reptiles et Amphibiens :</Text>
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
    </ScrollView>
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
    marginBottom: 5,
  },
});

export default TypesAnimaux;
