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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LbcComponent } from '../lbc/lbc.component';
import { CicComponent } from '../cic/cic.component';
import { PocComponent } from '../poc/poc.component';
import { PcComponent } from '../pc/pc.component';
import { PacComponent } from '../pac/pac.component';

import { NbcComponent } from '../nbc/nbc.component';
import { HostListener } from '@angular/core';

import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
//import { networkInterfaces } from 'os';


@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  template:'',
  styleUrls: ['./control.component.css']
})

export class ControlComponent implements OnInit {
  public config: KeyObject;
  public existingTemplates = <string[]>[];


  test:string;

  listOfOptionsForActions = ["Noop","Delete","Replace"]
  listOfOptionsForBoolean = ["false","true"]
  //filtering list
  action1:String []= []
  action2:String [] = []
  bool1:String [] = []
  bool2:String [] = []
  bool3:String [] = []
  bool4:String [] = []
  bool5:String [] = []
  bool6:String [] = []
  bool7:String [] = []
  bool8:String [] = []
  bool9:String [] = []
  bool10:String [] = []
  bool11:String [] = []
  bool12:String [] = []




  recipient_emails: string;
  frequency: string;
  network_id: string;
  local_break: string;
  expected_splices_hour: string;
  validate_splice_count: string;
  local_break_start: string;
  splice_command_type: string;
  action: string;
  input_trigger: string;
  splice_event_id: string;
  out_of_network_indicator: string;
  duration_flag: string;
  splice_immediate_flag: string;
  break_auto_return: string;
  break_duration_min: string;
  break_duration_max: string;
  output_trigger: string;
  local_break_end: string;
  break_duration_deviation_tolerance: string;
  stringArr: [];


form:FormGroup;
public formSubmitAttempt: boolean;
userNameOnRequired:boolean = false;


//   public preloadConfig() {
// 	for(let i=0; i < this.config.value.length; i++) {
// 		if(this.config.value[i].key == "local_break") {
// 			return this.createLocalBreakComponent()
// 		}
// 		else if(this.config.value[i].key == "content_id") {
// 			return this.createContentIdComponent()
// 		}
// 		else if(this.config.value[i].key == "placement_opportunity") {
// 			return this.createPlacementOpportunityComponent()
// 		}
// 		else if(this.config.value[i].key == "program") {
// 			return this.createProgramComponent()
// 		}
// 		else if(this.config.value[i].key == "provider_ad") {
// 			return this.createProviderAdComponent()
// 		}
// 	}
//   }


  closeResult = ''; 

  @ViewChild('viewContainerRef', { read: ViewContainerRef }) VCR: ViewContainerRef;
  index = [];
  componentsReferences = Array<ComponentRef<any>>();
  localbreak_index: number = 3;
  contentid_index: number = 4;
  placementopportunity_index: number = 5;
  program_index: number = 6;
  providerad_index: number = 7;
  networklink: String;

