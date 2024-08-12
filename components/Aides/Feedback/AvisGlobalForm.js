import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebase';

function FormulaireAvisGlobal() {
    const [reponses, setReponses] = useState({
        decouverte: '',
        fonctionnaliteUtile: '',
        fonctionnaliteUtilisee: '',
        efficaciteNotifications: '',
        frequenceUtilisation: '',
        faciliteUtilisation: '',
        qualiteInterface: '',
        reactiviteApp: '',
        suggestions: '',
        recommandation: ''
    });

    const navigation = useNavigation();

    const handleChange = (name, value) => {
        setReponses({ ...reponses, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await setDoc(doc(db, "Feedback_Avis_Global", `${Date.now()}`), {
                ...reponses,
                timestamp: new Date()
            });
            navigation.navigate('EnvoieConfirmation'); 
        } catch (error) {
            console.error("Erreur lors de l'ajout du document: ", error);
            alert('Échec de la soumission du retour. Veuillez réessayer.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Formulaire d'Avis Global</Text>

            <View style={styles.questionContainer}>
                <Text style={styles.question}>1. Comment avez-vous découvert Harmonia?</Text>
                <Picker
                    selectedValue={reponses.decouverte}
                    onValueChange={(value) => handleChange('decouverte', value)}
                    style={styles.picker}
                >
                    <Picker.Item label="On m'en a parlé" value="parler" />
                    <Picker.Item label="Réseaux Sociaux" value="reseauxSociaux" />
                    <Picker.Item label="Publicité" value="publicite" />
                    <Picker.Item label="Autres" value="autres" />
                </Picker>
            </View>

            {/* Repeat for other questions similarly */}

            <View style={styles.questionContainer}>
                <Text style={styles.question}>8. Avez-vous des suggestions pour améliorer l'application?</Text>
                <TextInput
                    style={styles.textarea}
                    value={reponses.suggestions}
                    onChangeText={(text) => handleChange('suggestions', text)}
                    multiline
                    numberOfLines={4}
                    placeholder="Inscrivez la description ici"
                />
            </View>

            <Button title="Soumettre" onPress={handleSubmit} />
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
    questionContainer: {
        marginBottom: 20,
    },
    question: {
        fontSize: 18,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: '#f9f9f9',
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    textarea: {
        height: 100,
        backgroundColor: '#f9f9f9',
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlignVertical: 'top',
    },
});

export default FormulaireAvisGlobal;
