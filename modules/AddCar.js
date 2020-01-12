import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, FAB } from 'react-native-paper';

const AddCar = props => {
    const [form, setForm] = React.useState({
        price: '',
        carName: '',
        carType: '',
    });

    return (
        <>
            <TextInput
                style={styles.input}
                mode={'outlined'}
                label="Price"
                value={form.price}
                onChangeText={text => setForm({ ...form, price: text })}
            />
            <TextInput
                style={styles.input}
                mode={'outlined'}
                label="Car Type"
                value={form.carType}
                onChangeText={text => setForm({ ...form, carType: text })}
            />
            <TextInput
                style={styles.input}
                label="Car Name"
                mode={'outlined'}
                value={form.carName}
                onChangeText={text => setForm({ ...form, carName: text })}
            />
            <FAB style={styles.fab} icon="check" onPress={() => {}} />
        </>
    );
};

export default AddCar;

const styles = StyleSheet.create({
    input: { padding: 10 },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
