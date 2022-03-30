import React, {useState, useEffect} from 'react';
import {StyleSheet, ActivityIndicator, View, ScrollView} from 'react-native';
import ServiceCard from './../components/cards/ServiceCard';
import {categoryWiseServices as categoryWiseServicesAPI} from './../services/api';
import CategoriesPicker from './../components/picker/CategoriesPicker';
import {COLORS} from './../utils/theme';
import EStyleSheet from 'react-native-extended-stylesheet';
import {FlatList} from 'react-native-gesture-handler';
import RootScreen from '../components/molecules/rootScreen/RootScreen';
import CustomHeader from '../components/molecules/header/CustomHeader';
import NoResultFound from '../components/molecules/NoResultFound';
import Loader from '../components/atoms/Loader';

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
    console.log(response);
    if (response.data.response.response_code == 200) {
      setServiceListData(response.data.data.service_list);
    }
    setLoading(false);
  };

  const _handleRenderItem = ({item}) => (
    <ServiceCard
      service_id={item.service_id}
      service_title={item.service_title}
      ratings={item.ratings}
      location={item.location}
      currency={item.currency}
      image={item.service_image}
      service_amount={item.service_amount}
    />
  );

  const _handleEmptyComponentRender = () =>
    loading ? <Loader /> : <NoResultFound />;

  const _handleRenderFooter = () => (
    <>{loading && serviceListData.length !== 0 ? <Loader /> : null}</>
  );
  return (
    <RootScreen headerComponent={() => <CustomHeader title={'Services'} />}>
      <FlatList
        data={serviceListData}
        renderItem={_handleRenderItem}
        ListEmptyComponent={_handleEmptyComponentRender}
        ListFooterComponent={_handleRenderFooter}
        contentContainerStyle={styles.flexBoxContainer}
        keyExtractor={item => item.id}
      />
    </RootScreen>
  );
};

export default ServicesList;

const styles = EStyleSheet.create({
  flexBoxContainer: {
    padding: 10,
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
});
