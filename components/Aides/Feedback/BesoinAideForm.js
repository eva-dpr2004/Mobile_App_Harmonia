import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebase';

function BesoinAideForm() {
    const [typeAnomalie, setTypeAnomalie] = useState('');
    const [descriptionAnomalie, setDescriptionAnomalie] = useState('');
    const navigation = useNavigation();

    const handleSubmit = async () => {
        try {
            await setDoc(doc(db, "Feedback_Anomalies", `${Date.now()}`), {
                type: typeAnomalie,
                description: descriptionAnomalie,
                timestamp: new Date()
            });
            navigation.navigate('EnvoieConfirmation');
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Failed to report the anomaly. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/img/Vecteurs/imprevu.png')} style={styles.image} />
            <Text style={styles.title}>Vous avez rencontré une anomalie ?</Text>
            <Text style={styles.paragraph}>
                Merci de nous aider à améliorer Harmonia en nous rapportant les bugs ou problèmes que vous rencontrez.
            </Text>
            <View style={styles.form}>
                <Text>Type d'anomalie :</Text>
                <TextInput
                    style={styles.input}
                    value={typeAnomalie}
                    onChangeText={setTypeAnomalie}
                    placeholder="Type d'anomalie rencontré"
                />
                <Text>Description de l'anomalie :</Text>
                <TextInput
                    style={styles.textarea}
                    value={descriptionAnomalie}
                    onChangeText={setDescriptionAnomalie}
                    placeholder="Inscrivez la description ici"
                    multiline
                    numberOfLines={4}
                />
                <Button title="Soumettre" onPress={handleSubmit} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 20,
    },
    form: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#f9f9f9',
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
    },
    textarea: {
        backgroundColor: '#f9f9f9',
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        height: 100,
        textAlignVertical: 'top',
        marginBottom: 20,
    },
});

export default BesoinAideForm;
