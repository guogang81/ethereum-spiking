const MyToken = artifacts.require("./MyToken.sol");
const TokenSale = artifacts.require("./TokenSale.sol");
const TokenPurchase = artifacts.require("./TokenPurchase.sol");

module.exports = function(deployer) {
  // deployer.deploy(MyToken);
  // deployer.deploy(TokenSale);
  // deployer.deploy(TokenPurchase);
  
  var myToken;
  deployer.deploy(MyToken).then(function(instance) {
	  myToken = instance;
	  deployer.deploy(TokenSale, myToken, 10);
	  deployer.deploy(TokenPurchase, myToken, 10);
  });
};
