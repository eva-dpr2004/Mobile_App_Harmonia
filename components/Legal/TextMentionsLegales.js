import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

function TextMentionsLegales() {
  return (
    <View style={styles.legalContainer}>
      <Text style={styles.title}>Mentions Légales</Text>
      <Text style={styles.introductionParagraphe}>
        Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., nous portons à la connaissance des utilisateurs et visiteurs du site : www.harmonia.com les informations suivantes :
      </Text>

      <Text style={styles.subtitle}>1. Informations légales :</Text>
      <Text>Email : harmonia.contactus@gmail.com</Text>
      <Text>Hébergeur : pas encore</Text>

      <Text style={styles.subtitle}>2. Conditions générales d’utilisation du site et des services proposés :</Text>
      <Text>
        L’utilisation du site www.harmonia.com implique l’acceptation pleine et entière des conditions générales d’utilisation décrites ci-après. Ces conditions d’utilisation sont susceptibles d’être modifiées ou complétées à tout moment, les utilisateurs du site www.harmonia.com sont donc invités à les consulter de manière régulière.
      </Text>

      <Text style={styles.subtitle}>3. Description des services fournis :</Text>
      <Text>
        Le site www.harmonia.com a pour objet de fournir une information concernant l’ensemble des activités de la société. La propriétaire du site s’efforce de fournir sur le site www.harmonia.com des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu’elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
      </Text>

      <Text style={styles.subtitle}>4. Limitations contractuelles sur les données techniques :</Text>
      <Text>
        Le site utilise la technologie JavaScript. Le site Internet ne pourra être tenu responsable de dommages matériels liés à l’utilisation du site. De plus, l’utilisateur du site s’engage à accéder au site en utilisant un matériel récent, ne contenant pas de virus et avec un navigateur de dernière génération mis-à-jour.
      </Text>

      <Text style={styles.subtitle}>5. Propriété intellectuelle et contrefaçons :</Text>
      <Text>
        Harmonia est propriétaire des droits de propriété intellectuelle ou détient les droits d’usage sur tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logo, icônes, sons, logiciels. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Eva De Palma Rosario (Propriétaire de Harmonia).
      </Text>

      <Text style={styles.subtitle}>6. Limitations de responsabilité :</Text>
      <Text>
        Harmonia est un site web et une application mobile développés uniquement par passion pour les animaux. Bien que nous nous efforcions de fournir des informations utiles et pertinentes, nous ne pouvons garantir l'exactitude complète de celles-ci. En conséquence, certaines informations peuvent être incorrectes ou incomplètes.
      </Text>
      <Text>
        Harmonia ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l’utilisateur lors de l’accès au site www.harmonia.com ou à l'application mobile, et résultant soit de l’utilisation d’un matériel ne répondant pas aux spécifications indiquées au point 4, soit de l’apparition d’un bug ou d’une incompatibilité.
      </Text>

      <Text style={styles.subtitle}>7. Gestion des données personnelles :</Text>
      <Text>
        En France, les données personnelles sont notamment protégées par la loi n° 78-87 du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004, l'article L. 226-13 du Code pénal et la Directive Européenne du 24 octobre 1995. À l'occasion de l'utilisation du site www.harmonia.com, peuvent être recueillies : l'URL des liens par l'intermédiaire desquels l'utilisateur a accédé au site www.harmonia.com, le fournisseur d'accès de l'utilisateur, l'adresse de protocole Internet (IP) de l'utilisateur. En tout état de cause Harmonia ne collecte des informations personnelles relatives à l'utilisateur que pour le besoin de certains services proposés par le site www.harmonia.com.
      </Text>

      <Text style={styles.subtitle}>8. Liens hypertextes et cookies :</Text>
      <Text>
        Le site www.harmonia.com contient un certain nombre de liens hypertextes vers d’autres sites, mis en place avec l’autorisation de Harmonia. Cependant, Harmonia n’a pas la possibilité de vérifier le contenu des sites ainsi visités, et n’assumera en conséquence aucune responsabilité de ce fait. La navigation sur le site www.harmonia.com est susceptible de provoquer l’installation de cookie(s) sur l’ordinateur de l’utilisateur.
      </Text>

      <Text style={styles.subtitle}>9. Droit applicable et attribution de juridiction :</Text>
      <Text>
        Tout litige en relation avec l’utilisation du site www.harmonia.com est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.
      </Text>

      <Text style={styles.subtitle}>10. Crédits, Sources et Licences :</Text>
      <Text>Licenses des images en provenance de Freepik :</Text>
      <Text style={styles.link} onPress={() => Linking.openURL('http://www.freepik.com')}>Designed by slidesgo / Freepik</Text>
      <Text style={styles.link} onPress={() => Linking.openURL('http://www.freepik.com')}>Designed by stories / Freepik</Text>
      <Text style={styles.link} onPress={() => Linking.openURL('http://www.freepik.com')}>Designed by Freepik</Text>
      <Text style={styles.link} onPress={() => Linking.openURL('http://www.freepik.com')}>Designed by vectorjuice / Freepik</Text>
      <Text style={styles.link} onPress={() => Linking.openURL('http://www.freepik.com')}>Designed by pch.vector / Freepik</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  legalContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  introductionParagraphe: {
    marginBottom: 15,
    fontSize: 16,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default TextMentionsLegales;
