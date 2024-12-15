# Solana Wallet Interaction

This project demonstrates how to interact with the Solana blockchain using the `@solana/web3.js` library. It includes functionalities such as creating a wallet, checking the wallet balance, and requesting an airdrop of SOL tokens.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Solana Devnet](#solana-devnet)
- [Functions](#functions)
  - [getBalance](#getbalance)
  - [airdropSOL](#airdropsol)
- [License](#license)

## Installation

To get started, clone this repository and install the necessary dependencies:

```bash
git clone https://github.com/adityaapraveen/solana-wallet-interaction.git
cd solana-wallet-interaction
npm install
```

## Usage
```bash
solana-test-validator
```
This will run the local solana node for us to generate new keypairs and make local net transations

This project uses the Solana localnet for wallet interactions and airdrops. Simply run the script using Node.js:
```bash
node index.js
```


It will generate a new wallet, display the wallet's public key, check the wallet's balance, and request an airdrop of SOL tokens.

## Solana Devnet

The script connects to the local solana node configuration. This allows for safe and free interaction with Solana's blockchain without using real tokens.

## Functions

### getBalance

This function fetches and logs the wallet's current balance. It fetches the balance from the Solana Devnet and converts it from lamports (the smallest unit of SOL) to SOL.

### airdropSOL

This function requests an airdrop of 2 SOL tokens to the generated wallet. It logs the new balance after the airdrop has been confirmed.


## License

This project is licensed under the MIT License - see the LICENSE file for details.


