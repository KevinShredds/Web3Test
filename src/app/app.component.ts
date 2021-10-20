import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import Web3 from "web3";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngEth';
   
  
  private window: any;
  private address: any;
  
  constructor(@Inject(DOCUMENT) private document: Document)
  {
    this.window = this.document.defaultView;
  }

  public onConnectBtnClick() {
    if (this.window.ethereum) {
      this.window.web3 = new Web3(this.window.ethereum);
      this.window.ethereum.enable();
      //this.address = this.window.web3.getAddress();
      console.log(this.window.web3.eth);

      return true;
    }
  }
  
  ngOnInit() {
    
       
  }
  
}