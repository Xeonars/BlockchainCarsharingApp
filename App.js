import './global';
import './fixtimer';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import AvaibleCars from './modules/AvaibleCars';
import MyAccount from './modules/MyAccount';
import MyRents from './modules/MyRents';
import AddCar from './modules/AddCar';
import { factory, rental } from './ethereum';
import { createStackNavigator } from 'react-navigation-stack';
import CarDetails from './modules/CarDetails';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            avaibleRentals: [],
            rentedRentals: [],
            loading: true,
        };
    }

    fetchRentals = async () => {
        this.setState({
            laoding: true,
        });

        const rentalList = await factory.methods.getDeployedRentals().call();

        const rentalPromises = rentalList.map((el, i) => {
            const response = rental(rentalList[i])
                .methods.getSummary()
                .call();
            return response;
        });

        const allRentals = await Promise.all(rentalPromises);

        let avaibleRentals = [];
        let rentedRentals = [];

        allRentals.forEach(el => {
            if (el[4]) {
                rentedRentals.push(el);
            } else {
                avaibleRentals.push(el);
            }
        });

        this.setState({
            loading: false,
            avaibleRentals,
            rentedRentals,
        });
    };

    componentDidMount() {
        this.fetchRentals();
    }

    render() {
        if (this.state.loading) {
            return <View styles={styles.view} />;
        } else {
            return (
                <AppContainer
                    screenProps={{
                        avaibleRentals: this.state.avaibleRentals,
                        rentedRentals: this.state.rentedRentals,
                        fetchRentals: this.fetchRentals,
                    }}
                />
            );
        }
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        justifyContent: 'center',
    },
});

const Cars = props => AvaibleCars(props);
const Account = props => MyAccount(props);
const Rents = props => MyRents(props);
const Add = props => AddCar(props);

const AvaibleCarsStack = createStackNavigator({
    AvaibleCars: {
        screen: Cars,
        navigationOptions: ({ navigation }) => {
            return {
                header: (
                    <Appbar.Header>
                        <Appbar.Content title={'Avaible Cars'} />
                        <Appbar.Action
                            icon={'plus'}
                            size={24}
                            onPress={() =>
                                navigation.navigate({
                                    routeName: 'AddCar',
                                })
                            }
                        />
                    </Appbar.Header>
                ),
            };
        },
    },
    CarDetails: {
        screen: CarDetails,
        navigationOptions: ({ navigation }) => {
            return {
                header: (
                    <Appbar.Header>
                        <Appbar.BackAction
                            onPress={() => navigation.goBack()}
                        />
                        <Appbar.Content title={'Details'} />
                    </Appbar.Header>
                ),
            };
        },
    },
    AddCar: {
        screen: Add,
        navigationOptions: ({ navigation }) => {
            return {
                header: (
                    <Appbar.Header>
                        <Appbar.BackAction
                            onPress={() => navigation.goBack()}
                        />
                        <Appbar.Content title={'Add Car'} />
                    </Appbar.Header>
                ),
            };
        },
    },
});

const RentedCarsStack = createStackNavigator({
    MyCars: {
        screen: Rents,
        navigationOptions: ({ navigation }) => {
            return {
                header: (
                    <Appbar.Header>
                        <Appbar.Content title={'My Rentals'} />
                    </Appbar.Header>
                ),
            };
        },
    },
    CarDetails: CarDetails,
});

const MyAccountStack = createStackNavigator({
    Account: {
        screen: Account,
        navigationOptions: ({ navigation }) => {
            return {
                header: (
                    <Appbar.Header>
                        <Appbar.Content title={'My Account'} />
                    </Appbar.Header>
                ),
            };
        },
    },
});

const AppNavigator = createMaterialBottomTabNavigator(
    {
        AvaibleCars: {
            screen: AvaibleCarsStack,
            navigationOptions: {
                title: 'Avaible Cars',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name={'md-home'} color={tintColor} size={24} />
                ),
            },
        },
        MyRents: {
            screen: RentedCarsStack,
            navigationOptions: {
                title: 'My Rentals',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name={'md-car'} color={tintColor} size={24} />
                ),
            },
        },
        Account: {
            screen: MyAccountStack,
            navigationOptions: {
                title: 'My Account',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name={'md-wallet'} color={tintColor} size={24} />
                ),
            },
        },
    },
    {
        initialRouteName: 'AvaibleCars',
        activeColor: 'white',
        inactiveColor: 'black',
        barStyle: { backgroundColor: '#1e88e5' },
    },
);

const AppContainer = createAppContainer(AppNavigator);
