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

  public onConnectBtnClick() {
    
  }
  
  constructor() {  }

  
  ngOnInit() {
    
       
  }
  
}