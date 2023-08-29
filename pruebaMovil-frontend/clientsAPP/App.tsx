/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Switch,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {styles} from './src/utils/styles_basics';

const BASE_URL = 'http://192.168.1.8:9090';

interface Client {
  Documento: number;
  Nombre: string;
  Apellido1: string;
  Apellido2?: string;
  Dirección: string;
  Teléfono: string;
  CorreoElectrónico: string;
  Ciudad: string;
  CondicionPagoID: number;
  ValorCupo?: number;
  MedioPagoID?: number;
  Estado: number;
  FechaHoraAuditoria: string;
}

const App: React.FC = () => {
  //Codigo para editar

  const [selectedDocument, setSelectedDocument] = useState<number | null>(null);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const openModalEdit = (documento: number) => {
    setSelectedDocument(documento);
    setModalEditVisible(true);
    Alert.alert('Cliente selecionado', documento.toString());
  };

  //Codigo listar y Crear
  const openModal = () => {
    setModalVisible(true);
  };

  const [clients, setClients] = useState<Client[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [newClientData, setNewClientData] = useState({
    Documento: 0,
    Nombre: '',
    Apellido1: '',
    Apellido2: '',
    Dirección: '',
    Teléfono: '',
    CorreoElectrónico: '',
    Ciudad: '',
    CondicionPagoID: 0,
    ValorCupo: 0,
    MedioPagoID: 0,
    Estado: 1,
    FechaHoraAuditoria: '',
  });

  const createNewClient = () => {
    
    axios
      .post(`${BASE_URL}/cliente`, newClientData)
      .then(response => {
        if (response.status === 200) {
          // Si el cliente se creó exitosamente, actualiza la lista de clientes
          Alert.alert('Cliente creado con éxito', response.data.message, [
            {
              text: 'OK',
              onPress: () => {
                fetchClients();
                setModalVisible(false);
                setNewClientData({
                  Documento: 0,
                  Nombre: '',
                  Apellido1: '',
                  Apellido2: '',
                  Dirección: '',
                  Teléfono: '',
                  CorreoElectrónico: '',
                  Ciudad: '',
                  CondicionPagoID: 0,
                  ValorCupo: 0,
                  MedioPagoID: 0,
                  Estado: 1,
                  FechaHoraAuditoria: '',
                });
              },
            },
          ]);
        } else {
          // Si la respuesta tiene una propiedad 'error', muestra el mensaje de error SQL
          if (response.data.error) {
            Alert.alert('Error al crear el cliente', response.data.error);
          } else {
            Alert.alert(
              'Error al crear el cliente',
              'Hubo un problema al crear el cliente. Inténtalo de nuevo.',
            );
          }
        }
      })
      .catch(error => {
        console.error('Error creating new client:', error);
        Alert.alert(
          'Error al crear el cliente',
          'Hubo un problema al crear el cliente. Inténtalo de nuevo.',
        );
      });
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    ///////////////////////////////////////Metodo GET

    axios
      .get(`${BASE_URL}/cliente`)
      .then(response => {
        const data: Client[] = response.data;
        setClients(data);
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Administracion Clientes</Text>
      <TouchableOpacity onPress={openModal} style={styles.addButton}>
        <Text style={styles.addButtonLabel}>Nuevo cliente</Text>
      </TouchableOpacity>
      <FlatList
        data={clients}
        keyExtractor={client => client.Documento.toString()}
        renderItem={({item}) => (
          <TouchableWithoutFeedback
            onPress={() => openModalEdit(item.Documento)}>
            <View style={styles.card}>
              <View style={styles.cardFooter}>
                <Text style={styles.cardTitle}>
                  {item.Nombre} {item.Apellido1}
                </Text>
                <Text style={styles.switchLabel}>Activo</Text>
              </View>
              <Text style={styles.cardText}>{item.CorreoElectrónico}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardText}>Teléfono: {item.Teléfono}</Text>
                <Switch
                  trackColor={{false: 'white', true: 'white'}}
                  thumbColor={item.Estado === 1 ? '#007bff' : '#f4f4f4'}
                  value={item.Estado === 1}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            style={styles.closeModelButton}>
            <Text style={styles.modalText}>X</Text>
          </TouchableOpacity>

          <Text style={styles.modalText}>Crear nuevo cliente</Text>
          {/* -------------------------- LLAMADA METODO POST*/}
          <TouchableOpacity
            onPress={createNewClient}
            style={styles.closeModelButton}>
            <Text style={styles.modalText}>Guardar</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ingrese los datos</Text>

            <TextInput
              style={styles.input}
              placeholder="Documento"
              keyboardType="numeric"
              onChangeText={text =>
                setNewClientData({...newClientData, Documento: parseInt(text)})
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Nombre"
              onChangeText={text =>
                setNewClientData({...newClientData, Nombre: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido1"
              onChangeText={text =>
                setNewClientData({...newClientData, Apellido1: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido2"
              onChangeText={text =>
                setNewClientData({...newClientData, Apellido2: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Direccion"
              onChangeText={text =>
                setNewClientData({...newClientData, Dirección: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Telefono"
              keyboardType="numeric"
              onChangeText={text =>
                setNewClientData({...newClientData, Teléfono: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Correo Electronico"
              onChangeText={text =>
                setNewClientData({...newClientData, CorreoElectrónico: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Ciudad"
              onChangeText={text =>
                setNewClientData({...newClientData, Ciudad: text})
              }
            />
            <Text style={styles.modalText}> Condicion de pago</Text>
            <TextInput
              style={styles.input}
              placeholder="condicion de pago"
              keyboardType="numeric"
              onChangeText={text =>
                setNewClientData({
                  ...newClientData,
                  CondicionPagoID: parseInt(text),
                })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="valor cupo"
              keyboardType="numeric"
              onChangeText={text =>
                setNewClientData({
                  ...newClientData,
                  ValorCupo: parseFloat(text),
                })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="medio pago"
              keyboardType="numeric"
              onChangeText={text =>
                setNewClientData({
                  ...newClientData,
                  MedioPagoID: parseInt(text),
                })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="estado"
              keyboardType="numeric"
              onChangeText={text =>
                setNewClientData({...newClientData, Estado: parseInt(text)})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="estado"
              keyboardType="numeric"
              onChangeText={text =>
                setNewClientData({...newClientData, Estado: parseInt(text)})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="estado"
              keyboardType="numeric"
              onChangeText={text =>
                setNewClientData({...newClientData, Estado: parseInt(text)})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="estado"
              keyboardType="numeric"
              onChangeText={text =>
                setNewClientData({...newClientData, Estado: parseInt(text)})
              }
            />
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default App;
