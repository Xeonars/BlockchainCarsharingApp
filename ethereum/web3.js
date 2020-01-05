import Web3 from 'web3';

const web3 = new Web3(
    new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/b8c90db97bac4732b9d0c16d37ab394f',
    ),
);

export default web3;
