import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { bancoExterno } from './firebaseConnection';
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
      <Text style={{ fontSize: 25 }}>Informação: {nome}, {nome2}</Text>
      <TouchableOpacity style={{ backgroundColor: "#F50" }} onPress={addBancoExterno}>
        <Text style={{ fontSize: 20, paddingHorizontal: 15 }}>Adicionar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: "#AFF" }} onPress={addBancoExterno2}>
        <Text style={{ fontSize: 20, paddingHorizontal: 15 }}>Adicionar</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
