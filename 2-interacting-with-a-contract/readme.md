# Deploying instructions
1. Run `npm install`
2. Run `testrpc`
3. Open node console and run:
```js
Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
const solidityCompiler = require('solc')
myTokenCode = fs.readFileSync('MyToken.sol').toString()
compiledCode = solidityCompiler.compile(myTokenCode)
myTokenABI = JSON.parse(compiledCode.contracts[':MyToken'].interface)
MyTokenContract = web3.eth.contract(myTokenABI)
myTokenByteCode = compiledCode.contracts[':MyToken'].bytecode
deployedContract = MyTokenContract.new({data: myTokenByteCode, from: web3.eth.accounts[0], gas: 999999})
deployedContract.address //you will need this address later  
```

# Running instructions
1. Run `npm start`
2. Open `index.html` and start playing

# My instructions
1. Run `npm install`
2. Run `ganache-cli`
3. Open node console and run:
```js
Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
const solidityCompiler = require('solc')
myTokenCode = fs.readFileSync('MyToken.sol').toString()
compiledCode = solidityCompiler.compile(myTokenCode)
myTokenABI = JSON.parse(compiledCode.contracts[':MyToken'].interface)
MyTokenContract = web3.eth.contract(myTokenABI)
myTokenByteCode = compiledCode.contracts[':MyToken'].bytecode
deployedContract = MyTokenContract.new({data: myTokenByteCode, from: web3.eth.accounts[0], gas: 999999})
deployedContract.address //you will need this address later  
```

可能需要一行一行的拷贝代码到 node 控制台中。即在 cmd 或 shell 中运行 node。得到的合约地址为
```
'0xe61df3e0a7bfba14f2b517e4ce468567340b1b02'
```

4. Run `npm start`
5. Open `index.html` and start playing
