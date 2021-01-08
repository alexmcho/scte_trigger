import { Component, Injectable, Input, OnInit } from '@angular/core';

import { KeyNumber } from "../key-value";
import { KeyString } from "../key-value";
import { KeyBool } from "../key-value"
import { KeyStringArray } from "../key-value";
import { KeyNumberArray } from "../key-value"
import { KeyObject } from "../key-value";
import { LoadJsonService } from '../load-json.service';
import { LocalBreak } from "../template_definitions";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NetworkNamesService } from '../network-names.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { asWindowsPath } from '@angular-devkit/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

@Injectable()
export class DashboardComponent implements OnInit {
  public config: KeyObject;
  public existingTemplates = <string[]>[];
  closeResult = ''; 
  networks:String;
  input_field: String = "";
  public input: String;

  recipient_emails: String;
  frequency: String;
  network_id: String;
  local_break: String;
  expected_splices_hour: String;
  validate_splice_count: String;
  local_break_start: String;
  splice_command_type: String;
  action: String;
  input_trigger: String;
  splice_event_id: String;
  out_of_network_indicator: String;
  duration_flag: String;
  splice_immediate_flag: String;
  break_auto_return: String;
  break_duration_min: String;
  break_duration_max: String;
  output_trigger: String;
  local_break_end: String;
  break_duration_deviation_tolerance: String;

  // recipient_emails: string;
  // frequency: string;
  // network_id: string;
  // local_break: string;
  // expected_splices_hour: string;
  // validate_splice_count: string;
  // local_break_start: string;
  // splice_command_type: string;
  // action: string;
  // input_trigger: string;
  // splice_event_id: string;
  // out_of_network_indicator: string;
  // duration_flag: string;
  // splice_immediate_flag: string;
  // break_auto_return: string;
  // break_duration_min: string;
  // break_duration_max: string;
  // output_trigger: string;
  // local_break_end: string;
  // break_duration_deviation_tolerance: string;
  


  constructor(private LoadJsonService: LoadJsonService, private modalService: NgbModal, private httpClient:HttpClient, private NetworkNamesService: NetworkNamesService) {
    let url = "http://127.0.0.1:8000/get/"+this.NetworkNamesService.getName();
    //let url = "/assets/config.json"
      this.LoadJsonService.getConfig(url).subscribe(data => {
      this.config = data;
      console.log(this.config)
      for(let i = 3; i < this.config.value.length; i++) {
        this.existingTemplates.push(this.config.value[i].key)
      }
    })
    }

    func(name: String){
      this.NetworkNamesService.setName(name);
      this.input = name;
    }
    
