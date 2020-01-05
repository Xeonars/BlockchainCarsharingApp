import web3 from './web3';
import RentalFactory from './build/RentalFactory.json';

const instance = new web3.eth.Contract(
    RentalFactory.abi,
    '0x0376c74c41bf6C6D006e4fC116683Bc10bDc03FA', //address from the factory
);
export default instance;
