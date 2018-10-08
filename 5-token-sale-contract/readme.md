# Running instructions
1. Run `npx truffle develop` 
2. Run `npm start`

# My instructions
1. Run `npm install`
2. Run `ganache-cli`
3. Run `truffle migrate`
默认会使用 truffle.js 中的 development 网络。
4. Run `npm start`
5. Open `index.html` and start playing,

# Start playing
1. 用某个地址部署 MyToken，会生成对应的事务（包括：事务哈希、合约地址等）
2. 可以点击事务哈希查看事务的详细信息
3. 持有 MyToken 智能合约地址的账户先卖出一定数量的 MyToken，即填充 Sell 表单信息
4. 点击 Sell 按钮之后出触发两个事务。注意，TokenSale 合约的状态为开放。

    4.1 一个事务是创建智能合约 TokenSale

    4.2 另一个事务是由 Seller 地址向新创建的智能合约 TokenSale地址发送指定数量的 MyToken。

5. 从 TokenSale 合约中购买 MyToken

    5.1 先点击 TokenSale Contracts 下面的 buy 将 TokenSale 合约地址填入 Buy some tokens 的 Contract(address) 表单。

    5.2 再填充购买者的账户地址

6. 点击 Buy 按钮，从 TokenSale 合约中购买 MyToken。注意，这里会全部购买 TokenSale 中的所有 MyToken，且 TokenSale 的状态为关闭。

7. 查看购买事务的详细信息。

8. 可以从第 4 步重新开始。此时，accounts[0] 和 accounts[1] 中都有 MyToken，都可以出售。
