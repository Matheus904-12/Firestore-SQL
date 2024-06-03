import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { bancoExterno } from './fireStoreDB/firebaseConnection';
import { useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot, setDoc, addDoc, collection } from 'firebase/firestore';

export default function App() {
  const [nome, setNome] = useState('Carregando...');
  const [nome2, setNome2] = useState('');

  useEffect(() => {
    async function pegarDados() {
      const referencia = doc(bancoExterno, "aparelhos", "1");

      getDoc(referencia)
        .then((snap) => {
          setNome(snap.data()?.TV);
        })
        .catch((erro) => {
          console.log(erro);
        });

      onSnapshot(doc(bancoExterno, "aparelhos", "1"), (snap) => {
        setNome2(snap.data()?.Geladeira);
      });
    }

    pegarDados();
  }, []);

  async function addBancoExterno() {
    await setDoc(doc(bancoExterno, "aparelhos", "3"), {
      TV: "Sony",
      Geladeira: "Continental",
      Fogão: "Consul"
    });
  }

  async function addBancoExterno2() {
    await addDoc(collection(bancoExterno, "aparelhos"), {
      TV: "AOC",
      Geladeira: "Dako",
      Fogão: "Dako"
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Informação: {nome}, {nome2}</Text>
      <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={addBancoExterno}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={addBancoExterno2}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  infoText: {
    fontSize: 25,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#FF5733',
  },
  buttonSecondary: {
    backgroundColor: '#33CFFF',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});
