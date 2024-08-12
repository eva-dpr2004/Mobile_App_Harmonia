import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function TextConditionsUtilisations() {
  return (
    <ScrollView contentContainerStyle={styles.LegalContainer}>
      <Text style={styles.title}>Conditions d'Utilisation</Text>
      <Text style={styles.paragraph}>
        L'utilisation de ce site implique l'acceptation sans réserve des présentes Conditions d'Utilisation. Veuillez lire attentivement les conditions suivantes avant d'utiliser ce site.
      </Text>
      <Text style={styles.subtitle}>Conditions d'Inscription</Text>
      <Text style={styles.paragraph}>
        Pour accéder à certaines fonctionnalités de notre site, les utilisateurs doivent créer un compte en fournissant des informations précises et à jour.
      </Text>
      <Text style={styles.subtitle}>Moyens Techniques Nécessaires</Text>
      <Text style={styles.paragraph}>
        L'accès au site nécessite une connexion Internet et un appareil compatible (ordinateur, smartphone, tablette). Nous ne sommes pas responsables de l'absence de ces moyens.
      </Text>
      <Text style={styles.subtitle}>Services et Fonctionnalités</Text>
      <Text style={styles.paragraph}>
        Notre site offre une variété de services et de fonctionnalités dédiées aux propriétaires d'animaux, des tableaux permettant de gérer le temps d'activité de vos animaux de façon quotidienne, vous pourrez ainsi grâce à des boutons, obtenir le temps du rée d'activité total quotidienne et hebdomadaire pour l'animal de votre choix.
      </Text>
      <Text style={styles.subtitle}>Propriété Intellectuelle</Text>
      <Text style={styles.paragraph}>
        Tous les contenus présents sur le site (textes, images, marques, graphismes) sont protégés par des droits de propriété intellectuelle et ne peuvent être utilisés sans autorisation préalable.
      </Text>
      <Text style={styles.subtitle}>Utilisation des Contenus Protégés</Text>
      <Text style={styles.paragraph}>
        Les utilisateurs peuvent accéder et utiliser les contenus du site uniquement pour un usage personnel et non commercial. Toute reproduction, distribution ou modification des contenus est strictement interdite.
      </Text>
      <Text style={styles.subtitle}>Limitation de Responsabilité</Text>
      <Text style={styles.paragraph}>
        Nous ne garantissons pas l'exactitude ou l'exhaustivité des informations publiées sur le site et déclinons toute responsabilité en cas d'erreurs ou d'omissions.
      </Text>
      <Text style={styles.subtitle}>Liens Externes et Contenus Tiers</Text>
      <Text style={styles.paragraph}>
        Notre site peut contenir des liens vers des sites tiers. Nous ne sommes pas responsables du contenu de ces sites et déclinons toute responsabilité pour les dommages pouvant résulter de leur utilisation.
      </Text>
      <Text style={styles.subtitle}>Collecte et Traitement des Données Personnelles</Text>
      <Text style={styles.paragraph}>
        Conformément au RGPD, nous collectons et traitons vos données personnelles de manière transparente et sécurisée. Pour plus de détails, veuillez consulter notre Politique de Confidentialité.
      </Text>
      <Text style={styles.subtitle}>Droits des Utilisateurs</Text>
      <Text style={styles.paragraph}>
        Vous avez le droit d'accéder, de rectifier et de supprimer vos données personnelles. Pour exercer ces droits, une fois votre compte crée et une fois authentifié vous pourrez le faire via la page de profil qui vous permettra d'accéder à une page de modification et de suppression du profil.
      </Text>
      <Text style={styles.subtitle}>Disponibilité du Site</Text>
      <Text style={styles.paragraph}>
        Nous nous réservons le droit d'interrompre temporairement le service pour maintenance ou mises à jour sans préavis. Nous ne pouvons être tenus responsables des interruptions temporaires.
      </Text>
      <Text style={styles.subtitle}>Litiges et Juridiction</Text>
      <Text style={styles.paragraph}>
        En cas de litige, nous privilégions la médiation ou l'arbitrage. Les juridictions compétentes pour tout litige relatif à l'utilisation du site seront celles de notre siège social.
      </Text>
      <Text style={styles.conclusion}>
        Afin d'accéder à toutes les fonctionnalités, les utilisateurs devront se connecter.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  LegalContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
  conclusion: {
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 20,
  },
});

export default TextConditionsUtilisations;
