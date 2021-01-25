import { Component, OnInit, ComponentFactoryResolver, Input } from '@angular/core';
import { ControlComponent } from '../control/control.component';

import { KeyNumber } from "../key-value";
import { KeyString } from "../key-value";
import { KeyBool } from "../key-value"
import { KeyStringArray } from "../key-value";
import { KeyNumberArray } from "../key-value"
import { KeyObject } from "../key-value";
import { LocalBreak } from "../template_definitions";

import { LoadJsonService } from '../load-json.service';
import { __values } from 'tslib';
import { NetworkNamesService } from '../network-names.service';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-local-break',
  templateUrl: './local-break.component.html',
  styleUrls: ['./local-break.component.css'],
})
export class LocalBreakComponent implements OnInit {
  public index: number;
  public selfRef: LocalBreakComponent;
  public parentRef: ControlComponent;

  public startOutput: boolean;
  public endOutput: boolean;

  public breakDurationExact: boolean;
  public breakDurationExactAmount: number;
  public breakDurationExactOutput: boolean;
  public breakDurationExactAmountOutput: number;

  public config: KeyObject;
  public existingTemplates = <string[]>[];

  // public existingTemplates = []; 

  @Input() localBreak: any;

  constructor(private LoadJsonService: LoadJsonService, private CFR: ComponentFactoryResolver, private NetworkNamesService:NetworkNamesService, private HttpClient: HttpClient,) {
    // let url = "/assets/config.json"
    // let url = "http://127.0.0.1:8000/get/COOKHD-6216.dfw.1080"
    let url = "http://127.0.0.1:8000/get/"+ this.NetworkNamesService.getName();

    this.LoadJsonService.getConfig(url).subscribe(data => {
		this.config = data;
    // console.log(this.config)
    console.log(typeof(this.config));
		for(let i = 0; i < this.config.value[0].length; i++) {
      console.log(this.config.value.length)
			this.existingTemplates.push(this.config.value[0].value[i])
    }
    console.log(this.existingTemplates.length)
	})
  }

  // addSegment(Array: []) {
  //   console.log(Array)
  //   for(let i = 0; i < Array.length; i++) {
  //     if (Array[0].value[0].value ) {
  //       this.existingTemplates.push(this.config.value[0].value[i])
  //     }
  //   }
  // }

  // remove() {
  //   console.log(this.index)
  //   this.parentRef.clear(this.index == 3)
  // }

  // remove() {
  //   fetch("/assets/config.json").then(config => config.json()).then(json => {this.config.value[3]({isLoaded: true, index: json.index})});
  //   const index = this.existingTemplates.findIndex(this.config = this.config.value[3]);
  //   this.existingTemplates.splice(index, -1); // Removes one element, starting from index
  // }

  // remove() {
  //   fetch("/assets/config.json").then(config => config.json()).then(json => {this.getConfig({isLoaded: true, index: json.index})});
  //   const index = this.existingTemplates.findIndex(this.config = this.config.value[3]);
  //   this.existingTemplates.splice(index, -1); // Removes one element, starting from index
  // }

  // remove() {
  //   fetch("/assets/config.json").then(config => config.json()).then(json => {this.config.value[3]({isLoaded: true, index: Array})});
  //   let index = this.existingTemplates.findIndex(this.config = this.config.value[3]);
  //   this.existingTemplates.splice(index, -1); // Removes one element, starting from index
  // }

  // remove(in: number) {
  // fetch("/assets/config.json").then(config => config.json()).then(item => {this.config.value[3]({isLoaded: true, item})});
  // var index = this.config.value.findIndex(this.config = this.config.value[3]);
  // // this.config.value.splice(index, -1); // Removes one element, starting from index
  // delete this.config.value[];
  // }

  remove() {
    fetch("/assets/config.json").then(config => config.json()).then(json => {this.config.value[3]({isLoaded: true, index: Array})});
    let index = this.existingTemplates.findIndex(this.config = this.config.value[3]);
    this.existingTemplates.splice(index, 1); // Removes one element, starting from index
  }
  
