import React from 'react';
import { View, StyleSheet, RefreshControl, Text } from 'react-native';
import AvaibleCarCard from './Cards/AvaibleCarCard';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';

const AvaibleCars = props => {
  const [rentals, setRentals] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setRentals(props.screenProps.avaibleRentals);
  }, [props.screenProps.avaibleRentals]);

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
      <View style={styles.container}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchRentals} />
          }
          data={rentals}
          keyExtractor={el => el[0]}
          renderItem={el => (
            <AvaibleCarCard
              rental={el}
              fetchRentals={() => fetchRentals()}
              viewDetail={() => viewDetail(el)}
            />
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyList}>
              <Text>No avaible Cars :(</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default AvaibleCars;

const styles = StyleSheet.create({
  emptyList: {
    minHeight: 400,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
