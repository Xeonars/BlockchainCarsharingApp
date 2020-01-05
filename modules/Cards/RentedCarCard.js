import * as React from 'react';
import { Button, Card } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import DefaultCar from '../../static/images/DefaultCar.png';
import ReturnDialog from '../Dialogs/ReturnDialog';
import { web3, rental as rentalInstance } from '../../ethereum';
import signTransaction from '../../ethereum/getSignedTransaction';

const styles = StyleSheet.create({
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    card: { padding: 20, marginVertical: 8, marginHorizontal: 16 },
});

const RentedCarCard = props => {
    const rental = props.rental.item;
    const [visible, setVisible] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [progressText, setProgressText] = React.useState('');

    const returnCar = async () => {
        const tx = await signTransaction(
            rental[0],
            rentalInstance(rental[0])
                .methods.endRent()
                .encodeABI(),
            0,
        );

        await submitTransaction(tx);
    };

    const submitTransaction = async tx => {
        web3.eth
            .sendSignedTransaction(tx.rawTransaction)
            .on('error', error => {
                console.log(error);
            })
            .once('confirmation', (confNumb, receipt) => {
                console.log(receipt);
            });
    };

    return (
        <React.Fragment>
            <Card style={styles.card}>
                <Card.Title title="Card Title" subtitle={rental[0]} />
                <Card.Cover source={DefaultCar} />
                <Card.Actions style={styles.buttons}>
                    <Button onPress={() => props.viewDetail()}>View</Button>
                    <Button onPress={() => setVisible(true)}>Return</Button>
                </Card.Actions>
            </Card>
            <ReturnDialog
                visible={visible}
                setVisible={setVisible}
                returnCar={returnCar}
                progress={progress}
                progressText={progressText}
            />
        </React.Fragment>
    );
};

export default RentedCarCard;
