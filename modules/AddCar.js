import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, FAB } from 'react-native-paper';
import AddCarDialog from '../modules/Dialogs/AddCarDialog';
import { web3, factory as factoryInstance } from '../ethereum';
import signTransaction from '../ethereum/getSignedTransaction';

const AddCar = props => {
    const [form, setForm] = React.useState({
        price: '',
        carName: '',
        carType: '',
    });
    const [confirmedForm, setConfirmedForm] = React.useState(false);
    const [showDialog, setShowDialog] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [progressText, setProgressText] = React.useState('');
    const confirmDialog = () => {
        setConfirmedForm(true);

        if (confirmedForm) {
            setShowDialog(true);
        }
    };

    const addCar = async () => {
        setProgressText('Creating transaction');
        setProgress(0.1);
        const tx = await signTransaction(
            factoryInstance._address,
            factoryInstance.methods
                .createRental(form.price, form.carName, form.carType)
                .encodeABI(),
            0,
        );

        setProgressText('Sending transaction');
        setProgress(0.5);

        await submitTransaction(tx);
    };

    const submitTransaction = async tx => {
        web3.eth
            .sendSignedTransaction(tx.rawTransaction)
            .on('error', error => {
                console.log(error);
                setProgress(0);
                setProgressText(JSON.stringify(error));
            })
            .once('confirmation', (confNumb, receipt) => {
                setProgress(1);
                setProgressText('Transaction finished');
                console.log(receipt);

                props.screenProps.fetchRentals();
            });
    };

    return (
        <>
            <TextInput
                disabled={confirmedForm}
                style={styles.input}
                mode={'outlined'}
                label="Price"
                value={form.price}
                onChangeText={text => setForm({ ...form, price: text })}
            />
            <TextInput
                disabled={confirmedForm}
                style={styles.input}
                mode={'outlined'}
                label="Car Type"
                value={form.carType}
                onChangeText={text => setForm({ ...form, carType: text })}
            />
            <TextInput
                disabled={confirmedForm}
                style={styles.input}
                label="Car Name"
                mode={'outlined'}
                value={form.carName}
                onChangeText={text => setForm({ ...form, carName: text })}
            />
            <FAB
                style={styles.fab}
                icon={confirmedForm ? 'upload' : 'check'}
                onPress={() => confirmDialog()}
            />
            <AddCarDialog
                setVisible={setShowDialog}
                visible={showDialog}
                addCar={addCar}
                progress={progress}
                progressText={progressText}
            />
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
