import $ from 'jquery';
import Web3 from 'web3';

// Instance Web3 using localhost testrpc
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// This is an interface of the MyToken contract, called ABI, that we will interact with it
const myTokenContractABI = require('./build/contracts/MyToken.json').abi;
const MyTokenContract = web3.eth.contract(myTokenContractABI);

// We will use this function to show the status of the deployed token sale contract
const synchSmartContract = () => {
  let contractAddress = $('#contract-address').val();
  let contractInstance = MyTokenContract.at(contractAddress);

  $('#my-token-balances').html("");
  web3.eth.accounts.forEach(address => {
    let tokens = contractInstance.balanceOf.call(address);
    $('#my-token-balances').append(`<p><span class="address">${address}</span> | <span class="balance">Tokens ${tokens}</span></p>`);
  });
};

// We will use this function to show the status of the accounts generated by testRPC
const synchAccounts = () => {
  $('#gas-price').html(`<b>Gas: ETH ${web3.eth.gasPrice}</b>`);
  $('#default-account').html(`<b>Default Account: ${web3.eth.defaultAccount}</b>`);
  $('#accounts').html("");
  web3.eth.accounts.forEach(account => {
    let balance = web3.eth.getBalance(account);
    $('#accounts').append(`<p><a href="#" class="from">from</a> <a href="#" class="to">to</a> <span class="address">${account}</span> | <span class="balance">ETH ${balance}</span></p>`);
  });
};

// This callback just avoids us to copy & past every time you want to use an address
const updateAddressFromLink = (event, inputSelector) => {
  event.preventDefault();
  $(inputSelector).val($(event.target).siblings(".address").text());
};

// Every time we click a transaction we will look for its details into the blockchain
const updateTransactionInfoFromLink = event => {
  event.preventDefault();
  let transactionHash = $(event.target).text();
  web3.eth.getTransaction(transactionHash, function(error, transactionInfo) {
    if(error) $("#errors").text(error);
    else {
      $("#transaction-info").find("#hash").text(transactionInfo.hash);
      $("#transaction-info").find("#nonce").text(transactionInfo.nonce);
      $("#transaction-info").find("#block-hash").text(transactionInfo.blockHash);
      $("#transaction-info").find("#block-number").text(transactionInfo.blockNumber);
      $("#transaction-info").find("#gas-usage").text(transactionInfo.gas);
      $("#transaction-info").find("#transaction-index").text(transactionInfo.transactionIndex);
      $("#transaction-info").find("#from").text(transactionInfo.from);
      $("#transaction-info").find("#to").text(transactionInfo.to);
      $("#transaction-info").find("#value").text(transactionInfo.value);
    }
  });
};

// Show initial accounts state and initialize callback triggers
synchAccounts();
$(document).on('change', '#contract-address', e => synchSmartContract());
$(document).on('click', '.from', e => updateAddressFromLink(e, '#sender-address'));
$(document).on('click', '.to', e => updateAddressFromLink(e, '#recipient-address'));
$(document).on('click', '.transaction', e => updateTransactionInfoFromLink(e));

// Every time we click the send button, we will
$('#send').click(() => {
  let sendingAmount = $('#sending-amount').val();
  let recipientAddress = $('#recipient-address').val();
  let senderAddress = $('#sender-address').val();
  let contractAddress = $('#contract-address').val();

  let contractInstance = MyTokenContract.at(contractAddress);
  let transactionHash = contractInstance.transfer(recipientAddress, sendingAmount, { from: senderAddress });
  $("#transaction-hash").text(`Tx Hash: ${transactionHash}`);
  $('#transactions-list').append(`<p><a href="#" class="transaction">${transactionHash}</a></p>`);
  synchSmartContract();
  synchAccounts();
});