  ngOnInit(): void {
    // console.log(this.localBreak)
  }

  getConfig() {
    return this.config
  }

  setStartOutput() {
    try {
      if(this.localBreak.value[0].local_break_start.action == 'REPLACE') {
        this.startOutput = true;
      } else {
        this.startOutput = false;
      }
    } catch {
      this.startOutput = false;
    }
  }

  setEndOutput() {
    try {
      if(this.localBreak.value[0].local_break_end.action == 'REPLACE') {
        this.endOutput = true;
      } else {
        this.endOutput = false;
      }
    } catch {
      this.endOutput = false;
    }
  }

  public setExactBreakDuration(input_trigger: boolean) {
    if(input_trigger) {
      this.localBreak.value[0].local_break_start.input_trigger.break_duration_max = this.localBreak.value[0].local_break_start.input_trigger.break_duration_min = this.breakDurationExactAmount;
    } else {
      this.localBreak.value[0].local_break_start.output_trigger.break_duration_max = this.localBreak.value[0].local_break_start.output_trigger.break_duration_min = this.breakDurationExactAmountOutput;

    }
  }

  public makeExactBreakDuration(exact, input_trigger: boolean) {
    console.log(this.breakDurationExact)
    if(exact == "true") {
      if (input_trigger) {
        this.breakDurationExact = true
        this.localBreak.value[0].local_break_start.input_trigger.break_duration_max = this.localBreak.value[0].local_break_start.input_trigger.break_duration_min
      } else {
        this.breakDurationExactOutput = true
        this.localBreak.value[0].local_break_start.output_trigger.break_duration_max = this.localBreak.value[0].local_break_start.output_trigger.break_duration_min
      }
    } else {
      if (input_trigger) {
        this.breakDurationExact = false
        this.localBreak.value[0].local_break_start.input_trigger.break_duration_max = this.localBreak.value[0].local_break_start.input_trigger.break_duration_min + 1
      } else {
        this.breakDurationExactOutput = false
        this.localBreak.value[0].local_break_start.output_trigger.break_duration_max = this.localBreak.value[0].local_break_start.output_trigger.break_duration_min + 1
      }
    }
    console.log(this.breakDurationExact)
  }

  public logLocalBreak() {
    console.log(this.localBreak)
  }
  private rebuildJson(node: any): string {
		let result = ''
		if(node.key == "national_break") {
			console.log(node.value[0])
      		result += '"national_break":'
			result += JSON.stringify(node.value[0])
		}
		else {
			if(typeof node.value == "string") {
				result = '"'.concat(node.key,'": "', node.value,'"')
			}
			else if(typeof node.value == "number") {
				result = '"'.concat(node.key,'": ', String(node.value))
			}
			else if (typeof node.value == "boolean") {
				result = '"'.concat(node.key,'": ', String(node.value))
			}
			else if(node.type == "stringArray") {
				result = '"'.concat(node.key,'": [')
				for(let idx=0; idx < node.value.length; idx++) {
					result = result.concat('"',String(node.value[idx]),'"')
					if(idx + 1 < node.value.length) {
						result = result.concat(",")
					}
				}
				result = result.concat("]")
			}
			else if(node.type == "numberArray") {
				result = '"'.concat(node.key,'": [')
				for(let idx=0; idx < node.value.length; idx++) {
					result = result.concat(String(node.value[idx]))
					if(idx + 1 < node.value.length) {
						result = result.concat(",")
					}
				}
				result = result.concat("]")
			}
			else if(node.type == "expandable") {
				result = result.concat('"',node.key,'": {')
				for(let index = 0; index < node.value.length; index++) {
					result = result.concat(this.rebuildJson(node.value[index]))
					if(index + 1 < node.value.length) {
						result = result.concat(',')
					}
				}
				result = result.concat('}')
			}
		}
		return result
	}
}
