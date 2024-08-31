import React from 'react';
import { View } from 'react-native';
import ModifierAnimalForm from '../../components/Animaux/ModifierAnimalForm';
import TabNavigator from '../../components/Basics/TabNavigator';

function ModifierAnimal({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <ModifierAnimalForm navigation={navigation} />
      <TabNavigator/>
    </View>
  );
}

export default ModifierAnimal;
