import web3 from './web3';
import { PRIV_KEY } from 'react-native-dotenv';

const privKey = PRIV_KEY;

const signTransaction = async (to, data, value) => {
    const account = web3.eth.accounts.privateKeyToAccount(privKey);

    const tx = account
        .signTransaction({
            to: to,
            gas: 2000000,
            value: value,
            data: data,
        })
        .then(signedTx => {
            return signedTx;
        });

    return tx;
};

export default signTransaction;
