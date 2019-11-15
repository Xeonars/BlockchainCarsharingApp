pragma solidity ^0.5.11;

contract RentalFactory{
    Rental[] public deployedRentals;
    function createRental (uint price, string memory carName, string memory carType) public {
        Rental newRental = new Rental(msg.sender, price, carName, carType);
        deployedRentals.push(newRental);
    }

    function getDeployedRentals () public view returns (Rental[] memory){
        return deployedRentals;
    }
}

contract Rental {
    address public owner;
    address public currentTenant;
    uint public price;
    bool public rented;
    string public carName;
    string public carType;

    constructor(address _owner, uint _price, string memory _carName, string memory _carType) public {
        owner = _owner;
        price = _price;
        carName = _carName;
        carType = _carType;
    }

    function rent() public payable {
        require(msg.value > price, "Amount is too low.");
        currentTenant = msg.sender;
        rented = true;

        emit CarRented(msg.sender);
    }
    function endRent() public {
        require(currentTenant == msg.sender, "Sender not authorized.");
        currentTenant = address(0);
        rented = false;

        emit CarReturned(msg.sender);
    }

    function getSummary() public view returns ( address, address, address, uint, bool, uint, string memory, string memory) {
        return (
            address(this),
            owner,
            currentTenant,
            price,
            rented,
            address(this).balance,
            carName,
            carType
        );
    }

    event CarRented(
        address from
    );

    event CarReturned(
        address _from
    );
}
