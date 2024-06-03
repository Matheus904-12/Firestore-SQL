import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { bancoExterno } from './firebaseConnection';
import { useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';

export default function App() {
  const [nome, setNome] = useState('Carregando...');
  const [nome2, setNome2] = useState('');
  const [tv, setTv] = useState('');
  const [geladeira, setGeladeira] = useState('');
  const [fogao, setFogao] = useState('');
  const [docId, setDocId] = useState('');

  useEffect(() => {
    async function pegarDados() {
      const referencia = doc(bancoExterno, "aparelhos", "1");

      getDoc(referencia)
        .then((snap) => {
          setNome(snap.data()?.TV); /* Referência para buscar o nome da tv */ 
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
    /* Campos Obrigatórios */
    if (tv === '' || geladeira === '' || fogao === '' || docId === '') {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    /* Pra subir os preenchimentos */
    await setDoc(doc(bancoExterno, "aparelhos", docId), {
      TV: tv,
      Geladeira: geladeira,
      Fogão: fogao
    });

    /* Alert da Confirmação dos preenchimentos */ 
    alert("Produto cadastrado com sucesso!");
    setTv('');
    setGeladeira('');
    setFogao('');
    setDocId('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Informação: {nome}, {nome2}</Text>
      <TextInput
        style={styles.input}
        placeholder="ID do Documento"
        value={docId}
        onChangeText={setDocId}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="TV"
        value={tv}
        onChangeText={setTv}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Geladeira"
        value={geladeira}
        onChangeText={setGeladeira}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Fogão"
        value={fogao}
        onChangeText={setFogao}
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={addBancoExterno}>
        <Text style={styles.buttonText}>Cadastrar Produto</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  infoText: {
    fontSize: 22,
    marginBottom: 20,
    color: '#444',
    textAlign: 'center',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});
