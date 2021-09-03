import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import {
    categoryList as categoryListAPI
} from '../../services/api';
import {COLORS} from '../../utils/theme';

const CategoriesPicker = ({ title, onSelect, value}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const fetchCategoryList = async () => {
    const response = await categoryListAPI();
    setModalData(response.data.data.category_list);
   // onSelect(response.data.data.category_list.find((item) => item.id === value.id))
  };


  const handleSelect = item => {
    onSelect(item);
    setShowModal(false);
  };

  return (
    <View>
        <Text style={styles.title}>{title}</Text>

      <TouchableOpacity style={styles.input} onPress={() => setShowModal(true)}>
        <Text>{value.category_name}</Text>
      </TouchableOpacity>

      <Modal animationType="fade" visible={showModal} transparent={true}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Pressable
            onPress={() => setShowModal(false)}
            style={{
              height: '100%',
              width: '100%',
              opacity: 0.7,
              backgroundColor: '#333',
              position: 'absolute',
            }}></Pressable>
          <View style={styles.modalCont}>
            <ScrollView>
            <Text onPress={() => handleSelect({category_name: 'All'})} style={styles.h2}>
                  All
                </Text>
              {modalData.map((item, id) => (
                <Text key={id} onPress={() => handleSelect(item)} style={styles.h2}>
                  {item.category_name}
                </Text>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CategoriesPicker;

const styles = StyleSheet.create({
  h1: {
    padding: 10,
  },
  title:{
    fontWeight:'bold',
    fontSize:12,
    marginBottom:5
  },
  modalCont: {
    padding: 10,
    flex: 0.5,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  h1: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  h2: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
    borderBottomColor: '#d1d1d1',
    borderBottomWidth: 1,
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#2BBBA0',
    justifyContent:'center',
    marginBottom:10
  },
});
