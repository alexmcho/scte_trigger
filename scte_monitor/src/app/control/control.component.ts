import { Component, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ViewChild, OnInit, Type, ɵConsole } from '@angular/core';
import { LoadJsonService } from '../load-json.service';
import { KeyObject } from "../key-value";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NetworkNamesService } from '../network-names.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LbcComponent } from '../lbc/lbc.component';
import { CicComponent } from '../cic/cic.component';
import { PcComponent } from '../pc/pc.component';
import { NbcComponent } from '../nbc/nbc.component';
import { HostListener } from '@angular/core';

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

  listOfOptionsForActions = ["NOOP","DELETE","REPLACE"]
  listOfOptionsForBoolean = ["false","true"]

  listOfSpliceCommandType = ["5","6"]
  
  //filtering list
  action1:String [] = []
  action2:String [] = []
  action3:String [] = []
  action4:String [] = []

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
  bool13:String [] = []
  bool14:String [] = []
  bool15:String [] = []
  bool16:String [] = []
  bool17:String [] = []
  bool18:String [] = []
  bool19:String [] = []
  bool20:String [] = []
  bool21:String [] = []
  bool22:String [] = []
  bool23:String [] = []
  bool24:String [] = []
  bool25:String [] = []
  bool26:String [] = []
  bool27:String [] = []
  bool28:String [] = []
  bool29:String [] = []
  bool30:String [] = []
  bool31:String [] = []
  bool32:String [] = []
  bool33:String [] = []
  bool34:String [] = []
  bool35:String [] = []
  bool36:String [] = []
  bool37:String [] = []
  bool38:String [] = []
  bool39:String [] = []
  bool40:String [] = []
  bool41:String [] = []
  bool42:String [] = []
  bool43:String [] = []
  bool44:String [] = []
  bool45:String [] = []
  bool46:String [] = []
  bool47:String [] = []
  bool48:String [] = []

  validatesplice1:String [] = []
  command1:String [] = []
  command2:String [] = []
  command3:String [] = []
  command4:String [] = []
  segmentationtype1:String [] = []
  segmentationtype2:String [] = []
  segmentationtype3:String [] = []
  segmentationtype4:String [] = []
  event1:String [] = []
  event2:String [] = []
  event3:String [] = []
  event4:String [] = []
  breakduration1:String [] = []
  breakduration2:String [] = []
  breakduration3:String [] = []
  breakduration4:String [] = []
  deviation1:String [] = []

  spliceCommand1:String [] = []
  spliceCommand2:String [] = []
  
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

  htmlAction1;
  htmlAction2;
  
  htmlBool1;
  htmlBool2;
  htmlBool3;
  htmlBool4;
  htmlBool5;
  htmlBool6;
  htmlBool7;
  htmlBool8;
  htmlBool9;
  htmlBool10;
  htmlBool11;
  htmlBool12;
  htmlBool13;
  htmlBool14;

  htmlSplice1;
  htmlSplice2;
  
  localIsOn:boolean = false;
  contentIsOn:boolean = false;
  providerIsOn:boolean = false;
  placementIsOn:boolean = false;
  programIsOn:boolean = false;
  nationalIsOn:boolean = false;

  public startOutput: boolean;
  public endOutput: boolean;

