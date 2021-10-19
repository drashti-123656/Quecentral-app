import React, {useState, useEffect} from 'react';
import {StyleSheet, ActivityIndicator, View, ScrollView} from 'react-native';
import ServiceCard from './../components/cards/ServiceCard';
import {categoryWiseServices as categoryWiseServicesAPI} from './../services/api';
import CategoriesPicker from './../components/picker/CategoriesPicker';
import {COLORS} from './../utils/theme';

const ServicesList = props => {
  const {categoryID} = props.route.params;

  const [serviceListData, setServiceListData] = useState([]);
  const [loading, setLoading] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    let formData = new URLSearchParams({
      category: categoryID,
    });
    const response = await categoryWiseServicesAPI(formData);
    console.log(response)
    if(response.data.response.response_code == 200 ){
    setServiceListData(response.data.data.service_list);
  }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator color={COLORS.PRIMARY} size={'large'} />
        </View>
      ) : (
        serviceListData.map((item, id) => (
          <ServiceCard
            key={id}
            service_id={item.service_id}
            service_title={item.service_title}
            ratings={item.ratings}
            location={item.location}
            mobileno={item.mobileno}
            currency={item.currency}
            image={item.service_image}
            service_amount={item.service_amount}
          />
        ))
      )}
    </ScrollView>
  );
};

export default ServicesList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexGrow: 1,
  },
});
