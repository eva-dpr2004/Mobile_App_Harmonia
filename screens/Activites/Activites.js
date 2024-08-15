import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AjouterActivites from '../../components/Activites/AjouterActivites'; 
import TableauActivites from '../../components/Activites/TableauActivites'; 

const Activites = () => {
  return (
    <ScrollView style={styles.container}>
      <AjouterActivites />  
      <TableauActivites />  
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default Activites;
