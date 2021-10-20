pragma solidity ^0.4.6;

contract UserCrud {

  struct UserStruct {
    string coinString;
    uint index;
  }
  
  mapping(address => UserStruct) private userStructs;
  address[] private userIndex;

  event LogNewUser   (address indexed userAddress, uint index, string coinString);
  event LogUpdateUser(address indexed userAddress, uint index, string coinString);
  
  
  function isUser(address userAddress) public constant returns(bool isIndeed) {
    if(userIndex.length == 0) return false;
    
    return (userIndex[userStructs[userAddress].index] == userAddress);
  }


  function insertUser(address userAddress, string coinString) public returns(uint index) {
    if(isUser(userAddress)) throw; 
    userStructs[userAddress].coinString = coinString;
    userStructs[userAddress].index = userIndex.push(userAddress)-1;
    LogNewUser(
        userAddress, 
        userStructs[userAddress].index, 
        coinString);
        
    return userIndex.length-1;
  }
  
  
  function getUser(address userAddress) public constant returns(string coinString, uint index) {
    if(!isUser(userAddress)) throw; 
    
    return(
      userStructs[userAddress].coinString, 
      userStructs[userAddress].index );
  } 
  
  
  function updateUsercoinString(address userAddress, string coinString) public returns(bool success) {
    if(!isUser(userAddress)) throw; 
    userStructs[userAddress].coinString  = coinString;
    LogUpdateUser(
      userAddress, 
      userStructs[userAddress].index,
      coinString);
      
    return true;
  }


  function getUserCount() public constant returns(uint count) {
    return userIndex.length;
  }


  function getUserAtIndex(uint index) public constant returns(address userAddress) {
    return userIndex[index];
  }


}