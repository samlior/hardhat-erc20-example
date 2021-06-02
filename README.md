# hardhat-erc20-example

![Node Version](https://img.shields.io/badge/node-%e2%89%a5v12.0.0-blue)
![NPM Version](https://img.shields.io/badge/npm-%E2%89%A5v6.0.0-blue)
![OpenZeppelin](https://img.shields.io/badge/OpenZeppelin-3.2.0-blue)

## Environment variable

```sh
# the api key of infura(if you want to connect mainnet or ethereum testnet, you must provide this key).
export INFURA_API_KEY=xxx
# the mnemonic of deployer(if not provided, the deployer will be the first account of the default accouts).
export MNEMONIC="test test test test test test test test test test test junk"
# deployer address, it should match the mnemonic
export DEV_ADDR=0x...abc
# etherscan api key, used to verify and publish the contracts
export ETHERSCAN_KEY=xxx
```

## Install

```
npm i
```

## Compile

```
npm run build
```

## Deploy

### Deploy to mainnet

```
npm run deploy:mainnet
```

### Deploy to localhost

```
npm run node
```

## Tasks

```
accounts              Prints the list of accounts
balance               Prints an account's balance
balance:erc20         Prints an account's ERC20 balance
mint                  Mint ERC20 token to account
verify                Verifies contract on Etherscan
```

You can get detailed options of the task like this:

```
npx hardhat allow --help
```

You can simply run the task like this:

```
npx hardhat --network localhost balance --account 0x...abc
npx hardhat --network localhost mint --account 0x...abc
```

## Verify

**notice: please first make sure you can access [api.etherscan.io](https://api.etherscan.io)**

```
npx hardhat verify --network mainnet 0x...abc "LV Coin" "LV" "18"
```

## LICENSE

[MIT](https://opensource.org/licenses/MIT)