    get getInput():String{
      return this.input;
    }
  
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Network Created Successfuly`;
      }, (reason) => {
        this.closeResult = ``;
      });
    }

    getNetworks(){
      return this.httpClient.get<String>("http://127.0.0.1:8000/networks")
    }

    // saveButton(){
    //   var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
    //   var inputValue = (<HTMLInputElement>document.getElementById("networkName")).value;
    //   var row = body.insertRow(1);
    //   var cell1 = row.insertCell(0);
    //   var cell2 = row.insertCell(1);
    //   //cell1.innerHTML = i.toString();
    //   cell2.innerHTML = inputValue.toString();
    //   this.addNetwork(inputValue);
    //   // window.location.reload();
    // }

    // addNetwork(networkname: String){
    //   console.log("ADDNETWORK")
    //   var network = {

    //     "network_id":networkname
    //     ,"local_brk_start_action":""
    //     ,"local_brk_start_splice_immidate_flag":""
    //     ,"local_brk_start_splice_event_id":""
    //     ,"local_brk_start_duration_flag":""
    //     ,"local_brk_star_duration_min":""
    //     ,"local_brk_star_duration_max":""
    //     ,"local_brk_end_action":""
    //     ,"local_brk_end_splice_immidiate_flag":""
    //     ,"local_brk_end_splice_event_id":""
    // }

    // console.log(network)
    // let postHeaders = new HttpHeaders({'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    // this.httpClient.post("http://127.0.0.1:8000/addNetworkName", network, {headers: postHeaders})
    // .subscribe(Response => console.log(Response));
    // }

    saveButton(){
      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue1 = (<HTMLInputElement>document.getElementById("recipient_emails")).value;
      var row = body.insertRow(1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = inputValue1.toString();

      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue2 = (<HTMLInputElement>document.getElementById("frequency")).value;
      var row = body.insertRow(2);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = inputValue2.toString();

      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue3 = (<HTMLInputElement>document.getElementById("network_id")).value;
      var row = body.insertRow(3);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = inputValue3.toString();

      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue4 = (<HTMLInputElement>document.getElementById("local_break")).value;
      var row = body.insertRow(4);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = inputValue4.toString();

      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue5 = (<HTMLInputElement>document.getElementById("expected_splices_hour")).value;
      var row = body.insertRow(5);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = inputValue5.toString();

      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue6 = (<HTMLInputElement>document.getElementById("validate_splice_count")).value;
      var row = body.insertRow(6);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = inputValue6.toString();

      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue7 = (<HTMLInputElement>document.getElementById("local_break_start")).value;
      var row = body.insertRow(7);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = inputValue7.toString();

      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue8 = (<HTMLInputElement>document.getElementById("splice_command_type")).value;
      var row = body.insertRow(8);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = inputValue8.toString();

      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue9 = (<HTMLInputElement>document.getElementById("action")).value;
      var row = body.insertRow(9);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = inputValue9.toString();

      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue10 = (<HTMLInputElement>document.getElementById("input_trigger")).value;
      var row = body.insertRow(10);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = inputValue10.toString();

      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue11 = (<HTMLInputElement>document.getElementById("splice_event_id")).value;
      var row = body.insertRow(11);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = inputValue11.toString();

      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue12 = (<HTMLInputElement>document.getElementById("out_of_network_indicator")).value;
      var row = body.insertRow(12);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = inputValue12.toString();

      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue13 = (<HTMLInputElement>document.getElementById("duration_flag")).value;
      var row = body.insertRow(13);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = inputValue13.toString();

      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue14 = (<HTMLInputElement>document.getElementById("splice_immediate_flag")).value;
      var row = body.insertRow(14);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = inputValue14.toString();

      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue15 = (<HTMLInputElement>document.getElementById("break_auto_return")).value;
      var row = body.insertRow(15);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = inputValue15.toString();

      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue16 = (<HTMLInputElement>document.getElementById("break_duration_min")).value;
      var row = body.insertRow(16);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = inputValue16.toString();

      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue17 = (<HTMLInputElement>document.getElementById("break_duration_max")).value;
      var row = body.insertRow(17);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = inputValue17.toString();

      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue18 = (<HTMLInputElement>document.getElementById("output_trigger")).value;
      var row = body.insertRow(18);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = inputValue18.toString();

      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue19 = (<HTMLInputElement>document.getElementById("local_break_end")).value;
      var row = body.insertRow(19);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = inputValue19.toString();

      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue20 = (<HTMLInputElement>document.getElementById("break_duration_deviation_tolerance")).value;
      var row = body.insertRow(20);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = inputValue20.toString();

      //cell1.innerHTML = i.toString();
      
      this.addNetwork(inputValue1,inputValue2,inputValue3,inputValue4,inputValue5,inputValue6,inputValue7,inputValue8,inputValue9,inputValue10
        ,inputValue11,inputValue12,inputValue13,inputValue14,inputValue15,inputValue16,inputValue17,inputValue18,inputValue19,inputValue20);
      // window.location.reload();
    }

    addNetwork( 
      recipient_emails: string, frequency: string, network_id: string, local_break: string, 
      expected_splices_hour: string, validate_splice_count: string, local_break_start: string, 
      splice_command_type: string, action: string, input_trigger: string, splice_event_id: string, 
      out_of_network_indicator: string, duration_flag: string, splice_immediate_flag: string, 
      break_auto_return: string, break_duration_min: string, break_duration_max: string, 
      output_trigger: string, local_break_end: string, break_duration_deviation_tolerance: string 
      ) {
      console.log("ADDNETWORK");
      var network = {
        "recipient_emails": recipient_emails
        ,"frequency": frequency 
        ,"network_id": network_id
        ,"local_break": local_break
        ,"expected_splices_hour": expected_splices_hour
        ,"validate_splice_count": validate_splice_count
        ,"local_break_start": local_break_start
        ,"splice_command_type": splice_command_type
        ,"action": action
        ,"input_trigger": input_trigger
        ,"splice_event_id": splice_event_id
        ,"out_of_network_indicator": out_of_network_indicator
        ,"duration_flag": duration_flag
        ,"splice_immediate_flag": splice_immediate_flag
        ,"break_auto_return": break_auto_return
        ,"break_duration_min": break_duration_min
        ,"break_duration_max": break_duration_max
        ,"output_trigger": output_trigger
        ,"local_break_end": local_break_end
        ,"break_duration_deviation_tolerance": break_duration_deviation_tolerance
      }
      let postHeaders = new HttpHeaders({'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*'})
      this.httpClient.post("http://127.0.0.1:8000/addConfig", network, {headers: postHeaders})
      .subscribe(Response => console.log(Response));
      }

    networkscan(){
      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var row = body.insertRow(1);
      var cell= row.insertCell(0);
      for(let item of this.networks){
        cell.innerHTML = item.toString()
      }
    }
  
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
  
  ngOnInit(): void {
    this.getNetworks().subscribe(
			networkArr => this.networks = networkArr
    )
  }
}