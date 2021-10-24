import { Component, OnInit } from '@angular/core';

const Web3 = require('web3');

//declare let require: any;
declare let window: any;

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
 
  public user:any;
  public balance: number = 0;
  public accountName: string = "Metamask is not connected";
  public connectedNetwork = "";

  public isConnected: boolean = false;


  constructor() { }

  public getAccountAndBalance(): void {
    window.web3.eth.getAccounts().then((accounts) => {        
      document.getElementById('accountName').innerHTML = accounts[0];
      window.web3.eth.getBalance(accounts[0]).then(balance => {         
        document.getElementById('balance').innerHTML = balance;
        document.getElementById('network').innerHTML = this.getChainName(window.ethereum.chainId);
        document.getElementById('isconnected').innerHTML = this.isConnected.toString();
      })
    })  
  }

  public disconnectWallet() {
    this.isConnected = false;
    document.getElementById('container').style.display = 'none';
    document.getElementById('isconnected').innerHTML = this.isConnected.toString();
  }

  public connectWallet(): void {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {    
      window.web3 = new Web3(window.ethereum);            
      window.web3.eth.requestAccounts();
      
      document.getElementById('container').style.display = 'block';
      
      this.getAccountAndBalance(); 
      this.isConnected = true;
    }
  }

  public getChainName(chainId: string): string {
    switch (chainId) {
      case "0x1":
        return "Ethereum Mainnet";
        break;

      case "0x3":
        return "Ropsten Testnet"
        break;

      case "0x2a":
        return "Kovan Testnet"
        break;

      case "0x4":
        return "Rinkeby Testnet"
        break;
      
      case "0x5":
        return "Goerli Testnet"
        break;
      
      case "0x89":
        return "Matic Network"
        break;

      case "0x61":
        return "Binance Smart Chain Testnet"
        break;

        case "0x38":
          return "Binance Smart Chain"
          break;
        
      default:
        return "Unknown Network"
        break;
    }
  }
  

  ngOnInit(): void {
    this.connectWallet();

    window.ethereum.on('accountsChanged', (accounts) => {
      console.log('event :: accountsChanged');
      
      if (accounts[0] == undefined || this.isConnected == false) {
        console.log("account disconnected")
        this.isConnected = false;
        document.getElementById('isconnected').innerHTML = this.isConnected.toString();
        document.getElementById('container').style.display = 'none';
        
      } else {
        document.getElementById('container').style.display = 'block';
        this.getAccountAndBalance();
      }   
    });

    window.ethereum.on('chainChanged', (chainId) => {
      console.log('event :: chainChanged');
      //this.getAccountAndBalance();
      window.location.reload();
    });

  }

}