form:FormGroup;
public formSubmitAttempt: boolean;

  closeResult = ''; 

  @ViewChild('viewContainerRef', { read: ViewContainerRef }) VCR: ViewContainerRef;
  index = [];
  componentsReferences = Array<ComponentRef<any>>();
  localbreak_index: number = 3;
  contentid_index: number = 4;
  placementopportunity_index: number = 5;
  program_index: number = 6;
  providerad_index: number = 7;
  nationalbreak_index: number = 8;
  networklink: String;
  contentIdViewCheck:boolean;
  localBreakViewCheck:boolean;
  programViewCheck:boolean;
  nationalBreakViewCheck:boolean;

  constructor(private LoadJsonService: LoadJsonService, private CFR: ComponentFactoryResolver, private modalService: NgbModal, private NetworkNamesService:NetworkNamesService, private HttpClient: HttpClient, private router:Router, private formBuilder: FormBuilder) {
	let url = "http://127.0.0.1:8000/get/"+ this.NetworkNamesService.getName();
	console.log(this.NetworkNamesService.getName())
	console.log(this.networklink)

    this.LoadJsonService.getConfig(url).subscribe(data => {
		this.config = data;
		var stringChecker:String;
		
		var list = [this.action1, this.action2]
		var list2 = [this.bool1, this.bool2, this.bool3, this.bool4, this.bool5,
		this.bool6, this.bool7, this.bool8, this.bool9, this.bool10, this.bool11,this.bool12, this.bool13, this.bool14]

		// var list3 = [
			// this.validatesplice1, <option *ngFor='let options of validatesplice1' [value]="options">{{options}}</option>
			// this.command1, 
			// this.command2, 
			// this.command3, 
			// this.command4, 
			// this.segmentationtype1, <option *ngFor='let options of segmentationtype1' [value]="options">{{options}}</option>
			// this.segmentationtype2, <option *ngFor='let options of segmentationtype2' [value]="options">{{options}}</option>
			// this.segmentationtype3, <option *ngFor='let options of segmentationtype3' [value]="options">{{options}}</option>
			// this.segmentationtype4, <option *ngFor='let options of segmentationtype4' [value]="options">{{options}}</option>
			// this.event1, 
			// this.event2, 
			// this.event3, 
			// this.event4, 
			// this.breakduration1, <option *ngFor='let options of breakduration1' [value]="options">{{options}}</option>
			// this.breakduration2, <option *ngFor='let options of breakduration2' [value]="options">{{options}}</option>
			// this.breakduration3, <option *ngFor='let options of breakduration3' [value]="options">{{options}}</option>
			// this.breakduration4, <option *ngFor='let options of breakduration4' [value]="options">{{options}}</option>
			// this.deviation1 <option *ngFor='let options of deviation1' [value]="options">{{options}}</option>
		// ]
		var list3 =[this.spliceCommand1] 
		this.spliceCommand1.push(this.config.value[0].value[4].value[2])

		this.htmlSplice1 = this.config.value[0].value[4].value[2]

		//Local Break - 
		this.action1.push(this.config.value[0].value[4].value[1])
		this.action2.push(this.config.value[0].value[4].value[18])

		this.htmlAction1 = this.config.value[0].value[4].value[1]
		this.htmlAction2 = this.config.value[0].value[4].value[18]

		this.bool1.push(this.config.value[0].value[4].value[3])
		this.bool2.push(this.config.value[0].value[4].value[5])
		this.bool3.push(this.config.value[0].value[4].value[6])
		this.bool4.push(this.config.value[0].value[4].value[9])
		this.bool5.push(this.config.value[0].value[4].value[10])
		this.bool6.push(this.config.value[0].value[4].value[11])
		this.bool7.push(this.config.value[0].value[4].value[13])
		this.bool8.push(this.config.value[0].value[4].value[14])
		this.bool9.push(this.config.value[0].value[4].value[17])
		this.bool10.push(this.config.value[0].value[4].value[20])
		this.bool11.push(this.config.value[0].value[4].value[22])
		this.bool12.push(this.config.value[0].value[4].value[23])
		this.bool13.push(this.config.value[0].value[4].value[25])
		this.bool14.push(this.config.value[0].value[4].value[26])

		this.htmlBool1 = this.config.value[0].value[4].value[3]
		this.htmlBool2 = this.config.value[0].value[4].value[5]
		this.htmlBool3 = this.config.value[0].value[4].value[6]
		this.htmlBool4 = this.config.value[0].value[4].value[9]
		this.htmlBool5 = this.config.value[0].value[4].value[10]
		this.htmlBool6 = this.config.value[0].value[4].value[11]
		this.htmlBool7 = this.config.value[0].value[4].value[13]
		this.htmlBool8 = this.config.value[0].value[4].value[14]
		this.htmlBool9 = this.config.value[0].value[4].value[17]
		this.htmlBool10 = this.config.value[0].value[4].value[20]
		this.htmlBool11 = this.config.value[0].value[4].value[22]
		this.htmlBool12 = this.config.value[0].value[4].value[23]
		this.htmlBool13 = this.config.value[0].value[4].value[25]
		this.htmlBool14 = this.config.value[0].value[4].value[26]


		// //validate splice count
		// this.validatesplice1.push(this.config.value[0].value[4].value[0])
		// //command type 
		// this.command1.push(this.config.value[0].value[4].value[2])
		// this.command2.push(this.config.value[0].value[4].value[11])
		// this.command3.push(this.config.value[0].value[4].value[21])
		// this.command4.push(this.config.value[0].value[4].value[27])
		// //segmentation type id 
		// this.segmentationtype1.push(this.config.value[0].value[4].value[3])
		// this.segmentationtype2.push(this.config.value[0].value[4].value[12])
		// this.segmentationtype3.push(this.config.value[0].value[4].value[22])
		// this.segmentationtype4.push(this.config.value[0].value[4].value[28])
		// //splice event id 
		// this.event1.push(this.config.value[0].value[4].value[5])
		// this.event2.push(this.config.value[0].value[4].value[14])
		// this.event3.push(this.config.value[0].value[4].value[24])
		// this.event4.push(this.config.value[0].value[4].value[31])
		// //Break Duration
		// this.breakduration1.push(this.config.value[0].value[4].value[8])
		// this.breakduration2.push(this.config.value[0].value[4].value[9])
		// this.breakduration3.push(this.config.value[0].value[4].value[17])
		// this.breakduration4.push(this.config.value[0].value[4].value[18])
		// //break end deviation 
		// this.deviation1.push(this.config.value[0].value[4].value[33])

		
		//ContentId - 
		this.bool19.push(this.config.value[0].value[5].value[2])
		this.bool20.push(this.config.value[0].value[5].value[3])
		this.bool21.push(this.config.value[0].value[5].value[4])
		this.bool21.push(this.config.value[0].value[5].value[5])
		this.bool22.push(this.config.value[0].value[5].value[8])
		
		//Program - 
		this.bool23.push(this.config.value[0].value[6].value[0])
		this.bool24.push(this.config.value[0].value[6].value[3])
		this.bool24.push(this.config.value[0].value[6].value[6])
		this.bool25.push(this.config.value[0].value[6].value[7])
		this.bool26.push(this.config.value[0].value[6].value[8])
		this.bool27.push(this.config.value[0].value[6].value[13])
		this.bool28.push(this.config.value[0].value[6].value[14])
		this.bool29.push(this.config.value[0].value[6].value[15])
		this.bool30.push(this.config.value[0].value[6].value[16])
		
		//National Break - 
		this.action3.push(this.config.value[0].value[7].value[1])
		this.action4.push(this.config.value[0].value[7].value[20])
		this.bool31.push(this.config.value[0].value[7].value[4])
		this.bool32.push(this.config.value[0].value[7].value[6])
		this.bool33.push(this.config.value[0].value[7].value[7])
		this.bool34.push(this.config.value[0].value[7].value[10])
		this.bool35.push(this.config.value[0].value[7].value[13])
		this.bool36.push(this.config.value[0].value[7].value[15])
		this.bool37.push(this.config.value[0].value[7].value[16])
		this.bool38.push(this.config.value[0].value[7].value[19])
		this.bool39.push(this.config.value[0].value[7].value[23])
		this.bool40.push(this.config.value[0].value[7].value[25])
		this.bool41.push(this.config.value[0].value[7].value[26])
		this.bool42.push(this.config.value[0].value[7].value[29])
		this.bool43.push(this.config.value[0].value[7].value[30])
		this.bool44.push(this.config.value[0].value[7].value[32])
		

		//Local Break and National Break

		// Splice Command Type - (5 or 6) - Changes Available Parameters: 
		// {{item.value[2]}}
		// {{item.value[11]}} - unused - refers to value [2]
		// {{item.value[21]}} - unused - refers to value [2]
		// {{item.value[27]}} - unused - refers to value[2]
		
		// Segmentation Type id: 
		// {{item.value[3]}} - Placement Opportunity Start 
		// {{item.value[12]}} - Placement Opportunity Start 
		// {{item.value[22]}} - Placement Opportunity End 
		// {{item.value[28]}} - Placement Opportunity End 

		// Splice Event Id - (Must Be Numeric or Not Numeric): 
		// {{item.value[5]}} - 'isnumeric'
		// {{item.value[14]}} - 'isnumeric'
		// {{item.value[24]}} - 'isnumeric'
		// {{item.value[31]}}  - 'isnumeric'

		// Regular Number Values:
		// {{item.value[0]}} - validate splice count
		// {{item.value[33]}} - Deviation Tolerance
		
		// Break Duration - (Also Regular Number Values): 
		// {{item.value[8]}} - start input Break duration min 
		// {{item.value[9]}} - start input Break duration max
		// {{item.value[17]}} - start output Break duration min 
		// {{item.value[18]}} - start output Break duration max 

		//ContentId
		// {{item.value[0]}} - Segmentation Type Id
		// {{item.value[1]}} - Splice Command Type - Will always be 5 
		// {{item.value[6]}} - Segmentation UPID Type 
		// {{item.value[7]}} - Segmentation UPID Length 

		//Program
		// Splice Command Type - (Will always be 6)
		// {{item.value[2]}} - Input Trigger
		// {{item.value[12]}} - Output Trigger

		// Segmentation Type id: 
		// {{item.value[1]}} - Input Trigger
		// {{item.value[11]}} - Output Trigger

		// Segmentation Duration: 
		// {{item.value[4]}} - Segmentation Duration min 
		// {{item.value[5]}} - Segmentation Duration max 

		// Segmentation UPID Type: 
		// {{item.value[9]}} - Input Trigger
		// {{item.value[17]}} - Output Trigger

		// Segmentation UPID Length:
		// {{item.value[10]}} - Input Trigger
		// {{item.value[18]}} - Output Trigger
		
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
		for(let i = 0; i < list3.length; i++){
			for(let j = 0; j < 2; j++)
			if(list3[i].indexOf(this.listOfSpliceCommandType[j]) == -1){
				list3[i].push(this.listOfSpliceCommandType[j])
			}
		}
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
  
	removeLocal() {
		// var T = document.getElementById("RemoveLocal");
		// T.style.display = "none";  // <-- Set it to block
		var T = document.getElementById("localBreak");
		(T as HTMLElement).remove();
		this.localIsOn = false; 
		this.localBreakViewCheck = false;
	}

	removeContent() {
		// var T = document.getElementById("RemoveContent");
		// T.style.display = "none";  // <-- Set it to block
		var T = document.getElementById("contentId");
		(T as HTMLElement).remove();
		this.contentIsOn = false; 
		this.contentIdViewCheck = false;
	}

	removePlacement() {
		var T = document.getElementById("RemovePlacement");
		T.style.display = "none";  // <-- Set it to block
	}

	removeProgram() {
		// var T = document.getElementById("RemoveProgram");
		// T.style.display = "none";  // <-- Set it to block
		var T = document.getElementById("pro");
		(T as HTMLElement).remove();
		this.programIsOn = false; 
		this.programViewCheck = false;
	}

	removeProvider() {
		var T = document.getElementById("RemoveProvider");
		T.style.display = "none";  // <-- Set it to block
	}

	removeNational() {
		// var T = document.getElementById("RemoveNational");
		// T.style.display = "none";  // <-- Set it to block
		var T = document.getElementById("nationalBreak");
		(T as HTMLElement).remove();
		this.nationalIsOn = false; 
		this.nationalBreakViewCheck = false;
	}
  
  createLocalBreakComponent() {
	// let componentFactory = this.CFR.resolveComponentFactory(LbcComponent);
    // let childComponentRef = this.VCR.createComponent(componentFactory);
	// let childComponent = childComponentRef.instance;
	
    // childComponent.index = ++this.localbreak_index;
	// childComponent.parentRef = this;
	let localAlreadyThere:Boolean = false;
	  
	const localBreakTrue = <HTMLInputElement> document.getElementById("localBreakTrue");
	if(localBreakTrue.value  == "true"){
		localAlreadyThere = true;
	}
	
	if(!this.localIsOn && !localAlreadyThere){
		this.localIsOn = true;
		this.localBreakViewCheck = true;
		let componentFactory = this.CFR.resolveComponentFactory(LbcComponent);
		let childComponentRef = this.VCR.createComponent(componentFactory);
		let childComponent = childComponentRef.instance;
		
		childComponent.index = ++this.localbreak_index;

		// childComponent.parentRef = this;
	
		// add reference for newly created component
		// this.componentsReferences.push(childComponentRef);
		}
	
  }
  
  createContentIdComponent() {
	  //checking if view already has contentid
	  //if not allow a new content id
	 let contentAlreadyThere:Boolean = false;
	  
	const contentIdTrue = <HTMLInputElement> document.getElementById("contentIdTrue");
	if(contentIdTrue.value  == "true"){
		contentAlreadyThere = true;
	}

	if(!this.contentIsOn && !contentAlreadyThere){
		this.contentIsOn = true;
		this.contentIdViewCheck = true;
		let componentFactory = this.CFR.resolveComponentFactory(CicComponent);
		  let childComponentRef = this.VCR.createComponent(componentFactory);
		let childComponent = childComponentRef.instance;
		
		  childComponent.index = ++this.contentid_index;

		  // childComponent.parentRef = this;
	  
		  // add reference for newly created component
		// this.componentsReferences.push(childComponentRef);
		}
  }
  
  
  createProgramComponent() {
	// let componentFactory = this.CFR.resolveComponentFactory(PcComponent);
    // let childComponentRef = this.VCR.createComponent(componentFactory);
	// let childComponent = childComponentRef.instance;
	
    // childComponent.index = ++this.program_index;
	// childComponent.parentRef = this;
	let programAlreadyThere:Boolean = false;
	  
	const programTrue = <HTMLInputElement> document.getElementById("programTrue");
	if(programTrue.value  == "true"){
		programAlreadyThere = true;
	}

	if(!this.programIsOn && !programAlreadyThere){
		this.programIsOn = true;
		this.programViewCheck = true;
		let componentFactory = this.CFR.resolveComponentFactory(PcComponent);
		let childComponentRef = this.VCR.createComponent(componentFactory);
		let childComponent = childComponentRef.instance;
		
		childComponent.index = ++this.program_index;

		// childComponent.parentRef = this;
	
		// add reference for newly created component
		// this.componentsReferences.push(childComponentRef);
		}
  }


  createNationalBreakComponent() {
	// let componentFactory = this.CFR.resolveComponentFactory(NbcComponent);
    // let childComponentRef = this.VCR.createComponent(componentFactory);
	// let childComponent = childComponentRef.instance;
	
    // childComponent.index = ++this.providerad_index;
	// childComponent.parentRef = this;
	let nationalAlreadyThere:Boolean = false;
	  
	const nationalBreakTrue = <HTMLInputElement> document.getElementById("nationalBreakTrue");
	if(nationalBreakTrue.value  == "true"){
		nationalAlreadyThere = true;
	}

	if(!this.nationalIsOn && !nationalAlreadyThere){
		this.nationalIsOn = true;
		this.nationalBreakViewCheck = true;
		let componentFactory = this.CFR.resolveComponentFactory(NbcComponent);
		let childComponentRef = this.VCR.createComponent(componentFactory);
		let childComponent = childComponentRef.instance;
		
		childComponent.index = ++this.nationalbreak_index;

		// childComponent.parentRef = this;
	
		// add reference for newly created component
		// this.componentsReferences.push(childComponentRef);
		}
  }

  ngOnInit(): void {
  console.log(this.config)
  this.form = this.formBuilder.group({
		"emails":  [null, [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
		"network_id":  [null, [Validators.required, Validators.pattern("")]]
	})
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

  saveLocalBreak() {
	
	const validate_splice_count = <HTMLInputElement> document.getElementById("validate_splice_count");
	const validate_splice_count2 = <HTMLInputElement> document.getElementById("validate_splice_count2");
	const localBreakEndSwitch = <HTMLInputElement> document.getElementById("localBreakEndSwitch");

	const emails = <HTMLInputElement> document.getElementById("emails");
	const validation_frequency = <HTMLInputElement> document.getElementById("validation_frequency");

	const localBreakTrue = <HTMLInputElement> document.getElementById("localBreakTrue");
	const local_break_expected_splices_hour = <HTMLInputElement> document.getElementById("local_break_expected_splices_hour");

	const local_break_start_input_action = <HTMLInputElement> document.getElementById("local_break_start_input_action");
	const local_break_start_input_splice_command = <HTMLInputElement> document.getElementById("local_break_start_input_splice_command");
	const local_break_start_input_segmentation_type_id = <HTMLInputElement> document.getElementById("local_break_start_input_segmentation_type_id");
	const local_break_start_input_out_of_network_indicator = <HTMLInputElement> document.getElementById("local_break_start_input_out_of_network_indicator");
	const local_break_start_input_splice_event_id = <HTMLInputElement> document.getElementById("local_break_start_input_splice_event_id");
	const local_break_start_input_splice_immediate_flag = <HTMLInputElement> document.getElementById("local_break_start_input_splice_immediate_flag");
	const local_break_start_input_duration_flag = <HTMLInputElement> document.getElementById("local_break_start_input_duration_flag");
	const local_break_start_input_break_duration_min = <HTMLInputElement> document.getElementById("local_break_start_input_break_duration_min");
	const local_break_start_input_break_duration_max = <HTMLInputElement> document.getElementById("local_break_start_input_break_duration_max");
	const local_break_start_input_break_auto_return = <HTMLInputElement> document.getElementById("local_break_start_input_break_auto_return");

	const local_break_start_output_splice_command = <HTMLInputElement> document.getElementById("local_break_start_output_splice_command");
	const local_break_start_output_segmentation_type_id = <HTMLInputElement> document.getElementById("local_break_start_output_segmentation_type_id");
	const local_break_start_output_out_of_network_indicator = <HTMLInputElement> document.getElementById("local_break_start_output_out_of_network_indicator");
	const local_break_start_output_splice_event_id = <HTMLInputElement> document.getElementById("local_break_start_output_splice_event_id");
	const local_break_start_output_splice_immediate_flag = <HTMLInputElement> document.getElementById("local_break_start_output_splice_immediate_flag");
	const local_break_start_output_duration_flag = <HTMLInputElement> document.getElementById("local_break_start_output_duration_flag");
	const local_break_start_output_break_duration_min = <HTMLInputElement> document.getElementById("local_break_start_output_break_duration_min");
	const local_break_start_output_break_duration_max = <HTMLInputElement> document.getElementById("local_break_start_output_break_duration_max");
	const local_break_start_output_break_auto_return = <HTMLInputElement> document.getElementById("local_break_start_output_break_auto_return");

	const local_break_duration_flag = <HTMLInputElement> document.getElementById("local_break_duration_flag");

	const local_break_end_input_action = <HTMLInputElement> document.getElementById("local_break_end_input_action");
	const local_break_end_input_splice_command = <HTMLInputElement> document.getElementById("local_break_end_input_splice_command");
	const local_break_end_input_segmentation_type_id = <HTMLInputElement> document.getElementById("local_break_end_input_segmentation_type_id");
	const local_break_end_input_out_of_network_indicator = <HTMLInputElement> document.getElementById("local_break_end_input_out_of_network_indicator");
	const local_break_end_input_splice_event_id = <HTMLInputElement> document.getElementById("local_break_end_input_splice_event_id");
	const local_break_end_input_splice_immediate_flag = <HTMLInputElement> document.getElementById("local_break_end_input_splice_immediate_flag");
	const local_break_end_input_break_duration_flag = <HTMLInputElement> document.getElementById("local_break_end_input_break_duration_flag");
	
	const local_break_end_output_splice_command = <HTMLInputElement> document.getElementById("local_break_end_output_splice_command");
	const local_break_end_output_segmentation_type_id = <HTMLInputElement> document.getElementById("local_break_end_output_segmentation_type_id");
	const local_break_end_output_out_of_network_indicator = <HTMLInputElement> document.getElementById("local_break_end_output_out_of_network_indicator");
	const local_break_end_output_splice_immediate_flag = <HTMLInputElement> document.getElementById("local_break_end_output_splice_immediate_flag");
	const local_break_end_output_splice_event_id = <HTMLInputElement> document.getElementById("local_break_end_output_splice_event_id");
	const local_break_end_output_break_duration_flag = <HTMLInputElement> document.getElementById("local_break_end_output_break_duration_flag");
	const local_break_end_deviation_tolerance = <HTMLInputElement> document.getElementById("local_break_end_deviation_tolerance");

	//5
	const end_splice_command = <HTMLInputElement> document.getElementById("end_splice_command");
	const end_out_of_network = <HTMLInputElement> document.getElementById("end_out_of_network");
	const end_splice_event_id = <HTMLInputElement> document.getElementById("end_splice_event_id");
	const end_immidiate_flag = <HTMLInputElement> document.getElementById("end_immidiate_flag");
	const end_duration_flag = <HTMLInputElement> document.getElementById("end_duration_flag");

	const end_output_splice_command = <HTMLInputElement> document.getElementById("end_output_splice_command");
	const end_output_out_of_network = <HTMLInputElement> document.getElementById("end_output_out_of_network");
	const end_output_splice_event_id = <HTMLInputElement> document.getElementById("end_output_splice_event_id");
	const end_output_immediate_flag = <HTMLInputElement> document.getElementById("end_output_immediate_flag");
	const end_output_duration_flag = <HTMLInputElement> document.getElementById("end_output_duration_flag");

	const end_deviation_tolerance = <HTMLInputElement> document.getElementById("end_deviation_tolerance");
	
	
	//6
	const end_segmentation_id = <HTMLInputElement> document.getElementById("end_segmentation_id");
	const end_output_segmentation_id = <HTMLInputElement> document.getElementById("end_segmentation_id");

	try{
		if(localBreakTrue.value  == "true"){
			this.localBreakViewCheck = true
		}
	}catch{}
	

	// console.log(this.localBreakViewCheck)
	if(this.localBreakViewCheck){
		if (this.localIsOn || localBreakTrue.value) {
			let localBreakArray = []

			let seg5start: boolean = false 
			try {
				local_break_start_input_action.value 
				seg5start = true 
			}catch {
				seg5start = false 
			}

			if(validate_splice_count.checked == true && seg5start){
				if(local_break_start_input_splice_command.value == "5" && local_break_start_input_action.value == "NOOP" || local_break_start_input_action.value == "DELETE"){
					if(local_break_start_input_duration_flag.value == "true"){
						localBreakArray= [
							local_break_expected_splices_hour.value,local_break_start_input_action.value,local_break_start_input_splice_command.value,
							local_break_start_input_out_of_network_indicator.value,local_break_start_input_splice_event_id.value,
							local_break_start_input_splice_immediate_flag.value,local_break_start_input_duration_flag.value,local_break_start_input_break_duration_min.value,
							local_break_start_input_break_duration_max.value,local_break_start_input_break_auto_return.value]
					}		
				}
				if(local_break_start_input_splice_command.value == "5" && local_break_start_input_action.value == "NOOP" || local_break_start_input_action.value == "DELETE"){
					if(local_break_start_input_duration_flag.value == "false"){
						localBreakArray= [
							local_break_expected_splices_hour.value,
							local_break_start_input_action.value,
							local_break_start_input_splice_command.value,
							local_break_start_input_out_of_network_indicator.value,
							local_break_start_input_splice_event_id.value,
							local_break_start_input_splice_immediate_flag.value,
							local_break_start_input_duration_flag.value,
							local_break_start_input_break_auto_return.value
						]
					}		
				}
				if (local_break_start_input_splice_command.value == "5" && local_break_start_input_action.value == "REPLACE" ) {
					localBreakArray= [
						local_break_expected_splices_hour.value,local_break_start_input_action.value,local_break_start_input_splice_command.value,
						local_break_start_input_out_of_network_indicator.value,local_break_start_input_splice_event_id.value,
						local_break_start_input_splice_immediate_flag.value,local_break_start_input_duration_flag.value,local_break_start_input_break_duration_min.value,
						local_break_start_input_break_duration_max.value,local_break_start_input_break_auto_return.value,local_break_start_input_action.value, local_break_start_output_splice_command.value,
						local_break_start_output_out_of_network_indicator.value,local_break_start_output_splice_event_id.value,
						local_break_start_output_splice_immediate_flag.value,local_break_start_output_duration_flag.value,local_break_start_output_break_duration_min.value,
						local_break_start_output_break_duration_max.value,local_break_start_output_break_auto_return.value]
				}
				if (local_break_start_input_splice_command.value == "5" && local_break_start_input_action.value == "REPLACE" && localBreakEndSwitch.checked) {
					localBreakArray= [
						local_break_expected_splices_hour.value,

						local_break_start_input_action.value,
						
						local_break_start_input_splice_command.value,
						local_break_start_input_out_of_network_indicator.value,
						local_break_start_input_splice_event_id.value,
						local_break_start_input_splice_immediate_flag.value,
						local_break_start_input_duration_flag.value,
						local_break_start_input_break_duration_min.value,
						local_break_start_input_break_duration_max.value,
						local_break_start_input_break_auto_return.value,

						local_break_start_output_splice_command.value,
						local_break_start_output_out_of_network_indicator.value,
						local_break_start_output_splice_event_id.value,
						local_break_start_output_splice_immediate_flag.value,
						local_break_start_output_duration_flag.value,
						local_break_start_output_break_duration_min.value,
						local_break_start_output_break_duration_max.value,
						local_break_start_output_break_auto_return.value,
						
						local_break_end_input_action.value,

						local_break_end_input_splice_command.value,
						local_break_end_input_out_of_network_indicator.value,
						local_break_end_input_splice_event_id.value,
						local_break_end_input_splice_immediate_flag.value,
						local_break_end_input_break_duration_flag.value,

						local_break_end_output_splice_command.value,
						local_break_end_output_out_of_network_indicator.value,
						local_break_end_output_splice_immediate_flag.value,
						local_break_end_output_splice_event_id.value,
						local_break_end_output_break_duration_flag.value,

						local_break_end_deviation_tolerance.value

						// end_splice_command.value,
						// end_out_of_network.value,
						// end_splice_event_id.value,
						// end_immidiate_flag.value,
						// end_duration_flag.value,
						// end_output_splice_command.value,
						// end_output_out_of_network.value,
						// end_output_splice_event_id.value,
						// end_output_immediate_flag.value
						// ,end_output_duration_flag.value,
						// end_deviation_tolerance.value
					]
				}
			}
				console.log(this.localBreakViewCheck)
				if(local_break_start_input_splice_command.value == "6" && !seg5start ){
					if(local_break_start_input_duration_flag.value == "true"){
						localBreakArray= [
							local_break_expected_splices_hour.value,
							local_break_start_input_splice_command.value,
							local_break_start_input_segmentation_type_id.value,
							local_break_start_input_splice_immediate_flag.value,
							local_break_start_input_duration_flag.value,
							local_break_start_input_break_duration_min.value,
							local_break_start_input_break_duration_max.value,
							local_break_start_input_break_auto_return.value,
							local_break_start_output_splice_command.value,
							local_break_start_output_segmentation_type_id.value,
							local_break_start_output_splice_immediate_flag.value,
							local_break_start_output_duration_flag.value,
							local_break_start_output_break_duration_min.value,
							local_break_start_output_break_duration_max.value,
							local_break_start_output_break_auto_return.value,
						]
					}
				}
				if(local_break_start_input_splice_command.value == "6" ){
					if(local_break_start_input_duration_flag.value == "false"){
						localBreakArray= [
							local_break_expected_splices_hour.value,
							local_break_start_input_splice_command.value,
							local_break_start_input_segmentation_type_id.value,
							local_break_start_input_splice_immediate_flag.value,
							local_break_start_input_duration_flag.value,
							local_break_start_input_break_auto_return.value,
							local_break_start_output_splice_command.value,
							local_break_start_output_segmentation_type_id.value,
							local_break_start_output_splice_immediate_flag.value,
							local_break_start_output_duration_flag.value,
							local_break_start_output_break_auto_return.value,
						]
					}
				}
				if(local_break_start_input_splice_command.value == "6" && localBreakEndSwitch.checked ){
					if(local_break_start_input_duration_flag.value == "true"){
						localBreakArray= [
							local_break_expected_splices_hour.value,
							local_break_start_input_splice_command.value,
							local_break_start_input_segmentation_type_id.value,
							local_break_start_input_splice_immediate_flag.value,
							local_break_start_input_duration_flag.value,
							local_break_start_input_break_duration_min.value,
							local_break_start_input_break_duration_max.value,
							local_break_start_input_break_auto_return.value,
							local_break_start_output_splice_command.value,
							local_break_start_output_segmentation_type_id.value,
							local_break_start_output_splice_immediate_flag.value,
							local_break_start_output_duration_flag.value,
							local_break_start_output_break_duration_min.value,
							local_break_start_output_break_duration_max.value,
							local_break_start_output_break_auto_return.value,
							local_break_end_input_splice_command.value,
							local_break_end_input_segmentation_type_id.value,
							local_break_end_input_break_duration_flag.value,
							local_break_end_output_splice_command.value,
							local_break_end_output_segmentation_type_id.value,
							local_break_end_output_break_duration_flag.value,
							local_break_end_deviation_tolerance.value
						]
					}		
				}
				if(local_break_start_input_splice_command.value == "6" && localBreakEndSwitch.checked ){
					if(local_break_start_input_duration_flag.value == "false"){
						localBreakArray= [
							local_break_expected_splices_hour.value,
							local_break_start_input_splice_command.value,
							local_break_start_input_segmentation_type_id.value,
							local_break_start_input_splice_immediate_flag.value,
							local_break_start_input_duration_flag.value,
							local_break_start_input_break_auto_return.value,
							local_break_start_output_splice_command.value,
							local_break_start_output_segmentation_type_id.value,
							local_break_start_output_splice_immediate_flag.value,
							local_break_start_output_duration_flag.value,
							local_break_start_output_break_auto_return.value,
							local_break_end_input_splice_command.value,
							local_break_end_input_segmentation_type_id.value,
							local_break_end_input_break_duration_flag.value,
							local_break_end_output_splice_command.value,
							local_break_end_output_segmentation_type_id.value,
							local_break_end_output_break_duration_flag.value,
							local_break_end_deviation_tolerance.value
						]
					}		
				}
				
			
				
				//6 "local break end"
				// local_break_end_input_segmentation_type_id
				//local_break_end_output_segmentation_type_id
				//local_break_start_input_segmentation_type_id
				//5 "local break end"

				// local_break_end_input_out_of_network_indicator
				//local_break_end_input_splice_event_id

			
			// else{
			// 	localBreakArray= [
			// 		local_break_start_input_action.value,local_break_start_input_splice_command.value,
			// 		local_break_start_input_segmentation_type_id.value,local_break_start_input_out_of_network_indicator.value,local_break_start_input_splice_event_id.value,
			// 		local_break_start_input_splice_immediate_flag.value,local_break_start_input_duration_flag.value,local_break_start_input_break_duration_min.value,
			// 		local_break_start_input_break_duration_max.value,local_break_start_input_break_auto_return.value,local_break_start_output_splice_command.value,
			// 		local_break_start_output_segmentation_type_id.value,local_break_start_output_out_of_network_indicator.value,local_break_start_output_splice_event_id.value,
			// 		local_break_start_output_splice_immediate_flag.value,local_break_start_output_duration_flag.value,local_break_start_output_break_duration_min.value,
			// 		local_break_start_output_break_duration_max.value,local_break_start_output_break_auto_return.value,local_break_end_input_action.value,
			// 		local_break_end_input_splice_command.value,local_break_end_input_segmentation_type_id.value,local_break_end_input_out_of_network_indicator.value,
			// 		local_break_end_input_splice_event_id.value,local_break_end_input_splice_immediate_flag.value,local_break_end_input_break_duration_flag.value,
			// 		local_break_end_output_splice_command.value,local_break_end_output_segmentation_type_id.value,local_break_end_output_out_of_network_indicator.value,
			// 		local_break_end_output_splice_immediate_flag.value,local_break_end_output_splice_event_id.value,local_break_end_output_break_duration_flag.value,
			// 		local_break_end_deviation_tolerance.value]
			// }

			
			
			
			let localbreakJson = JSON.stringify(localBreakArray)
			var localbreak = JSON.parse(localbreakJson)
			
			}
			else{
			  localbreak = []
			}
		}
		else{
			localbreak = []
		}
	

	const contentIdTrue = <HTMLInputElement> document.getElementById("contentIdTrue");
	const content_id_segmentation_type_id = <HTMLInputElement> document.getElementById("content_id_segmentation_type_id");
	const content_id_splice_command_type = <HTMLInputElement> document.getElementById("content_id_splice_command_type");
	const content_id_segmentation_event_cancel_indicator = <HTMLInputElement> document.getElementById("content_id_segmentation_event_cancel_indicator");
	const content_id_program_segmentation_flag = <HTMLInputElement> document.getElementById("content_id_program_segmentation_flag");
	const content_id_segmentation_duration_flag = <HTMLInputElement> document.getElementById("content_id_segmentation_duration_flag");
	const content_id_delivery_not_restricted_flag = <HTMLInputElement> document.getElementById("content_id_delivery_not_restricted_flag");
	const content_id_segmentation_upid_type = <HTMLInputElement> document.getElementById("content_id_segmentation_upid_type");
	const content_id_segmentation_upid_length = <HTMLInputElement> document.getElementById("content_id_segmentation_upid_length");
	const content_id_time_specified_flag = <HTMLInputElement> document.getElementById("content_id_time_specified_flag");

try{
	if(contentIdTrue.value  == "true"){
		this.contentIdViewCheck = true
	}
}catch{}

if(this.contentIdViewCheck){
	if (this.contentIsOn || contentIdTrue.value) {
        let contentIdArray= [content_id_splice_command_type.value, content_id_segmentation_type_id.value, content_id_segmentation_event_cancel_indicator.value, 
            content_id_program_segmentation_flag.value, content_id_segmentation_duration_flag.value, content_id_delivery_not_restricted_flag.value, 
            content_id_segmentation_upid_type.value, content_id_segmentation_upid_length.value, content_id_time_specified_flag.value]
        
        let contentJson = JSON.stringify(contentIdArray)
        var content = JSON.parse(contentJson)
        }
        else{
          content = []
		}
	}
	else{
		content = []
	}
	

	const programTrue = <HTMLInputElement> document.getElementById("programTrue");
	const program_time_specified_flag = <HTMLInputElement> document.getElementById("program_time_specified_flag");
	const program_start_input_segmentation_type_id = <HTMLInputElement> document.getElementById("program_start_input_segmentation_type_id");
	const program_start_input_splice_command_type = <HTMLInputElement> document.getElementById("program_start_input_splice_command_type");
	const program_start_input_duration_flag = <HTMLInputElement> document.getElementById("program_start_input_duration_flag");
	const program_start_input_segmentation_duration_min = <HTMLInputElement> document.getElementById("program_start_input_segmentation_duration_min");
	const program_start_input_segmentation_duration_max = <HTMLInputElement> document.getElementById("program_start_input_segmentation_duration_max");
	const program_start_input_event_cancel_indicator = <HTMLInputElement> document.getElementById("program_start_input_event_cancel_indicator");
	const program_start_input_segmentation_flag = <HTMLInputElement> document.getElementById("program_start_input_segmentation_flag");
	const program_start_input_delivery_not_restricted_flag = <HTMLInputElement> document.getElementById("program_start_input_delivery_not_restricted_flag");
	const program_start_input_upid_type = <HTMLInputElement> document.getElementById("program_start_input_upid_type");
	const program_start_input_upid_length = <HTMLInputElement> document.getElementById("program_start_input_upid_length");

	const program_end_input_segmentation_type_id = <HTMLInputElement> document.getElementById("program_end_input_segmentation_type_id");
	const program_end_input_splice_comand_type = <HTMLInputElement> document.getElementById("program_end_input_splice_comand_type");
	const program_end_input_duration_flag = <HTMLInputElement> document.getElementById("program_end_input_duration_flag");
	const program_end_input_event_cancel_indicator = <HTMLInputElement> document.getElementById("program_end_input_event_cancel_indicator");
	const program_end_input_segmentation_flag = <HTMLInputElement> document.getElementById("program_end_input_segmentation_flag");
	const program_end_input_delivery_not_restricted_flag = <HTMLInputElement> document.getElementById("program_end_input_delivery_not_restricted_flag");
	const program_end_input_upid_type = <HTMLInputElement> document.getElementById("program_end_input_upid_type");
	const program_end_input_upid_length = <HTMLInputElement> document.getElementById("program_end_input_upid_length");

	try{
		if(programTrue.value  == "true"){
			this.programViewCheck = true
		}
	}catch{}

	if(this.programViewCheck){
		if (this.programIsOn || programTrue.value) {
			let programArray= [
				program_time_specified_flag.value,program_start_input_segmentation_type_id.value,program_start_input_splice_command_type.value,
				program_start_input_duration_flag.value,program_start_input_segmentation_duration_min.value,program_start_input_segmentation_duration_max.value,
				program_start_input_event_cancel_indicator.value,program_start_input_segmentation_flag.value,program_start_input_delivery_not_restricted_flag.value,
				program_start_input_upid_type.value,program_start_input_upid_length.value,program_end_input_segmentation_type_id.value,program_end_input_splice_comand_type.value,
				program_end_input_duration_flag.value,program_end_input_event_cancel_indicator.value,program_end_input_segmentation_flag.value,
				program_end_input_delivery_not_restricted_flag.value,program_end_input_upid_type.value,program_end_input_upid_length.value
			]
			
			let programJson = JSON.stringify(programArray)
			var program = JSON.parse(programJson)
			}
			else{
			  program = []
			}
		}
		else{
			program = []
		}
		
	const nationalBreakEndSwitch = <HTMLInputElement> document.getElementById("nationalBreakEndSwitch");
	const nationalBreakTrue = <HTMLInputElement> document.getElementById("nationalBreakTrue");
	const national_break_expected_splices_hour = <HTMLInputElement> document.getElementById("national_break_expected_splices_hour");

	const national_break_start_input_action = <HTMLInputElement> document.getElementById("national_break_start_input_action");
	const national_break_start_input_splice_command = <HTMLInputElement> document.getElementById("national_break_start_input_splice_command");
	const national_break_start_input_segmentation_type_id = <HTMLInputElement> document.getElementById("national_break_start_input_segmentation_type_id");
	const national_break_start_input_out_of_network_indicator = <HTMLInputElement> document.getElementById("national_break_start_input_out_of_network_indicator");
	const national_break_start_input_splice_event_id = <HTMLInputElement> document.getElementById("national_break_start_input_splice_event_id");
	const national_break_start_input_splice_immediate_flag = <HTMLInputElement> document.getElementById("national_break_start_input_splice_immediate_flag");
	const national_break_start_input_duration_flag = <HTMLInputElement> document.getElementById("national_break_start_input_duration_flag");
	const national_break_start_input_break_duration_min = <HTMLInputElement> document.getElementById("national_break_start_input_break_duration_min");
	const national_break_start_input_break_duration_max = <HTMLInputElement> document.getElementById("national_break_start_input_break_duration_max");
	const national_break_start_input_break_auto_return = <HTMLInputElement> document.getElementById("national_break_start_input_break_auto_return");

	const national_break_start_output_splice_command = <HTMLInputElement> document.getElementById("national_break_start_output_splice_command");
	const national_break_start_output_segmentation_type_id = <HTMLInputElement> document.getElementById("national_break_start_output_segmentation_type_id");
	const national_break_start_output_out_of_network_indicator = <HTMLInputElement> document.getElementById("national_break_start_output_out_of_network_indicator");
	const national_break_start_output_splice_event_id = <HTMLInputElement> document.getElementById("national_break_start_output_splice_event_id");
	const national_break_start_output_splice_immediate_flag = <HTMLInputElement> document.getElementById("national_break_start_output_splice_immediate_flag");
	const national_break_start_output_duration_flag = <HTMLInputElement> document.getElementById("national_break_start_output_duration_flag");
	const national_break_start_output_break_duration_min = <HTMLInputElement> document.getElementById("national_break_start_output_break_duration_min");
	const national_break_start_output_break_duration_max = <HTMLInputElement> document.getElementById("national_break_start_output_break_duration_max");
	const national_break_start_output_break_auto_return = <HTMLInputElement> document.getElementById("national_break_start_output_break_auto_return");

	const national_break_duration_flag = <HTMLInputElement> document.getElementById("national_break_duration_flag");
	
	const national_break_end_input_action = <HTMLInputElement> document.getElementById("national_break_end_input_action");
	const national_break_end_input_splice_command = <HTMLInputElement> document.getElementById("national_break_end_input_splice_command");
	const national_break_end_input_segmentation_type_id = <HTMLInputElement> document.getElementById("national_break_end_input_segmentation_type_id");
	const national_break_end_input_out_of_network_indicator = <HTMLInputElement> document.getElementById("national_break_end_input_out_of_network_indicator");
	const national_break_end_input_splice_event_id = <HTMLInputElement> document.getElementById("national_break_end_input_splice_event_id");
	const national_break_end_input_splice_immediate_flag = <HTMLInputElement> document.getElementById("national_break_end_input_splice_immediate_flag");
	const national_break_end_input_break_duration_flag = <HTMLInputElement> document.getElementById("national_break_end_input_break_duration_flag");
	
	const national_break_end_output_splice_command = <HTMLInputElement> document.getElementById("national_break_end_output_splice_command");
	const national_break_end_output_segmentation_type_id = <HTMLInputElement> document.getElementById("national_break_end_output_segmentation_type_id");
	const national_break_end_output_out_of_network_indicator = <HTMLInputElement> document.getElementById("national_break_end_output_out_of_network_indicator");
	const national_break_end_output_splice_immediate_flag = <HTMLInputElement> document.getElementById("national_break_end_output_splice_immediate_flag");
	const national_break_end_output_splice_event_id = <HTMLInputElement> document.getElementById("national_break_end_output_splice_event_id");
	const national_break_end_output_break_duration_flag = <HTMLInputElement> document.getElementById("national_break_end_output_break_duration_flag");
	const national_break_end_deviation_tolerance = <HTMLInputElement> document.getElementById("national_break_end_deviation_tolerance");

	// //5
	// const end_splice_command = <HTMLInputElement> document.getElementById("end_splice_command");
	// const end_out_of_network = <HTMLInputElement> document.getElementById("end_out_of_network");
	// const end_splice_event_id = <HTMLInputElement> document.getElementById("end_splice_event_id");
	// const end_immidiate_flag = <HTMLInputElement> document.getElementById("end_immidiate_flag");
	// const end_duration_flag = <HTMLInputElement> document.getElementById("end_duration_flag");
	// const end_output_splice_command = <HTMLInputElement> document.getElementById("end_output_splice_command");
	// const end_output_out_of_network = <HTMLInputElement> document.getElementById("end_output_out_of_network");
	// const end_output_splice_event_id = <HTMLInputElement> document.getElementById("end_output_splice_event_id");
	// const end_output_immediate_flag = <HTMLInputElement> document.getElementById("end_output_immediate_flag");
	// const end_output_duration_flag = <HTMLInputElement> document.getElementById("end_output_duration_flag");
	// const end_deviation_tolerance = <HTMLInputElement> document.getElementById("end_deviation_tolerance");
	
	
	// //6
	// const end_segmentation_id = <HTMLInputElement> document.getElementById("end_segmentation_id");
	// const end_output_segmentation_id = <HTMLInputElement> document.getElementById("end_segmentation_id");

	try{
		if(nationalBreakTrue.value  == "true"){
			this.nationalBreakViewCheck = true
		}
	}catch{}
	
	
	// console.log(this.nationalBreakViewCheck)
	if(this.nationalBreakViewCheck){
		if (this.nationalIsOn || nationalBreakTrue.value) {
			let nationalBreakArray = []

			let seg5start: boolean = false 
			try {
				national_break_start_input_action.value 
				seg5start = true 
			}catch {
				seg5start = false 
			}

			if(validate_splice_count2.checked == true && seg5start){
				if(national_break_start_input_splice_command.value == "5" && national_break_start_input_action.value == "NOOP" || national_break_start_input_action.value == "DELETE"){
					if(national_break_start_input_duration_flag.value == "true"){
						nationalBreakArray= [
							national_break_expected_splices_hour.value,national_break_start_input_action.value,national_break_start_input_splice_command.value,
							national_break_start_input_out_of_network_indicator.value,national_break_start_input_splice_event_id.value,
							national_break_start_input_splice_immediate_flag.value,national_break_start_input_duration_flag.value,national_break_start_input_break_duration_min.value,
							national_break_start_input_break_duration_max.value,national_break_start_input_break_auto_return.value]
					}		
				}
				if(national_break_start_input_splice_command.value == "5" && national_break_start_input_action.value == "NOOP" || national_break_start_input_action.value == "DELETE"){
					if(national_break_start_input_duration_flag.value == "false"){
						nationalBreakArray= [
							national_break_expected_splices_hour.value,
							national_break_start_input_action.value,
							national_break_start_input_splice_command.value,
							national_break_start_input_out_of_network_indicator.value,
							national_break_start_input_splice_event_id.value,
							national_break_start_input_splice_immediate_flag.value,
							national_break_start_input_duration_flag.value,
							national_break_start_input_break_auto_return.value
						]
					}		
				}
				if (national_break_start_input_splice_command.value == "5" && national_break_start_input_action.value == "REPLACE" ) {
					nationalBreakArray= [
						national_break_expected_splices_hour.value,national_break_start_input_action.value,national_break_start_input_splice_command.value,
						national_break_start_input_out_of_network_indicator.value,national_break_start_input_splice_event_id.value,
						national_break_start_input_splice_immediate_flag.value,national_break_start_input_duration_flag.value,national_break_start_input_break_duration_min.value,
						national_break_start_input_break_duration_max.value,national_break_start_input_break_auto_return.value,national_break_start_input_action.value, national_break_start_output_splice_command.value,
						national_break_start_output_out_of_network_indicator.value,national_break_start_output_splice_event_id.value,
						national_break_start_output_splice_immediate_flag.value,national_break_start_output_duration_flag.value,national_break_start_output_break_duration_min.value,
						national_break_start_output_break_duration_max.value,national_break_start_output_break_auto_return.value]
				}
				if (national_break_start_input_splice_command.value == "5" && national_break_start_input_action.value == "REPLACE" && nationalBreakEndSwitch.checked) {
					nationalBreakArray= [
						national_break_expected_splices_hour.value,national_break_start_input_action.value,national_break_start_input_splice_command.value,
						national_break_start_input_out_of_network_indicator.value,national_break_start_input_splice_event_id.value,
						national_break_start_input_splice_immediate_flag.value,national_break_start_input_duration_flag.value,national_break_start_input_break_duration_min.value,
						national_break_start_input_break_duration_max.value,national_break_start_input_break_auto_return.value,national_break_start_output_splice_command.value,
						national_break_start_output_out_of_network_indicator.value,national_break_start_output_splice_event_id.value,
						national_break_start_output_splice_immediate_flag.value,national_break_start_output_duration_flag.value,national_break_start_output_break_duration_min.value,
						national_break_start_output_break_duration_max.value,national_break_start_output_break_auto_return.value,
						
						national_break_end_input_action.value,
						national_break_end_input_splice_command.value,
						national_break_end_input_out_of_network_indicator.value,
						national_break_end_input_splice_event_id.value,
						national_break_end_input_splice_immediate_flag.value,
						national_break_end_input_break_duration_flag.value,

						national_break_end_output_splice_command.value,
						national_break_end_output_out_of_network_indicator.value,
						national_break_end_output_splice_immediate_flag.value,
						national_break_end_output_splice_event_id.value,
						national_break_end_deviation_tolerance.value

						// end_splice_command.value,
						// end_out_of_network.value,
						// end_splice_event_id.value,
						// end_immidiate_flag.value,
						// end_duration_flag.value,
						// end_output_splice_command.value,
						// end_output_out_of_network.value,
						// end_output_splice_event_id.value,
						// end_output_immediate_flag.value
						// ,end_output_duration_flag.value,
						// end_deviation_tolerance.value
					]
				}
			}
				console.log(this.nationalBreakViewCheck)
				if(national_break_start_input_splice_command.value == "6" && !seg5start ){
					if(national_break_start_input_duration_flag.value == "true"){
						nationalBreakArray= [
							national_break_expected_splices_hour.value,
							national_break_start_input_splice_command.value,
							national_break_start_input_segmentation_type_id.value,
							national_break_start_input_splice_immediate_flag.value,
							national_break_start_input_duration_flag.value,
							national_break_start_input_break_duration_min.value,
							national_break_start_input_break_duration_max.value,
							national_break_start_input_break_auto_return.value,
							national_break_start_output_splice_command.value,
							national_break_start_output_segmentation_type_id.value,
							national_break_start_output_splice_immediate_flag.value,
							national_break_start_output_duration_flag.value,
							national_break_start_output_break_duration_min.value,
							national_break_start_output_break_duration_max.value,
							national_break_start_output_break_auto_return.value,
						]
					}
				}
				if(national_break_start_input_splice_command.value == "6" ){
					if(national_break_start_input_duration_flag.value == "false"){
						nationalBreakArray= [
							national_break_expected_splices_hour.value,
							national_break_start_input_splice_command.value,
							national_break_start_input_segmentation_type_id.value,
							national_break_start_input_splice_immediate_flag.value,
							national_break_start_input_duration_flag.value,
							national_break_start_input_break_auto_return.value,
							national_break_start_output_splice_command.value,
							national_break_start_output_segmentation_type_id.value,
							national_break_start_output_splice_immediate_flag.value,
							national_break_start_output_duration_flag.value,
							national_break_start_output_break_auto_return.value,
						]
					}
				}
				if(national_break_start_input_splice_command.value == "6" && nationalBreakEndSwitch.checked ){
					if(national_break_start_input_duration_flag.value == "true"){
						nationalBreakArray= [
							national_break_expected_splices_hour.value,
							national_break_start_input_splice_command.value,
							national_break_start_input_segmentation_type_id.value,
							national_break_start_input_splice_immediate_flag.value,
							national_break_start_input_duration_flag.value,
							national_break_start_input_break_duration_min.value,
							national_break_start_input_break_duration_max.value,
							national_break_start_input_break_auto_return.value,
							national_break_start_output_splice_command.value,
							national_break_start_output_segmentation_type_id.value,
							national_break_start_output_splice_immediate_flag.value,
							national_break_start_output_duration_flag.value,
							national_break_start_output_break_duration_min.value,
							national_break_start_output_break_duration_max.value,
							national_break_start_output_break_auto_return.value,
							national_break_end_input_splice_command.value,
							national_break_end_input_segmentation_type_id.value,
							national_break_end_input_break_duration_flag.value,
							national_break_end_output_splice_command.value,
							national_break_end_output_segmentation_type_id.value,
							national_break_end_output_break_duration_flag.value,
							national_break_end_deviation_tolerance.value
						]
					}		
				}
				if(national_break_start_input_splice_command.value == "6" && nationalBreakEndSwitch.checked ){
					if(national_break_start_input_duration_flag.value == "false"){
						nationalBreakArray= [
							national_break_expected_splices_hour.value,
							national_break_start_input_splice_command.value,
							national_break_start_input_segmentation_type_id.value,
							national_break_start_input_splice_immediate_flag.value,
							national_break_start_input_duration_flag.value,
							national_break_start_input_break_auto_return.value,
							national_break_start_output_splice_command.value,
							national_break_start_output_segmentation_type_id.value,
							national_break_start_output_splice_immediate_flag.value,
							national_break_start_output_duration_flag.value,
							national_break_start_output_break_auto_return.value,
							national_break_end_input_splice_command.value,
							national_break_end_input_segmentation_type_id.value,
							national_break_end_input_break_duration_flag.value,
							national_break_end_output_splice_command.value,
							national_break_end_output_segmentation_type_id.value,
							national_break_end_output_break_duration_flag.value,
							national_break_end_deviation_tolerance.value
						]
					}		
				}
				
			
				
				//6 "national break end"
				// national_break_end_input_segmentation_type_id
				//national_break_end_output_segmentation_type_id
				//national_break_start_input_segmentation_type_id
				//5 "national break end"

				// national_break_end_input_out_of_network_indicator
				//national_break_end_input_splice_event_id

			
			// else{
			// 	nationalBreakArray= [
			// 		national_break_start_input_action.value,national_break_start_input_splice_command.value,
			// 		national_break_start_input_segmentation_type_id.value,national_break_start_input_out_of_network_indicator.value,national_break_start_input_splice_event_id.value,
			// 		national_break_start_input_splice_immediate_flag.value,national_break_start_input_duration_flag.value,national_break_start_input_break_duration_min.value,
			// 		national_break_start_input_break_duration_max.value,national_break_start_input_break_auto_return.value,national_break_start_output_splice_command.value,
			// 		national_break_start_output_segmentation_type_id.value,national_break_start_output_out_of_network_indicator.value,national_break_start_output_splice_event_id.value,
			// 		national_break_start_output_splice_immediate_flag.value,national_break_start_output_duration_flag.value,national_break_start_output_break_duration_min.value,
			// 		national_break_start_output_break_duration_max.value,national_break_start_output_break_auto_return.value,national_break_end_input_action.value,
			// 		national_break_end_input_splice_command.value,national_break_end_input_segmentation_type_id.value,national_break_end_input_out_of_network_indicator.value,
			// 		national_break_end_input_splice_event_id.value,national_break_end_input_splice_immediate_flag.value,national_break_end_input_break_duration_flag.value,
			// 		national_break_end_output_splice_command.value,national_break_end_output_segmentation_type_id.value,national_break_end_output_out_of_network_indicator.value,
			// 		national_break_end_output_splice_immediate_flag.value,national_break_end_output_splice_event_id.value,national_break_end_output_break_duration_flag.value,
			// 		national_break_end_deviation_tolerance.value]
			// }

			
			
			
			let nationalbreakJson = JSON.stringify(nationalBreakArray)
			var nationalbreak = JSON.parse(nationalbreakJson)
			
			}
			else{
			  nationalbreak = []
			}
		}
		else{
			nationalbreak = []
		}
		
	const placement_splice_comand_type_start = <HTMLInputElement> document.getElementById("placement_splice_comand_type_start");
	const placement_segmentation_type_id = <HTMLInputElement> document.getElementById("placement_segmentation_type_id");
	const placement_duration_flag = <HTMLInputElement> document.getElementById("placement_duration_flag");
	const placement_segmentation_duration_min = <HTMLInputElement> document.getElementById("placement_segmentation_duration_min");
	const placement_segmentation_duration_max = <HTMLInputElement> document.getElementById("placement_segmentation_duration_max");
	const placement_output_segmentation_duration_min = <HTMLInputElement> document.getElementById("placement_output_segmentation_duration_min");
	const placement_output_segmentation_duration_max = <HTMLInputElement> document.getElementById("placement_output_segmentation_duration_max");

	const providerad_splice_comand_type_start = <HTMLInputElement> document.getElementById("providerad_splice_comand_type_start");
	const providerad_segmentation_type_id = <HTMLInputElement> document.getElementById("providerad_segmentation_type_id");
	const providerad_duration_flag = <HTMLInputElement> document.getElementById("providerad_duration_flag");
	const providerad_segmentation_duration_min = <HTMLInputElement> document.getElementById("providerad_segmentation_duration_min");
	const providerad_segmentation_duration_max = <HTMLInputElement> document.getElementById("providerad_segmentation_duration_max");
	const providerad_output_segmentation_duration_max = <HTMLInputElement> document.getElementById("providerad_output_segmentation_duration_max");
	const providerad_output_segmentation_duration_min = <HTMLInputElement> document.getElementById("providerad_output_segmentation_duration_min");

	let newConfig = {
		"network_id": this.NetworkNamesService.getName()
		,"emails": emails.value
		,"validation_frequency": validation_frequency.value
		// ,"localbreak":[local_break_expected_splices_hour.value,local_break_start_input_action.value,local_break_start_input_splice_command.value,
		// 	local_break_start_input_segmentation_type_id.value,local_break_start_input_out_of_network_indicator.value,local_break_start_input_splice_event_id.value,
		// 	local_break_start_input_splice_immediate_flag.value,local_break_start_input_duration_flag.value,local_break_start_input_break_duration_min.value,
		// 	local_break_start_input_break_duration_max.value,local_break_start_input_break_auto_return.value,local_break_start_output_splice_command.value,
		// 	local_break_start_output_segmentation_type_id.value,local_break_start_output_out_of_network_indicator.value,local_break_start_output_splice_event_id.value,
		// 	local_break_start_output_splice_immediate_flag.value,local_break_start_output_duration_flag.value,local_break_start_output_break_duration_min.value,
		// 	local_break_start_output_break_duration_max.value,local_break_start_output_break_auto_return.value,local_break_end_input_action.value,
		// 	local_break_end_input_splice_command.value,local_break_end_input_segmentation_type_id.value,local_break_end_input_out_of_network_indicator.value,
		// 	local_break_end_input_splice_event_id.value,local_break_end_input_splice_immediate_flag.value,local_break_end_input_break_duration_flag.value,
		// 	local_break_end_output_splice_command.value,local_break_end_output_segmentation_type_id.value,local_break_end_output_out_of_network_indicator.value,
		// 	local_break_end_output_splice_immediate_flag.value,local_break_end_output_splice_event_id.value,local_break_end_output_break_duration_flag.value,
		// 	local_break_end_deviation_tolerance.value]
		,"contentid": content
		,"localbreak": localbreak
		,"nationalbreak": nationalbreak
		,"pro": program
		// ,"pro":[program_time_specified_flag.value,program_start_input_segmentation_type_id.value,program_start_input_splice_command_type.value,
		// 	program_start_input_duration_flag.value,program_start_input_segmentation_duration_min.value,program_start_input_segmentation_duration_max.value,
		// 	program_start_input_event_cancel_indicator.value,program_start_input_segmentation_flag.value,program_start_input_delivery_not_restricted_flag.value,
		// 	program_start_input_upid_type.value,program_start_input_upid_length.value,program_end_input_segmentation_type_id.value,program_end_input_splice_comand_type.value,
		// 	program_end_input_duration_flag.value,program_end_input_event_cancel_indicator.value,program_end_input_segmentation_flag.value,
		// 	program_end_input_delivery_not_restricted_flag.value,program_end_input_upid_type.value,program_end_input_upid_length.value]
		// ,"nationalbreak":[national_break_expected_splices_hour.value,national_break_start_input_action.value,national_break_start_input_splice_command.value,
        //     national_break_start_input_segmentation_type_id.value,national_break_start_input_out_of_network_indicator.value,national_break_start_input_splice_event_id.value,
        //     national_break_start_input_splice_immediate_flag.value,national_break_start_input_duration_flag.value,national_break_start_input_break_duration_min.value,
        //     national_break_start_input_break_duration_max.value,national_break_start_input_break_auto_return.value,national_break_start_output_splice_command.value,
        //     national_break_start_output_segmentation_type_id.value,national_break_start_output_out_of_network_indicator.value,national_break_start_output_splice_event_id.value,
        //     national_break_start_output_splice_immediate_flag.value,national_break_start_output_duration_flag.value,national_break_start_output_break_duration_min.value,
        //     national_break_start_output_break_duration_max.value,national_break_start_output_break_auto_return.value,national_break_end_input_action.value,
        //     national_break_end_input_splice_command.value,national_break_end_input_segmentation_type_id.value,national_break_end_input_out_of_network_indicator.value,
        //     national_break_end_input_splice_event_id.value,national_break_end_input_splice_immediate_flag.value,national_break_end_input_break_duration_flag.value,
        //     national_break_end_output_splice_command.value,national_break_end_output_segmentation_type_id.value,national_break_end_output_out_of_network_indicator.value,
        //     national_break_end_output_splice_immediate_flag.value,national_break_end_output_splice_event_id.value,national_break_end_output_break_duration_flag.value,
		// 	national_break_end_deviation_tolerance.value]
		
        //   ,"placement":[placement_splice_comand_type_start.value,placement_segmentation_type_id.value,placement_duration_flag.value,placement_segmentation_duration_min.value,
        //     placement_segmentation_duration_max.value,placement_output_segmentation_duration_min.value,placement_output_segmentation_duration_max.value]			
        //   ,"providerad":[providerad_splice_comand_type_start.value, providerad_segmentation_type_id.value,providerad_duration_flag.value,providerad_segmentation_duration_min.value,providerad_segmentation_duration_max.value,
        //     providerad_output_segmentation_duration_min.value,providerad_output_segmentation_duration_max.value]			
	}

	console.log('Test Save ');
	let postHeaders = new HttpHeaders({'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*'})
	this.HttpClient.put("http://127.0.0.1:8000/update/"+ this.NetworkNamesService.getName(), newConfig ,{headers: postHeaders}).
	subscribe(Response => console.log(Response));
	this.router.navigate(['/dashboard']);
  }

  buttonCheck(){
	const button = <HTMLInputElement> document.getElementById("check_local_break_component");
	console.log(button.value)
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

  public checkExistingTemplates(template: string): boolean{
	  return this.existingTemplates.includes(template)
  }
  
  public addEmail(node: any[]) {
			node.push("new.email@example.com")
	}

  public deleteFromArray(node: any[], index: number) {
		return node.splice(index, 1);
	}


	setStartOutput() {
		try {
			if(this.config.value[0].value[4].value[1] == 'REPLACE') {
			this.startOutput = true;
			} else {
			this.startOutput = false;
			}
		} catch {
			this.startOutput = false;
		}
	}

	// 	setEndOutput() {
	// 	try {
	// 		if(this.localBreak.value[0].local_break_end.action == 'REPLACE') {
	// 		this.endOutput = true;
	// 		} else {
	// 		this.endOutput = false;
	// 		}
	// 	} catch {
	// 		this.endOutput = false;
	// 	}
	// 	}
}
export class AppModule {}