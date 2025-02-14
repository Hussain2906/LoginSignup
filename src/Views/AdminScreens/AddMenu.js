import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {ThameFont} from '../../Constants/theme';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const AddMenu = () => {
  const navigation = useNavigation();
  const [roti, setRoti] = useState('');
  const [meethaas, setMeethaas] = useState('');
  const [tarkari, setTarkari] = useState('');
  const [vegies, setVegies] = useState('');
  const [rice, setRice] = useState('');
  const [thaliBy, setThaliBy] = useState('');
  const [day, setDay] = useState(''); // New state for the day
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!roti || !meethaas || !tarkari || !rice || !thaliBy || !day) {
      Alert.alert('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      // Add new data to Firestore with the day field
      await firestore().collection('ThaaliMenu').doc(day).set({
        Roti: roti,
        Meethaas: meethaas,
        Tarkari: tarkari,
        Vegetable: vegies,
        Rice: rice,
        Thali_By: thaliBy,
        Day: day, // Include the day field
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      setLoading(false);
      navigation.navigate('AdminStack');
      Alert.alert('Success', 'Menu added successfully!');
      // Reset form
      setRoti('');
      setMeethaas('');
      setTarkari('');
      setVegies('');
      setRice('');
      setThaliBy('');
      setDay(''); // Reset day to default
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to submit form: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container1} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Add Menu</Text>
        <Text style={styles.label}>Roti / Naan</Text>
        <TextInput style={styles.input} value={roti} onChangeText={setRoti} fontFamily={ThameFont.PrimaryMeduim}
          fontSize={16} />
        <Text style={styles.label}>Meethaas</Text>
        <TextInput
          style={styles.input}
          value={meethaas}
          onChangeText={setMeethaas}
          fontFamily={ThameFont.PrimaryMeduim}
          fontSize={16}
        />
        <Text style={styles.label}>Vegetable/ Sabji</Text>
        <TextInput
          style={styles.input}
          value={vegies}
          onChangeText={setVegies}
          fontFamily={ThameFont.PrimaryMeduim}
          fontSize={16}
        />
        <Text style={styles.label}>Tarkari / Dal</Text>
        <TextInput
          style={styles.input}
          value={tarkari}
          onChangeText={setTarkari}
          fontFamily={ThameFont.PrimaryMeduim}
          fontSize={16}
        />
        <Text style={styles.label}>Rice</Text>
        <TextInput style={styles.input} value={rice} onChangeText={setRice} fontFamily={ThameFont.PrimaryMeduim}
          fontSize={16} />
        <Text style={styles.label}>Today's Thaali by?</Text>
        <TextInput
          style={styles.input}
          value={thaliBy}
          onChangeText={setThaliBy}
          fontFamily={ThameFont.PrimaryMeduim}
          fontSize={16}
        />
        {/* New day selection input */}
        <Text style={styles.label}>Select Day</Text>
        <TextInput
          style={styles.input}
          value={day}
          onChangeText={setDay} // Optionally use a picker instead
          fontFamily={ThameFont.PrimaryMeduim}
          fontSize={16}
        />

        <Button title="Submit" onPress={handleSubmit} color="#153448" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    padding: 20,
    backgroundColor: '#fff', // pastel background
  },
  container1: {
    marginVertical: '17%',
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: ThameFont.PrimaryExtraBold,
    color:'#153448'
  },
  label: {
    fontSize: 18,
    fontFamily: ThameFont.PrimaryMeduim,
    color: '#001F3F', // dark text color
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#001F3F', // border color
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#DFF2EB', // input background
    color: '#001F3F', // input text color
  },
});
