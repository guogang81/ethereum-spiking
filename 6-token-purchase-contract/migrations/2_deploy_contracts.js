const MyToken = artifacts.require("./MyToken.sol");
const TokenPurchase = artifacts.require("./TokenPurchase.sol");

module.exports = function(deployer) {
  // deployer.deploy(MyToken);
  // deployer.deploy(TokenPurchase);
  
  var myToken;
  deployer.deploy(MyToken).then(function(instance) {
	  myToken = instance;
	  deployer.deploy(TokenPurchase, myToken, 10);
  });
};
