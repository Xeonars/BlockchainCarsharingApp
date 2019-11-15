import * as React from 'react';
import { Button, Card } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import DefaultCar from '../../static/images/DefaultCar.png';
import RentDialog from '../Dialogs/RentDialog';
import { web3, rental as rentalInstance } from '../../ethereum';
import signTransaction from '../../ethereum/getSignedTransaction';
import { storageRef } from '../firebase/firebase';

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  card: { padding: 20, marginVertical: 8, marginHorizontal: 16 },
});

const AvaibleCarCard = props => {
  const rental = props.rental.item;
  const [visible, setVisible] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [progressText, setProgressText] = React.useState('');
  const [carImage, setCarImage] = React.useState(DefaultCar);

  React.useEffect(() => {
    const fetchImage = async () => {
      await storageRef
        .ref(`images/${rental[0]}.jpeg`)
        .getDownloadURL()
        .then(url => {
          setCarImage({ uri: url });
        });
    };

    fetchImage();
  }, [rental]);

  const rent = async () => {
    setProgressText('Creating transaction');
    setProgress(0.1);

    const tx = await signTransaction(
      rental[0],
      rentalInstance(rental[0])
        .methods.rent()
        .encodeABI(),
      14,
    );

    setProgressText('Sending transaction');
    setProgress(0.5);

    await submitTransaction(tx);
  };

  const submitTransaction = async tx => {
    web3.eth
      .sendSignedTransaction(tx.rawTransaction)
      .on('error', error => {
        setProgress(0);
        setProgressText(JSON.stringify(error));
      })
      .once('confirmation', (confNumb, receipt) => {
        setProgress(1);
        setProgressText('Transaction finished');

        props.fetchRentals();
      });
  };

  return (
    <React.Fragment>
      <Card style={styles.card}>
        <Card.Title title="Card Title" subtitle={rental[0]} />
        <Card.Cover source={carImage} />
        <Card.Actions style={styles.buttons}>
          <Button styles={'secondary'} onPress={() => props.viewDetail()}>
            View
          </Button>
          <Button onPress={() => setVisible(true)}>Rent</Button>
        </Card.Actions>
      </Card>
      <RentDialog
        visible={visible}
        setVisible={setVisible}
        rent={rent}
        price={rental[3]}
        progress={progress}
        progressText={progressText}
      />
    </React.Fragment>
  );
};

export default AvaibleCarCard;