  constructor(private LoadJsonService: LoadJsonService, private CFR: ComponentFactoryResolver, private modalService: NgbModal, private NetworkNamesService:NetworkNamesService, private HttpClient: HttpClient, private router:Router) {
	let url = "http://127.0.0.1:8000/get/"+ this.NetworkNamesService.getName();
	console.log(this.NetworkNamesService.getName())
	console.log(this.networklink)
	//let url = "http://127.0.0.1:8000/get/CONE_123";
	//console.log(this.input_field.input_field);

	//let url = "/assets/config.json"
    this.LoadJsonService.getConfig(url).subscribe(data => {
		this.config = data;
		var stringChecker:String;
		
		var list = [this.action1, this.action2]
		var list2 = [this.bool1, this.bool2, this.bool3, this.bool4, this.bool5,
			this.bool6, this.bool7, this.bool8, this.bool9, this.bool10, this.bool11,this.bool12]

			console.log(this.config.value[0].value[3].value[2])
		this.action1.push(this.config.value[0].value[3].value[2])
		this.action2.push(this.config.value[0].value[3].value[16])

		this.bool1.push(this.config.value[0].value[3].value[3])
		this.bool2.push(this.config.value[0].value[3].value[5])
		this.bool3.push(this.config.value[0].value[3].value[8])
		this.bool4.push(this.config.value[0].value[3].value[9])
		this.bool5.push(this.config.value[0].value[3].value[11])
		this.bool6.push(this.config.value[0].value[3].value[14])
		this.bool7.push(this.config.value[0].value[3].value[17])
		this.bool8.push(this.config.value[0].value[3].value[19])
		this.bool9.push(this.config.value[0].value[5].value[2])
		this.bool10.push(this.config.value[0].value[6].value[2])
		this.bool11.push(this.config.value[0].value[7].value[2])
		
		for(let i = 0; i < list.length; i++){
			for(let j = 0; j < 3; j++)
			if(list[i].indexOf(this.listOfOptionsForActions[j]) == -1){
				list[i].push(this.listOfOptionsForActions[j])
			}
		}

		for(let i = 0; i < list2.length; i++){
			for(let j = 0; j < 2; j++)
			if(list2[i].indexOf(this.listOfOptionsForBoolean[j]) == -1){
				list2[i].push(this.listOfOptionsForBoolean[j])
			}
		}

		
		

        // for(let i = 0 ; i < this.listOfOptionsForActions.length; i++){
		// 	if(this.listForLocalBreak.indexOf(this.listOfOptionsForActions[i]) == -1){
		// 		this.listForLocalBreak.push(this.listOfOptionsForActions[i])
		// 	}
		// }
			
	
		
	})
	

  }



  remove() {
	let postHeaders = new HttpHeaders({'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*'})
	  this.HttpClient.delete("http://127.0.0.1:8000/remove/"+ this.NetworkNamesService.getName(), {headers: postHeaders}).subscribe(output=>{
		  console.log(output)
	  })
	  this.router.navigate(['/dashboard']);
  }

  openRemoveModal(contentRemove) {
    this.modalService.open(contentRemove, {ariaLabelledBy: 'modal-basic-title-remove'}).result.then((result) => {
      this.closeResult = ``;
    }, (reason) => {
      this.closeResult = ``;
    });
  }

