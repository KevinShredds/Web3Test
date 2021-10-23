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

  // getAccountAndBalance() {
    
  //   this.getUserBalance().
  //   then((retAccount: any) => {
            
  //     this.accountName = retAccount.account;
  //     this.balance = window.web3.utils.fromWei(retAccount.balance, 'ether') ;

  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }

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
      if (typeof window.web3 !== 'undefined') {
        
        
      } 
      console.log("new WEb3")
      window.web3 = new Web3(window.ethereum);
      console.log(window.web3)
      
      window.web3.eth.requestAccounts();

      console.log("getAccounts from connectWallet")
      window.web3.eth.getAccounts(console.log)
      
      //this.enable = this.enableMetaMaskAccount();
      
      //this.getAccountAndBalance();
    }
  }
  // private async enableMetaMaskAccount(): Promise<any> {
  //   let enable = false;
  //   await new Promise((resolve, reject) => {
  //     enable = window.web3.eth.requestAccounts();      
  //   });
  //   return Promise.resolve(enable);
  // }

  // private async getAccount(): Promise<any> {
    
  //   if (this.account == null) {
  //     this.account = await new Promise((resolve, reject) => {
        
  //       window.web3.eth.getAccounts((err, retAccount) => {
  //         console.log('getAccount: retAccount');
  //         console.log(retAccount);
  //         if (retAccount.length > 0) {
            
  //           this.account = retAccount[0];
            
  //           resolve(this.account);
  //         } else {
  //           alert('getAccount :: no accounts found.');
  //           reject('No accounts found.');
  //         }
  //         if (err != null) {
  //           alert('getAccount :: error retrieving account');
  //           reject('Error retrieving account');
  //         }
  //       });
  //     }) as Promise<any>;
  //   }
  //   return Promise.resolve(this.account);
  // }
  // public async getUserBalance(): Promise<any> {
  //   const account = await this.getAccount();
  //   console.log('getUserBalance :: account');
  //   console.log(account);
  //   return new Promise((resolve, reject) => {
  //     window.web3.eth.getBalance(account, function(err, balance) {
  //       console.log('getUserBalance :: getBalance');
  //       console.log(balance);
  //       if (!err) {
  //         const retVal = {
  //           account: account,
  //           balance: balance
  //         };
  //         console.log('getUserBalance :: getBalance :: retVal');
  //         console.log(retVal);
  //         resolve(retVal);
  //       } else {
  //         reject({account: 'error', balance: 0});
  //       }
  //     });
  //   }) as Promise<any>;
  // }

  
  ngOnInit(): void {

    this.connectWallet();

    


    window.ethereum.on('accountsChanged', (accounts) => {
      console.log('event :: accountsChanged')
      
      this.getAccountAndBalance();

      //this.connectWallet();
    });
  }

}
