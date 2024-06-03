import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { bancoExterno } from './firebaseConnection';
import { useEffect, useState } from 'react';
import { getDocs, addDoc, collection } from 'firebase/firestore';

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ TV: '', Geladeira: '', Fogão: '' });

  useEffect(() => {
    async function pegarProdutos() {
      const querySnapshot = await getDocs(collection(bancoExterno, "aparelhos"));
      const listaProdutos = [];
      querySnapshot.forEach((doc) => {
        listaProdutos.push({ id: doc.id, ...doc.data() });
      });
      setProdutos(listaProdutos);
    }

    pegarProdutos();
  }, []);

  async function addProduto() {
    await addDoc(collection(bancoExterno, "aparelhos"), novoProduto);
    setNovoProduto({ TV: '', Geladeira: '', Fogão: '' });
    pegarProdutos();
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.itemText}>
            TV: {item.TV}, Geladeira: {item.Geladeira}, Fogão: {item.Fogão}
          </Text>
        )}
        style={styles.list}
      />
      <TextInput
        style={styles.input}
        placeholder="TV"
        value={novoProduto.TV}
        onChangeText={(text) => setNovoProduto({ ...novoProduto, TV: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Geladeira"
        value={novoProduto.Geladeira}
        onChangeText={(text) => setNovoProduto({ ...novoProduto, Geladeira: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Fogão"
        value={novoProduto.Fogão}
        onChangeText={(text) => setNovoProduto({ ...novoProduto, Fogão: text })}
      />
      <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={addProduto}>
        <Text style={styles.buttonText}>Adicionar Produto</Text>
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
  list: {
    width: '100%',
    marginBottom: 20,
  },
  itemText: {
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
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
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});