  openEditModal(content) {
	this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title-edit'}).result.then((result) => {
	  this.closeResult = ``;
	}, (reason) => {
	  this.closeResult = ``;
	});
  }

  openConfigModal(contentConfig) {
	this.modalService.open(contentConfig, {ariaLabelledBy: 'modal-basic-title-config'}).result.then((result) => {
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


	@HostListener('window:load') goToPage() {
		this.router.navigate(['/dashboard']);
	}
  
	// removeLocal() {
	// 	var T = document.getElementById("RemoveLocal");
	// 	T.style.display = "none";  // <-- Set it to block
	// }

	// removeContent() {
	// 	var T = document.getElementById("RemoveContent");
	// 	T.style.display = "none";  // <-- Set it to block
	// }

	// removePlacement() {
	// 	var T = document.getElementById("RemovePlacement");
	// 	T.style.display = "none";  // <-- Set it to block
	// }

	// removeProgram() {
	// 	var T = document.getElementById("RemoveProgram");
	// 	T.style.display = "none";  // <-- Set it to block
	// }

	// removeProvider() {
	// 	var T = document.getElementById("RemoveProvider");
	// 	T.style.display = "none";  // <-- Set it to block
	// }

	// removeNational() {
	// 	var T = document.getElementById("RemoveProvider");
	// 	T.style.display = "none";  // <-- Set it to block
	// }

  
//   clear(index) {
// 	this.VCR.remove(index)
//   }
  
  createLocalBreakComponent() {
	let componentFactory = this.CFR.resolveComponentFactory(LbcComponent);
    let childComponentRef = this.VCR.createComponent(componentFactory);
	let childComponent = childComponentRef.instance;
	
    childComponent.index = ++this.localbreak_index;
    childComponent.parentRef = this;

  }
  


	// add reference for newly created component
	// componentsrefernces -> array componentref
    // this.componentsReferences.push(childComponentRef);
  
  


  createContentIdComponent() {
	let componentFactory = this.CFR.resolveComponentFactory(CicComponent);
    let childComponentRef = this.VCR.createComponent(componentFactory);
	let childComponent = childComponentRef.instance;
	
    childComponent.index = ++this.contentid_index;
    childComponent.parentRef = this;


    // add reference for newly created component
    // this.componentsReferences.push(childComponentRef);
  }

  createPlacementOpportunityComponent() {
	let componentFactory = this.CFR.resolveComponentFactory(PocComponent);
    let childComponentRef = this.VCR.createComponent(componentFactory);
	let childComponent = childComponentRef.instance;
	
    childComponent.index = ++this.placementopportunity_index;
    childComponent.parentRef = this;

  }

  createProgramComponent() {
	let componentFactory = this.CFR.resolveComponentFactory(PcComponent);
    let childComponentRef = this.VCR.createComponent(componentFactory);
	let childComponent = childComponentRef.instance;
	
    childComponent.index = ++this.program_index;
    childComponent.parentRef = this;


    // add reference for newly created component
    // this.componentsReferences.push(childComponentRef);
  }

  createProviderAdComponent() {
	let componentFactory = this.CFR.resolveComponentFactory(PacComponent);
    let childComponentRef = this.VCR.createComponent(componentFactory);
	let childComponent = childComponentRef.instance;
	
    childComponent.index = ++this.providerad_index;
    childComponent.parentRef = this;

  }

  createNationalBreakComponent() {
	let componentFactory = this.CFR.resolveComponentFactory(NbcComponent);
    let childComponentRef = this.VCR.createComponent(componentFactory);
	let childComponent = childComponentRef.instance;
	
    childComponent.index = ++this.providerad_index;
    childComponent.parentRef = this;
  }

  ngOnInit(): void {
  console.log(this.config)
//   this.form = this.formBuilder.group({
// 		"recipient_emails":  [null, [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
// 		"network_id":  [null, [Validators.required, Validators.pattern("")]]
// 	})
  }

  isFieldRequired(field: string) {
    if(!this.form.get(field).value && this.form.get(field).touched){
      return true;
    }
    if(!this.form.get(field).value && this.form.get(field).dirty){
      return true;
    }
		return  this.formSubmitAttempt && this.form.get(field).pristine && !this.form.get(field).touched;
	}
  
  isFieldInvalid(field:string){
		return this.form.get(field).value &&  this.form.get(field).invalid
  }

  getConfig() {
    return this.config
  }


 

  preloadConfig() {
	for(let i=0; i < this.config.value.length; i++) {
		if(this.config.value[i].key == "local_break" && this.config.value[i].key != null) {
			return this.createLocalBreakComponent()
		}
		else if(this.config.value[i].key == "content_id" && this.config.value[i].key != null) {
			return this.createContentIdComponent()
		}
		else if(this.config.value[i].key == "placement_opportunity") {
			return this.createPlacementOpportunityComponent()
		}
		else if(this.config.value[i].key == "program") {
			return this.createProgramComponent()
		}
		else if(this.config.value[i].key == "provider_ad") {
			return this.createProviderAdComponent()
		}
	}
  }

  // Converts config back into json and calls writeConfig to send the new config file to the server
//   saveChanges() {
// 	for(let i=0; i < this.config.value.length; i++) {
// 		// actions for recipient_emails
// 		if(this.config.value[i].key == "recipient_emails") {
// 			if(typeof this.config.value[i].value == "string") {
// 				this.config.value[i].value = this.config.value[i].value.replace(/\s/g,'').split(",")
// 			}
// 		}
// 		// actions for local_break
// 		if(this.config.value[i].key == "local_break") {
// 			// If the local_break_start action is not REPLACE then drop the local_break_start output trigger
// 			if(this.config.value[i].value[0].local_break_start.action != 'REPLACE') {
// 				delete this.config.value[i].value[0].local_break_start.output_trigger
// 			}
// 			// If the local_break_end action is not REPLACE then drop the local_break_end output trigger
// 			if(this.config.value[i].value[0].local_break_end.action != 'REPLACE') {
// 				delete this.config.value[i].value[0].local_break_end.output_trigger
// 			}
// 			// If the user has indicated not to include local_break_end then delete it from config
// 			if(!this.config.value[i].value[0].include_break_end) {
// 				delete this.config.value[i].value[0].local_break_end
// 			}
// 			delete this.config.value[i].value[0].include_break_end  // drop the include_break_end flag
// 		}
// 		else if(this.config.value[i].key == "content_id") {
// 			// If the content_id_start action is not REPLACE then drop the content_id_start output trigger
// 			if(this.config.value[i].value[0].content_id_start.action != 'REPLACE') {
// 				delete this.config.value[i].value[0].content_id_start.output_trigger
// 			}
// 			// If the content_id_end action is not REPLACE then drop the content_id_end output trigger
// 			if(this.config.value[i].value[0].content_id_end.action != 'REPLACE') {
// 				delete this.config.value[i].value[0].content_id_end.output_trigger
// 			}
// 			// If the user has indicated not to include content_id_end then delete it from config
// 			if(!this.config.value[i].value[0].include_break_end) {
// 				delete this.config.value[i].value[0].content_id_end
// 			}
// 			delete this.config.value[i].value[0].include_break_end  // drop the include_break_end flag
// 		}
// 		else if(this.config.value[i].key == "placement_opportunity") {
// 			// If the placement_opportunity_start action is not REPLACE then drop the placement_opportunity_start output trigger
// 			if(this.config.value[i].value[0].placement_opportunity_start.action != 'REPLACE') {
// 				delete this.config.value[i].value[0].placement_opportunity_start.output_trigger
// 			}
// 			// If the placement_opportunity_end action is not REPLACE then drop the placement_opportunity_end output trigger
// 			if(this.config.value[i].value[0].placement_opportunity_end.action != 'REPLACE') {
// 				delete this.config.value[i].value[0].placement_opportunity_end.output_trigger
// 			}
// 			// If the user has indicated not to include placement_opportunity_end then delete it from config
// 			if(!this.config.value[i].value[0].include_break_end) {
// 				delete this.config.value[i].value[0].placement_opportunity_end
// 			}
// 			delete this.config.value[i].value[0].include_break_end  // drop the include_break_end flag
// 		}
// 		else if(this.config.value[i].key == "program") {
// 			// If the program_start action is not REPLACE then drop the program_start output trigger
// 			if(this.config.value[i].value[0].program_start.action != 'REPLACE') {
// 				delete this.config.value[i].value[0].program_start.output_trigger
// 			}
// 			// If the program_end action is not REPLACE then drop the program_end output trigger
// 			if(this.config.value[i].value[0].program_end.action != 'REPLACE') {
// 				delete this.config.value[i].value[0].program_end.output_trigger
// 			}
// 			// If the user has indicated not to include program_end then delete it from config
// 			if(!this.config.value[i].value[0].include_break_end) {
// 				delete this.config.value[i].value[0].program_end
// 			}
// 			delete this.config.value[i].value[0].include_break_end  // drop the include_break_end flag
// 		}
// 		else if(this.config.value[i].key == "providerAd") {
// 			// If the provider_ad_start action is not REPLACE then drop the provider_ad_start output trigger
// 			if(this.config.value[i].value[0].provider_ad_start.action != 'REPLACE') {
// 				delete this.config.value[i].value[0].provider_ad_start.output_trigger
// 			}
// 			// If the provider_ad_end action is not REPLACE then drop the provider_ad_end output trigger
// 			if(this.config.value[i].value[0].provider_ad_end.action != 'REPLACE') {
// 				delete this.config.value[i].value[0].provider_ad_end.output_trigger
// 			}
// 			// If the user has indicated not to include provider_ad_end then delete it from config
// 			if(!this.config.value[i].value[0].include_break_end) {
// 				delete this.config.value[i].value[0].provider_ad_end
// 			}
// 			delete this.config.value[i].value[0].include_break_end  // drop the include_break_end flag
// 		}
// 	}
//     let newConfig = "{"
// 		for(let i = 0; i < this.config.value.length; i++) {
// 			newConfig = newConfig.concat(this.rebuildJson(this.config.value[i]))
// 			if(i + 1 < this.config.value.length) {
// 				newConfig = newConfig.concat(',')
// 			}
// 		}
// 		newConfig = newConfig.concat('}')
//     console.log(newConfig)
// 	this.LoadJsonService.writeConfig(newConfig).subscribe();
// 	// window.location.reload();
//   }

 TestsFunction() {
    var T = document.getElementById("TestsDiv");
	T.style.display = "none";  // <-- Set it to block
	
}

//   saveLocalBreak() {

// 	const emails = <HTMLInputElement> document.getElementById("emails");

// 	const local_expected_splices_hour = <HTMLInputElement> document.getElementById("local_expected_splices_hour");
// 	const local_splice_command_start = <HTMLInputElement> document.getElementById("local_splice_command_start");
// 	const local_break_action = <HTMLInputElement> document.getElementById("local_break_action");
// 	const local_splice_immidiate_flag = <HTMLInputElement> document.getElementById("local_splice_immidiate_flag");
// 	const local_break_splice_event_id = <HTMLInputElement> document.getElementById("local_break_splice_event_id");
// 	const local_break_duration_flag = <HTMLInputElement> document.getElementById("local_break_duration_flag");
// 	const local_break_duration_min = <HTMLInputElement> document.getElementById("local_break_duration_min");
// 	const local_break_duration_max = <HTMLInputElement> document.getElementById("local_break_duration_max");
// 	const local_break_auto_return = <HTMLInputElement> document.getElementById("local_break_auto_return");
// 	const local_break_output_splice_immidiate_flag = <HTMLInputElement> document.getElementById("local_break_output_splice_immidiate_flag");
// 	const local_break_output_splice_event_id = <HTMLInputElement> document.getElementById("local_break_output_splice_event_id");
// 	const local_break_output_duration_flag = <HTMLInputElement> document.getElementById("local_break_output_duration_flag");
// 	const local_break_output_break_duration_min = <HTMLInputElement> document.getElementById("local_break_output_break_duration_min");
// 	const local_break_output_break_duration_max = <HTMLInputElement> document.getElementById("local_break_output_break_duration_max");


// 	const local_break_output_break_auto_return = <HTMLInputElement> document.getElementById("local_break_output_break_auto_return");
// 	const local_break_splice_command = <HTMLInputElement> document.getElementById("local_break_splice_command");
// 	const local_break_end_input_trigger = <HTMLInputElement> document.getElementById("local_break_end_input_trigger");
// 	const local_break_end_input_splice_immidiate_flag = <HTMLInputElement> document.getElementById("local_break_end_input_splice_immidiate_flag");
// 	const local_break_end_input_splice_event_id = <HTMLInputElement> document.getElementById("local_break_end_input_splice_event_id");
// 	const local_break_end_output_splice_immediate_flag = <HTMLInputElement> document.getElementById("local_break_end_output_splice_immediate_flag");
// 	const local_break_end_output_splice_event_id = <HTMLInputElement> document.getElementById("local_break_end_output_splice_event_id");
// 	const local_break_end_devation_tolerance = <HTMLInputElement> document.getElementById("local_break_end_devation_tolerance");
	
// 	const content_id_splice_command_type_start = <HTMLInputElement> document.getElementById("content_id_splice_command_type_start");
// 	const content_id_segmentation_type_id = <HTMLInputElement> document.getElementById("content_id_segmentation_type_id");

// 	const placement_splice_comand_type_start = <HTMLInputElement> document.getElementById("placement_splice_comand_type_start");
// 	const placement_segmentation_type_id = <HTMLInputElement> document.getElementById("placement_segmentation_type_id");
// 	const placement_duration_flag = <HTMLInputElement> document.getElementById("placement_duration_flag");
// 	const placement_segmentation_duration_min = <HTMLInputElement> document.getElementById("placement_segmentation_duration_min");
// 	const placement_segmentation_duration_max = <HTMLInputElement> document.getElementById("placement_segmentation_duration_max");
// 	const placement_output_segmentation_duration_min = <HTMLInputElement> document.getElementById("placement_output_segmentation_duration_min");
// 	const placement_output_segmentation_duration_max = <HTMLInputElement> document.getElementById("placement_output_segmentation_duration_max");

// 	const program_splice_comand_type_start = <HTMLInputElement> document.getElementById("program_splice_comand_type_start");
// 	const program_segmentation_type_id = <HTMLInputElement> document.getElementById("program_segmentation_type_id");
// 	const program_duration_flag = <HTMLInputElement> document.getElementById("program_duration_flag");
// 	const program_segmentation_duration_min = <HTMLInputElement> document.getElementById("program_segmentation_duration_min");
// 	const program_segmentation_duration_max = <HTMLInputElement> document.getElementById("program_segmentation_duration_max");
// 	const program_output_segmentation_duration_min = <HTMLInputElement> document.getElementById("program_output_segmentation_duration_min");
// 	const program_output_segmentation_duration_max = <HTMLInputElement> document.getElementById("program_output_segmentation_duration_max");


// 	const providerad_splice_comand_type_start = <HTMLInputElement> document.getElementById("providerad_splice_comand_type_start");
// 	const providerad_segmentation_type_id = <HTMLInputElement> document.getElementById("providerad_segmentation_type_id");
// 	const providerad_duration_flag = <HTMLInputElement> document.getElementById("providerad_duration_flag");
// 	const providerad_segmentation_duration_min = <HTMLInputElement> document.getElementById("providerad_segmentation_duration_min");
// 	const providerad_segmentation_duration_max = <HTMLInputElement> document.getElementById("providerad_segmentation_duration_max");
// 	const providerad_output_segmentation_duration_max = <HTMLInputElement> document.getElementById("providerad_output_segmentation_duration_max");
// 	const providerad_output_segmentation_duration_min = <HTMLInputElement> document.getElementById("providerad_output_segmentation_duration_min");
// 	const national_expected_splices_hour = <HTMLInputElement> document.getElementById("national_expected_splices_hour");
// 	const national_break_action = <HTMLInputElement> document.getElementById("national_break_action");
// 	const national_splice_command_start = <HTMLInputElement> document.getElementById("national_splice_command_start");
// 	const national_segmentation_type_id_start = <HTMLInputElement> document.getElementById("national_segmentation_type_id_start");
// 	const national_splice_immediate_flag = <HTMLInputElement> document.getElementById("national_splice_immediate_flag");
// 	const national_break_splice_event_id = <HTMLInputElement> document.getElementById("national_break_splice_event_id");
// 	const national_break_duration_flag = <HTMLInputElement> document.getElementById("national_break_duration_flag");
// 	const national_break_duration_min = <HTMLInputElement> document.getElementById("national_break_duration_min");
// 	const national_break_duration_max = <HTMLInputElement> document.getElementById("national_break_duration_max");
// 	const national_break_auto_return = <HTMLInputElement> document.getElementById("national_break_auto_return");
// 	const national_break_output_splice_immediate_flag = <HTMLInputElement> document.getElementById("national_break_output_splice_immediate_flag");
// 	const national_break_output_splice_event_id = <HTMLInputElement> document.getElementById("national_break_output_splice_event_id");
// 	const national_break_output_duration_flag = <HTMLInputElement> document.getElementById("national_break_output_duration_flag");
// 	const national_break_output_break_duration_min = <HTMLInputElement> document.getElementById("national_break_output_break_duration_min");
// 	const national_break_output_break_duration_max = <HTMLInputElement> document.getElementById("national_break_output_break_duration_max");

// 	const national_break_output_break_auto_return = <HTMLInputElement> document.getElementById("national_break_output_break_auto_return");
// 	const national_break_splice_command = <HTMLInputElement> document.getElementById("national_break_splice_command");
// 	const national_segmentation_type_id_end = <HTMLInputElement> document.getElementById("national_segmentation_type_id_end");
// 	const national_break_end_input_trigger = <HTMLInputElement> document.getElementById("national_break_end_input_trigger");
// 	const national_break_end_input_splice_immediate_flag = <HTMLInputElement> document.getElementById("national_break_end_input_splice_immediate_flag");
// 	const national_break_end_input_splice_event_id = <HTMLInputElement> document.getElementById("national_break_end_input_splice_event_id");
// 	const national_break_end_output_splice_immediate_flag = <HTMLInputElement> document.getElementById("national_break_end_output_splice_immediate_flag");
// 	const national_break_end_output_splice_event_id = <HTMLInputElement> document.getElementById("national_break_end_output_splice_event_id");
// 	const national_break_end_devation_tolerance = <HTMLInputElement> document.getElementById("national_break_end_devation_tolerance");

// 	let newConfig = {
// 		"network_id": this.NetworkNamesService.getName()
// 		,"validation_frequency": validation_frequency.value
	
// 	let newConfig = {
// 		"emails": emails
// 		,"network_id": this.NetworkNamesService.getName()
// 		,"localbreak": [local_expected_splices_hour.value,local_splice_command_start.value,local_break_action.value,local_splice_immidiate_flag.value,local_break_splice_event_id.value,
// 			local_break_duration_flag.value, local_break_duration_min.value,local_break_duration_max.value,local_break_auto_return.value,local_break_output_splice_immidiate_flag.value,
// 			local_break_output_splice_event_id.value,local_break_output_duration_flag.value,local_break_output_break_duration_min.value, local_break_output_break_duration_max.value,
// 			local_break_output_break_auto_return.value, local_break_splice_command.value, local_break_end_input_trigger.value,
// 			local_break_end_input_splice_immidiate_flag.value,local_break_end_input_splice_event_id.value,local_break_end_output_splice_immediate_flag.value,
// 			local_break_end_output_splice_event_id.value,local_break_end_devation_tolerance.value]
// 		,"contentid":[content_id_splice_command_type_start.value, content_id_segmentation_type_id.value]
// 		,"placement":[placement_splice_comand_type_start.value,placement_segmentation_type_id.value,placement_duration_flag.value,placement_segmentation_duration_min.value,
// 			placement_segmentation_duration_max.value,placement_output_segmentation_duration_min.value,placement_output_segmentation_duration_max.value]
// 		,"pro":[program_splice_comand_type_start.value,program_segmentation_type_id.value,program_duration_flag.value,program_segmentation_duration_min.value,program_segmentation_duration_max.value,
// 			program_output_segmentation_duration_min.value,program_output_segmentation_duration_max.value]	
// 		,"providerad":[providerad_splice_comand_type_start.value, providerad_segmentation_type_id.value,providerad_duration_flag.value,providerad_segmentation_duration_min.value,providerad_segmentation_duration_max.value,
// 			providerad_output_segmentation_duration_min.value,providerad_output_segmentation_duration_max.value]
// 		,"nationalbreak": [national_expected_splices_hour.value,national_break_action.value,national_splice_command_start.value,national_segmentation_type_id_start.value,national_splice_immediate_flag.value,national_break_splice_event_id.value,
// 			national_break_duration_flag.value, national_break_duration_min.value,national_break_duration_max.value,national_break_auto_return.value,national_break_output_splice_immediate_flag.value,
// 			national_break_output_splice_event_id.value,national_break_output_duration_flag.value,national_break_output_break_duration_min.value, national_break_output_break_duration_max.value,
// 			national_break_output_break_auto_return.value, national_break_splice_command.value,national_segmentation_type_id_end.value, national_break_end_input_trigger.value,
// 			national_break_end_input_splice_immediate_flag.value,national_break_end_input_splice_event_id.value,national_break_end_output_splice_immediate_flag.value,
// 			national_break_end_output_splice_event_id.value,national_break_end_devation_tolerance.value]
		
// 	}
// 	console.log('Test Save ');
// 	let postHeaders = new HttpHeaders({'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*'})
// 	return this.HttpClient.put("http://127.0.0.1:8000/update/"+ this.NetworkNamesService.getName(), newConfig ,{headers: postHeaders}).
// 	subscribe(Response => console.log(Response));
	
//   }

  

// 		,"program":[program_splice_comand_type_start.value,program_segmentation_type_id.value,program_duration_flag.value,program_segmentation_duration_min.value,program_segmentation_duration_max.value,
// 			program_output_segmentation_duration_min.value,program_output_segmentation_duration_max.value]	
// 		,"providerad":[providerad_splice_comand_type_start.value, providerad_segmentation_type_id.value,providerad_duration_flag.value,providerad_segmentation_duration_min.value,providerad_segmentation_duration_max.value,
// 			providerad_output_segmentation_duration_min.value,providerad_output_segmentation_duration_max.value]
// 	}
// 	let postHeaders = new HttpHeaders({'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*'})
// 	return this.HttpClient.put("http://127.0.0.1:8000/update/"+ this.NetworkNamesService.getName(), newConfig ,{headers: postHeaders}).
// 	subscribe(Response => console.log(Response));
//   }
  
  buttonCheck(){
	const button = <HTMLInputElement> document.getElementById("check_local_break_component");
	console.log(button.value)

  }
  saveChange( 
	recipient_emails: string, frequency: string, network_id: string, local_break: string, 
	expected_splices_hour: string, validate_splice_count: string, local_break_start: string, 
	splice_command_type: string, action: string, input_trigger: string, splice_event_id: string, 
	out_of_network_indicator: string, duration_flag: string, splice_immediate_flag: string, 
	break_auto_return: string, break_duration_min: string, break_duration_max: string, 
	output_trigger: string, local_break_end: string, break_duration_deviation_tolerance: string 
	) {
	console.log(recipient_emails);
	let newConfig = {
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
	return this.HttpClient.put("http://127.0.0.1:8000/update/"+ this.NetworkNamesService.getName(), newConfig ,{headers: postHeaders}).
	subscribe(Response => console.log(Response));
  }

  saveNetwork() {
	const network_id = <HTMLInputElement> document.getElementById("network_id");
	  let newNetwork = {
		  "network_id": network_id.value
	  }
	let postHeaders = new HttpHeaders({'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*'})
	this.HttpClient.put("http://127.0.0.1:8000/update/"+ this.NetworkNamesService.getName(), newNetwork ,{headers: postHeaders}).
	subscribe(Response => console.log(Response));
	this.router.navigate(['/dashboard']);
  } 

//   function validateForm() {
// 	var x = document.forms["myForm"]["network"].value;
// 	if (x == "" || x == null) {
// 	  alert("Name must be filled out");
// 	  return false;
//   }
//   }

	validateForm(): boolean {
  var x = document.forms["myForm"]["network"].value;
  if (x == "" || x == null) {
    alert("Name must be filled out");
    return false;
  }
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
	  else if(templateType == "content_id" && !this.existingTemplates.includes("content_id")) {
		let template = this.LoadJsonService.addContentId({})
		let templateObject = <KeyObject> {key: "content_id", path: "config.value[4]", type: "contentId", value: [template]}
		this.config.value.splice(4, 0, templateObject)
		this.existingTemplates.push("content_id")
	  }
	  else if(templateType == "placement_opportunity" && !this.existingTemplates.includes("placement_opportunity")) {
		let template = this.LoadJsonService.addContentId({})
		let templateObject = <KeyObject> {key: "placement_opportunity", path: "config.value[5]", type: "placementOpportunity", value: [template]}
		this.config.value.splice(5, 0, templateObject)
		this.existingTemplates.push("placement_opportunity")
	  }
	  else if(templateType == "program" && !this.existingTemplates.includes("program")) {
		let template = this.LoadJsonService.addContentId({})
		let templateObject = <KeyObject> {key: "program", path: "config.value[6]", type: "Program", value: [template]}
		this.config.value.splice(6, 0, templateObject)
		this.existingTemplates.push("program")
	  }
	  else if(templateType == "provider_ad" && !this.existingTemplates.includes("provider_ad")) {
		let template = this.LoadJsonService.addContentId({})
		let templateObject = <KeyObject> {key: "provider_ad", path: "config.value[7]", type: "providerAd", value: [template]}
		this.config.value.splice(7, 0, templateObject)
		this.existingTemplates.push("provider_ad")
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
		if(node.key == "local_break", "content_id", "placement_opportunity", "program", "provider_ad") {
			console.log(node.value[0])
      		result += '"local_break", "content_id", "placement_opportunity", "program", "provider_ad":'
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