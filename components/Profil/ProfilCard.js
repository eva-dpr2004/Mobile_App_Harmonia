import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { getUserInfo } from '../../services/Users';
import { FontAwesome5 } from '@expo/vector-icons';

function ProfilCard() {
    const { authState } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({ Nom: '', Email: '' });
    const navigation = useNavigation();

    useEffect(() => {
        if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
            getUserInfo(authState.user.Id_Utilisateur)
                .then(response => {
                    if (response.data) {
                        setUserInfo({ Nom: response.data.Nom, Email: response.data.Email });
                    }
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des informations utilisateur:', error);
                });
        }
    }, [authState]);

    const handleModify = () => {
        navigation.navigate('ModifierProfil'); 
    };

    const handleDelete = () => {
        navigation.navigate('SupprimerProfil');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Votre profil</Text>
            <View style={styles.card}>
                <View style={styles.avatar}>
                    <View style={styles.avatarCircle}>
                        <Text style={styles.avatarText}>{userInfo.Nom.charAt(0)}</Text>
                    </View>
                </View>
                <View style={styles.info}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Nom :</Text>
                        <Text style={styles.value}>{userInfo.Nom}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Adresse électronique :</Text>
                        <Text style={styles.value}>{userInfo.Email}</Text>
                    </View>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.modifyButton} onPress={handleModify}>
                        <FontAwesome5 name="edit" size={16} color="#193356" />
                        <Text style={styles.modifyButtonText}>Modifier mon compte</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                        <FontAwesome5 name="trash" size={16} color="red" />
                        <Text style={styles.deleteButtonText}>Supprimer mon compte</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    title: {
        color: 'rgb(24, 50, 87)',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 16,
        elevation: 2,
    },
    avatar: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#193356',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 32,
        color: '#fff',
    },
    info: {
        marginBottom: 20,
    },
    field: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    value: {
        flex: 1,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modifyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#193356',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    modifyButtonText: {
        marginLeft: 8,
        color: '#193356',
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    deleteButtonText: {
        marginLeft: 8,
        color: 'red',
    },
});

export default ProfilCard;
