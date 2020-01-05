const Web3 = require('web3');
const rentalJson = require('./build/Rental.json');
const factoryJson = require('./build/RentalFactory.json');

const web3 = new Web3(
    new Web3.providers.WebsocketProvider(
        'wss://rinkeby.infura.io/ws/v3/b8c90db97bac4732b9d0c16d37ab394f',
    ),
);

const rental = new web3.eth.Contract(
    rentalJson.abi,
    '0x35Ec9779B24d1C78Ab48e8E32B0133E0AF02e1cA',
);

rental.events
    .CarRented({ fromBlock: 0 }, function(error, event) {
        console.log(event);
    })
    .on('connected', function(subscriptionId) {
        console.log(subscriptionId);
    })
    .on('data', function(event) {
        console.log(event); // same results as the optional callback above
    })
    .on('changed', function(event) {
        // remove event from local database
    })
    .on('error', console.error);

const factory = new web3.eth.Contract(
    factoryJson.abi,
    '0x0376c74c41bf6C6D006e4fC116683Bc10bDc03FA',
);

/* function fetchData() {
    factory.methods
        .getDeployedRentals()
        .call()
        .then(addresses => {
            web3.eth
                .subscribe(
                    'logs',
                    {
                        addresses,
                        topics: [
                            '0x9680560a8d0785a460ecdecb08ae62467b15f996ccda1fa916cd9403e32d9aea',
                            '0xf29896915625d363f2e810b175b9f423ab774b73433097765946cd73f327cc7c'
                        ]
                    },
                    function(error, result) {
                        if (!error) {
                            console.log(result);
                        }
                    }
                )
                .on('connected', function(subscriptionId) {
                    console.log(subscriptionId);
                })
                .on('data', function(data) {
                    console.log(data);
                });
        });
}

fetchData(); */
