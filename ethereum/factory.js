import web3 from './web3';
import RentalFactory from './build/RentalFactory.json';

const instance = new web3.eth.Contract(
    RentalFactory.abi,
    '0xAb2E834F1824C96271e4df109Be59Cdf1A9ffffB', //address from the factory
);
export default instance;
