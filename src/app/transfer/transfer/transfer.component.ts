import { Component, OnInit } from '@angular/core';


const Web3 = require('web3');

declare let require: any;
declare let window: any;

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  private account: any = null;
  
  private enable: any;


  public user:any;
  public balance = 0;
  public accountName = "Metamask is not connected";


  constructor() { }

  public getAccountAndBalance() {
      console.log("getAccounts from getAccountAndBalance")
      window.web3.eth.getAccounts().then((accounts) => {
        console.log(accounts);
        document.getElementById('accountName').innerHTML = accounts[0];
        window.web3.eth.getBalance(accounts[0]).then((balance) => {
          console.log(balance);
          document.getElementById('balance').innerHTML = balance;
        })
      })
      
  }

  public connectWallet() {
    
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      
      window.web3 = new Web3(window.ethereum);            
      window.web3.eth.requestAccounts();

      this.getAccountAndBalance();
      
    }
  }
  

  ngOnInit(): void {

    this.connectWallet();

    window.ethereum.on('accountsChanged', (accounts) => {
      console.log('event :: accountsChanged')
      this.getAccountAndBalance();

    });
  }

}
