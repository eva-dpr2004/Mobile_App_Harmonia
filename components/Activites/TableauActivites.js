import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

function TableauActivites() {
  const { authState } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [totalTime, setTotalTime] = useState(0);
  const [totalWeeklyTime, setTotalWeeklyTime] = useState(0);

  const fetchActivities = useCallback(() => {
    if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
      const url = `http://localhost:3001/activities/getActivitesByUserId/${authState.user.Id_Utilisateur}`;
      axios.get(url, { withCredentials: true })
        .then(response => {
          setActivities(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des activités:', error);
        });
    }
  }, [authState]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmation',
      'Suppression de l\'activité ? Appuyez sur OK pour confirmer.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            axios.delete(`http://localhost:3001/activities/deleteActivites/${id}`, { withCredentials: true })
              .then(() => {
                fetchActivities();
              })
              .catch(error => {
                console.error('Erreur lors de la suppression de l\'activité:', error);
              });
          },
        },
      ],
    );
  };

  const handleAnimalChange = (animal) => {
    setSelectedAnimal(animal);
  };

  const animalsWithActivities = [...new Set(activities.map(activity => activity.Nom_Animal))];

  const filteredActivities = selectedAnimal
    ? activities.filter(activity => activity.Nom_Animal === selectedAnimal)
    : [];

  const today = new Date().toISOString().split('T')[0];
  const todaysActivities = filteredActivities.filter(activity => activity.Date === today);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const lastWeekActivities = filteredActivities.filter(activity => new Date(activity.Date) > weekAgo);

  const convertMinutesToHoursAndMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  const calculateTotalTime = () => {
    const totalMinutes = todaysActivities.reduce((total, activity) => {
      const match = activity.Duree_Activite.match(/(\d+)h\s(\d+)min/);
      const hours = match ? parseInt(match[1], 10) : 0;
      const minutes = match ? parseInt(match[2], 10) : 0;
      return total + (hours * 60) + minutes;
    }, 0);
    setTotalTime(totalMinutes);
  };

  const calculateTotalWeeklyTime = () => {
    const totalMinutes = lastWeekActivities.reduce((total, activity) => {
      const match = activity.Duree_Activite.match(/(\d+)h\s(\d+)min/);
      const hours = match ? parseInt(match[1], 10) : 0;
      const minutes = match ? parseInt(match[2], 10) : 0;
      return total + (hours * 60) + minutes;
    }, 0);
    setTotalWeeklyTime(totalMinutes);
  };

  return (
    <View style={styles.container}>
      {activities.length > 0 ? (
        <>
          <Text style={styles.title}>Tableau des Activités</Text>
          <Picker
            selectedValue={selectedAnimal}
            onValueChange={(value) => handleAnimalChange(value)}
            style={styles.picker}
          >
            <Picker.Item label="Sélectionner un animal" value="" />
            {animalsWithActivities.map((animal, index) => (
              <Picker.Item key={index} label={animal} value={animal} />
            ))}
          </Picker>
          <FlatList
            data={filteredActivities}
            keyExtractor={(item) => item.Id_Activite.toString()}
            renderItem={({ item }) => (
              <View style={styles.activityRow}>
                <Text>{item.Nom_Animal}</Text>
                <Text>{item.Date}</Text>
                <Text>{item.Debut_Activite}</Text>
                <Text>{item.Fin_Activite}</Text>
                <Text>{item.Duree_Activite}</Text>
                <TouchableOpacity onPress={() => handleDelete(item.Id_Activite)}>
                  <Text style={styles.deleteIcon}>🗑️</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={<Text>Sélectionnez un animal pour voir ses activités.</Text>}
          />
          <View style={styles.buttonContainer}>
            {todaysActivities.length >= 2 && (
              <Button title="Calculer la durée totale quotidienne" onPress={calculateTotalTime} />
            )}
            {lastWeekActivities.length >= 1 && (
              <Button title="Calculer la durée totale des 7 derniers jours" onPress={calculateTotalWeeklyTime} />
            )}
          </View>
          {totalTime > 0 && (
            <View style={styles.card}>
              <Text>Total de temps d'activité pour aujourd'hui</Text>
              <Text>{convertMinutesToHoursAndMinutes(totalTime)} aujourd'hui</Text>
            </View>
          )}
          {totalWeeklyTime > 0 && (
            <View style={styles.card}>
              <Text>Total de temps d'activité pour les 7 derniers jours</Text>
              <Text>{convertMinutesToHoursAndMinutes(totalWeeklyTime)} cette semaine</Text>
            </View>
          )}
        </>
      ) : (
        <Text>Aucune activité enregistrée pour vos animaux.</Text>
      )}
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
  picker: {
    marginBottom: 20,
    height: 50,
    width: '100%',
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deleteIcon: {
    color: 'red',
  },
  buttonContainer: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default TableauActivites;