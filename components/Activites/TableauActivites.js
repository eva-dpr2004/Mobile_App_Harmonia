import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../../context/AuthContext';
import { getActivitesByUserId, deleteActivite } from '../../services/Activites';

function TableauActivites() {
  const { authState } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [showWeeklyCard, setShowWeeklyCard] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [totalWeeklyTime, setTotalWeeklyTime] = useState(0);
  const [hasWeeklyActivitiesForEachDay, setHasWeeklyActivitiesForEachDay] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null);

  const [page, setPage] = useState(1);
  const itemsPerPage = 10; 

  const fetchActivities = useCallback(async () => {
    if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
      try {
        const data = await getActivitesByUserId(authState.user.Id_Utilisateur);
        setActivities(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des activités:', error);
      }
    }
  }, [authState]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const confirmDelete = (id) => {
    setActivityToDelete(id);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (activityToDelete) {
      try {
        await deleteActivite(activityToDelete);
        fetchActivities();
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'activité:', error);
      } finally {
        setModalVisible(false);
        setActivityToDelete(null);
      }
    }
  };

  const handleAnimalChange = (value) => {
    setSelectedAnimal(value);
    setShowCard(false);
    setShowWeeklyCard(false);
  };

  const animalsWithActivities = [...new Set(activities.map(activity => activity.Nom_Animal))];

  const filteredActivities = selectedAnimal
    ? activities.filter(activity => activity.Nom_Animal === selectedAnimal)
    : [];

  const sortedActivities = filteredActivities.sort((a, b) => new Date(b.Date) - new Date(a.Date));

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedActivities = sortedActivities.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const today = new Date().toISOString().split('T')[0];
  const todaysActivities = sortedActivities.filter(activity => activity.Date === today);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const lastWeekActivities = sortedActivities.filter(activity => new Date(activity.Date) >= weekAgo);

  const hasEnoughActivities = todaysActivities.length >= 2;

  const checkWeeklyActivitiesForEachDay = useCallback(() => {
    const daysWithActivities = new Set(lastWeekActivities.map(activity => activity.Date));

    const past7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    });

    const allDaysCovered = past7Days.every(day => daysWithActivities.has(day));

    setHasWeeklyActivitiesForEachDay(allDaysCovered);
  }, [lastWeekActivities]);

  useEffect(() => {
    if (lastWeekActivities.length > 0) {
      checkWeeklyActivitiesForEachDay();
    }
  }, [lastWeekActivities, checkWeeklyActivitiesForEachDay]);

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
    setShowCard(true);
  };

  const calculateTotalWeeklyTime = () => {
    const totalMinutes = lastWeekActivities.reduce((total, activity) => {
      const match = activity.Duree_Activite.match(/(\d+)h\s(\d+)min/);
      const hours = match ? parseInt(match[1], 10) : 0;
      const minutes = match ? parseInt(match[2], 10) : 0;
      return total + (hours * 60) + minutes;
    }, 0);
    setTotalWeeklyTime(totalMinutes);
    setShowWeeklyCard(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {activities.length > 0 ? (
        <View>
          <Text style={styles.title}>Tableau des Activités</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedAnimal}
              onValueChange={handleAnimalChange}
              style={styles.picker}
            >
              <Picker.Item label="Sélectionner un animal" value="" />
              {animalsWithActivities.map((animal, index) => (
                <Picker.Item key={index} label={animal} value={animal} />
              ))}
            </Picker>
          </View>
          <View style={styles.tableContainer}>
            <FlatList
              data={displayedActivities}
              keyExtractor={(item) => item.Id_Activite.toString()}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.Nom_Animal}</Text>
                  <Text style={styles.tableCell}>{item.Date}</Text>
                  <Text style={styles.tableCell}>{item.Debut_Activite}</Text>
                  <Text style={styles.tableCell}>{item.Fin_Activite}</Text>
                  <Text style={styles.tableCell}>{item.Duree_Activite}</Text>
                  <TouchableOpacity onPress={() => confirmDelete(item.Id_Activite)}>
                    <Text style={styles.deleteButton}>Supprimer</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View style={styles.paginationContainer}>
            {sortedActivities.length > itemsPerPage && (
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                <Text style={styles.paginationText}>Précédent</Text>
              </TouchableOpacity>
            )}
            {sortedActivities.length > itemsPerPage && (
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => handlePageChange(page + 1)}
                disabled={page === Math.ceil(sortedActivities.length / itemsPerPage)}
              >
                <Text style={styles.paginationText}>Suivant</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.buttonsContainer}>
            {hasEnoughActivities && (
              <TouchableOpacity style={styles.button} onPress={calculateTotalTime}>
                <Text style={styles.buttonText}>Calculer la durée totale quotidienne</Text>
              </TouchableOpacity>
            )}
            {hasWeeklyActivitiesForEachDay && (
              <TouchableOpacity style={styles.button} onPress={calculateTotalWeeklyTime}>
                <Text style={styles.buttonText}>Calculer la durée totale des 7 derniers jours</Text>
              </TouchableOpacity>
            )}
          </View>
          {showCard && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Total de temps d'activité pour aujourd'hui</Text>
              <Text style={styles.cardContent}>{convertMinutesToHoursAndMinutes(totalTime)} aujourd'hui</Text>
            </View>
          )}
          {showWeeklyCard && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Total de temps d'activité pour les 7 derniers jours</Text>
              <Text style={styles.cardContent}>{convertMinutesToHoursAndMinutes(totalWeeklyTime)} cette semaine</Text>
            </View>
          )}
        </View>
      ) : (
        <Text style={styles.noActivitiesText}>Aucune activité enregistrée pour vos animaux.</Text>
      )}

      {/* Modal de confirmation de suppression */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmation de Suppression</Text>
            <Text style={styles.modalMessage}>Êtes-vous sûr de vouloir supprimer cette activité ?</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonDelete]} onPress={handleDelete}>
                <Text style={styles.modalButtonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: 'rgb(24, 50, 87)',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  tableContainer: {
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  deleteButton: {
    color: '#d9534f',
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  paginationButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  paginationText: {
    color: '#fff',
  },
  buttonsContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  card: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
  },
  noActivitiesText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#183159',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#007BFF',
  },
  modalButtonDelete: {
    backgroundColor: '#d9534f',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TableauActivites;
