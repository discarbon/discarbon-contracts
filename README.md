# DisCarbon contracts

Install all dependencies

```npm install```

copy the "env" file to ".env" and fill in the needed Keys.

Fork the polygon mainnet

```hh node```

(need to have hardhat shorthand installed for this: ```npm i -g hardhat-shorthand```)



This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## Running the Test Script

```
npx hardhat compile
node scripts/test-wrapper.js
```

## Helpful Links

Toucan token and contract addresses:
- https://toucan.earth/contracts
- https://test.toucan.earth/contracts
- https://github.com/ToucanProtocol/example-implementations/blob/main/README.md