import React from 'react';
import { SafeAreaView, FlatList, RefreshControl } from 'react-native';
import RentedCarCard from './Cards/RentedCarCard';

const MyRents = props => {
  const [rentals, setRentals] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setRentals(props.screenProps.rentedRentals);
  }, [props.screenProps.rentedRentals]);

  const fetchRentals = async () => {
    setLoading(true);
    props.screenProps.fetchRentals();
    setLoading(false);
  };

  const viewDetail = rental => {
    props.navigation.navigate('CarDetails', { rental });
  };

  return (
    <SafeAreaView>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchRentals} />
        }
        data={rentals}
        keyExtractor={el => el[0]}
        renderItem={el => (
          <RentedCarCard
            rental={el}
            fetchRentals={() => fetchRentals()}
            viewDetail={() => viewDetail(el)}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default MyRents;
