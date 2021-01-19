import { Component, OnInit, ComponentFactoryResolver, Input } from '@angular/core';
import { ControlComponent } from '../control/control.component';

import { KeyNumber } from "../key-value";
import { KeyString } from "../key-value";
import { KeyBool } from "../key-value"
import { KeyStringArray } from "../key-value";
import { KeyNumberArray } from "../key-value"
import { KeyObject } from "../key-value";
// import { ContentId } from "../template_definitions";
import { LoadJsonService } from '../load-json.service';
import { NetworkNamesService } from '../network-names.service';

@Component({
  selector: 'app-content-id',
  templateUrl: './content-id.component.html',
  styleUrls: ['./content-id.component.css'],
})
export class ContentIdComponent implements OnInit {
  public index: number;
  public selfRef: ContentIdComponent;
  public parentRef: ControlComponent;

  public startOutput: boolean;
  public endOutput: boolean;

  // public segmentationDurationExact: boolean;
  // public segmentationDurationExactAmount: number;
  // public segmentationDurationExactOutput: boolean;
  // public segmentationDurationExactAmountOutput: number;

  public config: KeyObject;
  public existingTemplates = <string[]>[];

  @Input() contentId: any;

  constructor(private LoadJsonService: LoadJsonService, private CFR: ComponentFactoryResolver, private NetworkNamesService:NetworkNamesService) {
    let url = "/assets/config.json"
    // let url = "http://127.0.0.1:8000/get/"+ this.NetworkNamesService.getName();
    this.LoadJsonService.getConfig(url).subscribe(data => {
		this.config = data;
		console.log(this.config)
		for(let i = 3; i < this.config.value.length; i++) {
			this.existingTemplates.push(this.config.value[i].key)
		}
	})
  }

  // remove() {
  //   console.log(this.index)
  //   this.parentRef.clear(this.index == 4)
  // }

  remove() {
    const index = this.existingTemplates.findIndex(this.config = this.config.value[4]);
    this.existingTemplates.splice(index, -1); // Removes one element, starting from index
  }

  ngOnInit(): void {
    // console.log(this.contentId)
  }

  getConfig() {
    return this.config
  }

  setStartOutput() {
    try {
      if(this.contentId.value[0].content_id_start.action == 'REPLACE') {
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
      if(this.contentId.value[0].content_id_end.action == 'REPLACE') {
        this.endOutput = true;
      } else {
        this.endOutput = false;
      }
    } catch {
      this.endOutput = false;
    }
  }

  // public setExactSegmentationDuration(input_trigger: boolean) {
  //   if(input_trigger) {
  //     this.contentId.value[0].content_id_start.input_trigger.segmentation_duration_max = this.contentId.value[0].content_id_start.input_trigger.segmentation_duration_min = this.segmentationDurationExactAmount;
  //   } else {
  //     this.contentId.value[0].content_id_start.output_trigger.segmentation_duration_max = this.contentId.value[0].content_id_start.output_trigger.segmentation_duration_min = this.segmentationDurationExactAmountOutput;

  //   }
  // }

  // public makeExactSegmentationDuration(exact, input_trigger: boolean) {
  //   console.log(this.segmentationDurationExact)
  //   if(exact == "true") {
  //     if (input_trigger) {
  //       this.segmentationDurationExact = true
  //       this.contentId.value[0].content_id_start.input_trigger.segmentation_duration_max = this.contentId.value[0].content_id_start.input_trigger.segmentation_duration_min
  //     } else {
  //       this.segmentationDurationExactOutput = true
  //       this.contentId.value[0].content_id_start.output_trigger.segmentation_duration_max = this.contentId.value[0].content_id_start.output_trigger.segmentation_duration_min
  //     }
  //   } else {
  //     if (input_trigger) {
  //       this.segmentationDurationExact = false
  //       this.contentId.value[0].content_id_start.input_trigger.segmentation_duration_max = this.contentId.value[0].content_id_start.input_trigger.segmentation_duration_min + 1
  //     } else {
  //       this.segmentationDurationExactOutput = false
  //       this.contentId.value[0].content_id_start.output_trigger.segmentation_duration_max = this.contentId.value[0].content_id_start.output_trigger.segmentation_duration_min + 1
  //     }
  //   }
  //   console.log(this.segmentationDurationExact)
  // }

  public logContentId() {
    console.log(this.contentId)
  }
  private rebuildJson(node: any): string {
		let result = ''
		if(node.key == "content_id") {
			console.log(node.value[0])
      		result += '"content_id":'
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
