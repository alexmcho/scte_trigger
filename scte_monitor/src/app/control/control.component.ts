import { Component, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ViewChild, OnInit, Type, ɵConsole } from '@angular/core';
import { LoadJsonService } from '../load-json.service';
import { KeyObject } from "../key-value";
import { saveAs } from 'file-saver';
import { ProgramComponent } from '../program/program.component';
import { ContentIdComponent } from '../content-id/content-id.component';
import { LocalBreakComponent } from '../local-break/local-break.component';
import { PlacementOpportunityComponent } from "../placement-opportunity/placement-opportunity.component";
import { ProviderAdComponent } from "../provider-ad/provider-ad.component";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NetworkNamesService } from '../network-names.service';
//import { networkInterfaces } from 'os';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  template:''
  ,
  styleUrls: ['./control.component.css']
})

export class ControlComponent implements OnInit {
  public config: KeyObject;
  public existingTemplates = <string[]>[];
  closeResult = ''; 

  @ViewChild('viewContainerRef', { read: ViewContainerRef }) VCR: ViewContainerRef;
  index: number = 0;
  componentsReferences = Array<ComponentRef<LocalBreakComponent>>();
  localbreak_index: number = 0;
  contentid_index: number = 1;
  placementopportunity_index: number = 2;
  program_index: number = 3;
  providerad_index: number = 4;
  networklink: String;


  constructor(private LoadJsonService: LoadJsonService, private CFR: ComponentFactoryResolver, private modalService: NgbModal, private NetworkNamesService:NetworkNamesService) {
	let url = "http://127.0.0.1:8000/get/"+ this.NetworkNamesService.getName();
	console.log(this.NetworkNamesService.getName())
	console.log(this.networklink)
	//let url = "http://127.0.0.1:8000/get/CONE_123";
	//console.log(this.input_field.input_field);

	//let url = "/assets/config.json"
    this.LoadJsonService.getConfig(url).subscribe(data => {
		this.config = data;
		console.log(this.config)
		for(let i = 3; i < this.config.value.length; i++) {
			this.existingTemplates.push(this.config.value[i].key)
		}
	})
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = ``;
    }, (reason) => {
      this.closeResult = ``;
    });
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

  clear() {
    this.VCR.remove();
  }

  createLocalBreakComponent() {
	let componentFactory = this.CFR.resolveComponentFactory(LocalBreakComponent);
    let childComponentRef = this.VCR.createComponent(componentFactory);
	let childComponent = childComponentRef.instance;
	
    childComponent.index = ++this.localbreak_index;
    childComponent.parentRef = this;

    // add reference for newly created component
    // this.componentsReferences.push(childComponentRef);
  }

  createContentIdComponent() {
	let componentFactory = this.CFR.resolveComponentFactory(ContentIdComponent);
    let childComponentRef = this.VCR.createComponent(componentFactory);
	let childComponent = childComponentRef.instance;
	
    childComponent.index = ++this.contentid_index;
    childComponent.parentRef = this;

    // add reference for newly created component
    // this.componentsReferences.push(childComponentRef);
  }

  createPlacementOpportunityComponent() {
	let componentFactory = this.CFR.resolveComponentFactory(PlacementOpportunityComponent);
    let childComponentRef = this.VCR.createComponent(componentFactory);
	let childComponent = childComponentRef.instance;
	
    childComponent.index = ++this.placementopportunity_index;
    childComponent.parentRef = this;

    // add reference for newly created component
    // this.componentsReferences.push(childComponentRef);
  }

  createProgramComponent() {
	let componentFactory = this.CFR.resolveComponentFactory(ProgramComponent);
    let childComponentRef = this.VCR.createComponent(componentFactory);
	let childComponent = childComponentRef.instance;
	
    childComponent.index = ++this.program_index;
    childComponent.parentRef = this;

    // add reference for newly created component
    // this.componentsReferences.push(childComponentRef);
  }

  createProviderAdComponent() {
	let componentFactory = this.CFR.resolveComponentFactory(ProviderAdComponent);
    let childComponentRef = this.VCR.createComponent(componentFactory);
	let childComponent = childComponentRef.instance;
	
    childComponent.index = ++this.providerad_index;
    childComponent.parentRef = this;

    // add reference for newly created component
    // this.componentsReferences.push(childComponentRef);
  }

  ngOnInit(): void {
	console.log(this.config)
  }

  getConfig() {
    return this.config
  }

  // Converts config back into json and calls writeConfig to send the new config file to the server
  saveChanges() {
	for(let i=0; i < this.config.value.length; i++) {
		// actions for recipient_emails
		if(this.config.value[i].key == "recipient_emails") {
			if(typeof this.config.value[i].value == "string") {
				this.config.value[i].value = this.config.value[i].value.replace(/\s/g,'').split(",")
			}
		}
		// actions for local_break
		if(this.config.value[i].key == "local_break") {
			// If the local_break_start action is not REPLACE then drop the local_break_start output trigger
			if(this.config.value[i].value[0].local_break_start.action != 'REPLACE') {
				delete this.config.value[i].value[0].local_break_start.output_trigger
			}
			// If the local_break_end action is not REPLACE then drop the local_break_end output trigger
			if(this.config.value[i].value[0].local_break_end.action != 'REPLACE') {
				delete this.config.value[i].value[0].local_break_end.output_trigger
			}
			// If the user has indicated not to include local_break_end then delete it from config
			if(!this.config.value[i].value[0].include_break_end) {
				delete this.config.value[i].value[0].local_break_end
			}
			delete this.config.value[i].value[0].include_break_end  // drop the include_break_end flag
		}
	}
    let newConfig = "{"
		for(let i = 0; i < this.config.value.length; i++) {
			newConfig = newConfig.concat(this.rebuildJson(this.config.value[i]))
			if(i + 1 < this.config.value.length) {
				newConfig = newConfig.concat(',')
			}
		}
		newConfig = newConfig.concat('}')
    console.log(newConfig)
	this.LoadJsonService.writeConfig(newConfig).subscribe();
	window.location.reload();
  }

  public checkExistingTemplates(template: string): boolean{
	  return this.existingTemplates.includes(template)
  }

  public addNewTemplate(templateType: string) {
	  if(templateType == "local_break" && !this.existingTemplates.includes("local_break")) {
		let template = this.LoadJsonService.addLocalBreak({})
		let templateObject = <KeyObject> {key: "local_break", path: "config.value[3]", type: "localBreak", value: [template]}
		this.config.value.splice(3, 0, templateObject)
		this.existingTemplates.push("local_break")
	  }
	  console.log(this.config)
  }

  public addEmail(node: any[]) {
			node.push("new.email@example.com")
	}

  public deleteFromArray(node: any[], index: number) {
		return node.splice(index, 1);
	}

  private rebuildJson(node: any): string {
		let result = ''
		if(node.key == "local_break") {
			console.log(node.value[0])
      		result += '"local_break":'
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
export class AppModule {}