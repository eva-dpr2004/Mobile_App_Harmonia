import React from 'react';
import { View } from 'react-native';
import ModifierAnimalForm from '../../components/Animaux/ModifierAnimalForm';

function ModifierAnimal({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <ModifierAnimalForm navigation={navigation} />
    </View>
  );
}

export default ModifierAnimal;
