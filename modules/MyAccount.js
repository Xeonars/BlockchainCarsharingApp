import React from 'react';
import { web3 } from '../ethereum';
import { StyleSheet, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { PRIV_KEY } from 'react-native-dotenv';

const MyAccount = () => {
    const [account, setAccount] = React.useState({ address: '', balance: '' });

    React.useEffect(() => {
        const fetchAccount = async () => {
            const privKey = PRIV_KEY;

            const myAccount = web3.eth.accounts.privateKeyToAccount(privKey);

            const balance = web3.utils
                .fromWei(await web3.eth.getBalance(myAccount.address))
                .slice(0, 5);

            setAccount({ address: myAccount.address, balance });
        };

        fetchAccount();
    }, []);

    return (
        <React.Fragment>
            <Card style={styles.card}>
                <Card.Title
                    title="My Account"
                    subtitle={'Rinkeby Testnetwork'}
                />
                <Card.Content>
                    <Title style={styles.title}>My address:</Title>
                    <Paragraph>{account.address}</Paragraph>
                    <Title style={styles.title}>My balance:</Title>
                    <Paragraph>{account.balance} eth</Paragraph>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Title title="History" subtitle={'My rent history'} />
                <Card.Content>
                    <Text>My History</Text>
                </Card.Content>
            </Card>
        </React.Fragment>
    );
};

export default MyAccount;

const styles = StyleSheet.create({
    card: { padding: 20, marginVertical: 8, marginHorizontal: 16 },
    title: {
        fontSize: 16,
    },
});
