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
import EStyleSheet from 'react-native-extended-stylesheet';

const picker = ({title, onSelect, value, data}) => {
  const [showModal, setShowModal] = useState(false);



  const handleSelect = item => {
    onSelect(item);
    setShowModal(false);
  };

  return (
  
    <View>
          
      <Text style={styles.title}>{title}</Text>
      {value.id === 0 ? (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowModal(true)}>
          <Text style={{color: '#a1a1a1'}}>Please select</Text>
        </TouchableOpacity>
      ) : (
        <View>
        {console.log(value.value)}
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowModal(true)}>
          <Text style={styles.name}>{value.value}</Text>
        </TouchableOpacity>
        </View>
      )}

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
              <Text
                onPress={() => handleSelect({id:0, value:''})}
                style={{...styles.h2, color: '#a1a1a1'}}>
                Please select
              </Text>
              {data.map((item, id) => (
                <Text
                  key={id}
                  onPress={() => handleSelect(item)}
                  style={styles.h2}>
                  {item.value}
                </Text>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default picker;

const styles = EStyleSheet.create({
  h1: {
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
    color: '$TEXT'
  },
  name: {
    color: 'white',
  },
  modalCont: {
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: '$GRAY_DARK',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '$ALPHA_PRIMARY',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  h1: {
    color: '$TEXT',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  h2: {
    color: '$TEXT',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
    borderBottomColor: '$ALPHA_TEXT',
    borderBottomWidth: 1,
    backgroundColor: '$CARD_BACKGROUND'
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '$PRIMARY',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
