const MyToken = artifacts.require("./MyToken.sol");
const TokenSale = artifacts.require("./TokenSale.sol");

//module.exports = function(deployer) {
module.exports = (deployer) => {
  //deployer.deploy(MyToken);
  //deployer.deploy(TokenSale);
  
  var myToken;
  deployer.deploy(MyToken).then(function(instance) {
	  myToken = instance;
	  deployer.deploy(TokenSale, myToken, 10);
  });
};
