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
  listOfOptionsForBoolean = ["true","false"]

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
  bool49:String [] = []
  bool50:String [] = []
  bool51:String [] = []
  bool52:String [] = []
  bool53:String [] = []
  bool54:String [] = []

  bool60:String [] = []
  bool61:String [] = []
  bool62:String [] = []
  bool63:String [] = []
  bool64:String [] = []
  bool65:String [] = []
  bool66:String [] = []
  bool67:String [] = []
  bool68:String [] = []


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
  htmlAction3;
  htmlAction4;
  
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

  htmlBool20;

  htmlSplice1;
  htmlSplice2;
  htmlSplice3;
  htmlSplice4;

  htmlBool41;
  htmlBool42;
  htmlBool43;
  htmlBool44;
  htmlBool45;
  htmlBool46;
  htmlBool47;
  htmlBool48;
  htmlBool49;
  htmlBool50;
  htmlBool51;
  htmlBool52;
  htmlBool53;
  htmlBool54;

  htmlBool60;
  htmlBool61;
  htmlBool62;
  htmlBool63;
  htmlBool64;
  htmlBool65;
  htmlBool66;
  htmlBool67;
  htmlBool68;
  
  localIsOn:boolean = false;
  contentIsOn:boolean = false;
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
  program_index: number = 6;
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

		var list3 = [this.spliceCommand1] 
		this.spliceCommand1.push(this.config.value[0].value[4].value[2])
		this.htmlSplice1 = this.config.value[0].value[4].value[2]

		var list4 = [this.spliceCommand2] 
		this.spliceCommand2.push(this.config.value[0].value[7].value[2])
		this.htmlSplice2 = this.config.value[0].value[7].value[2]

		var list5 = [this.bool41,this.bool42,this.bool43,this.bool44,this.bool45,this.bool46,this.bool47, 
		this.bool48,this.bool49, this.bool50,this.bool51,this.bool52,this.bool53,this.bool54]

		var list6 = [this.bool68,this.bool61,this.bool62,this.bool63,this.bool64,this.bool65,this.bool66,this.bool67]

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
		
		//ContentId - 
		this.bool19.push(this.config.value[0].value[5].value[2])
		this.bool20.push(this.config.value[0].value[5].value[3])
		this.bool21.push(this.config.value[0].value[5].value[4])
		this.bool21.push(this.config.value[0].value[5].value[5])
		this.bool22.push(this.config.value[0].value[5].value[8])
		
		//Program - 
		this.htmlBool68 = this.config.value[0].value[6].value[0]
		this.htmlBool61 = this.config.value[0].value[6].value[3]
		this.htmlBool62 = this.config.value[0].value[6].value[6]
		this.htmlBool63 = this.config.value[0].value[6].value[7]
		this.htmlBool64 = this.config.value[0].value[6].value[8]
		this.htmlBool65 = this.config.value[0].value[6].value[14]
		this.htmlBool66 = this.config.value[0].value[6].value[15]
		this.htmlBool67 = this.config.value[0].value[6].value[16]

		this.bool68.push(this.config.value[0].value[6].value[0])
		this.bool61.push(this.config.value[0].value[6].value[3])
		this.bool62.push(this.config.value[0].value[6].value[6])
		this.bool63.push(this.config.value[0].value[6].value[7])
		this.bool64.push(this.config.value[0].value[6].value[8])
		this.bool65.push(this.config.value[0].value[6].value[14])
		this.bool66.push(this.config.value[0].value[6].value[15])
		this.bool67.push(this.config.value[0].value[6].value[16])
		
		//National Break - 
		this.action3.push(this.config.value[0].value[7].value[1])
		this.action4.push(this.config.value[0].value[7].value[18])

		this.htmlAction3 = this.config.value[0].value[7].value[1]
		this.htmlAction4 = this.config.value[0].value[7].value[18]

		this.bool41.push(this.config.value[0].value[7].value[3])
		this.bool42.push(this.config.value[0].value[7].value[5])
		this.bool43.push(this.config.value[0].value[7].value[6])
		this.bool44.push(this.config.value[0].value[7].value[9])
		this.bool45.push(this.config.value[0].value[7].value[10])
		this.bool46.push(this.config.value[0].value[7].value[11])
		this.bool47.push(this.config.value[0].value[7].value[13])
		this.bool48.push(this.config.value[0].value[7].value[14])
		this.bool49.push(this.config.value[0].value[7].value[17])
		this.bool50.push(this.config.value[0].value[7].value[20])
		this.bool51.push(this.config.value[0].value[7].value[22])
		this.bool52.push(this.config.value[0].value[7].value[23])
		this.bool53.push(this.config.value[0].value[7].value[25])
		this.bool54.push(this.config.value[0].value[7].value[26])

		this.htmlBool41 = this.config.value[0].value[7].value[3]
		this.htmlBool42 = this.config.value[0].value[7].value[5]
		this.htmlBool43 = this.config.value[0].value[7].value[6]
		this.htmlBool44 = this.config.value[0].value[7].value[9]
		this.htmlBool45 = this.config.value[0].value[7].value[10]
		this.htmlBool46 = this.config.value[0].value[7].value[11]
		this.htmlBool47 = this.config.value[0].value[7].value[13]
		this.htmlBool48 = this.config.value[0].value[7].value[14]
		this.htmlBool49 = this.config.value[0].value[7].value[17]
		this.htmlBool50 = this.config.value[0].value[7].value[20]
		this.htmlBool51 = this.config.value[0].value[7].value[22]
		this.htmlBool52 = this.config.value[0].value[7].value[23]
		this.htmlBool53 = this.config.value[0].value[7].value[25]
		this.htmlBool54 = this.config.value[0].value[7].value[26]
		
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
		for(let i = 0; i < list4.length; i++){
			for(let j = 0; j < 2; j++)
			if(list4[i].indexOf(this.listOfSpliceCommandType[j]) == -1){
				list4[i].push(this.listOfSpliceCommandType[j])
			}
		}
		for(let i = 0; i < list5.length; i++){
			for(let j = 0; j < 2; j++)
			if(list5[i].indexOf(this.listOfOptionsForBoolean[j]) == -1){
				list5[i].push(this.listOfOptionsForBoolean[j])
			}
		}
		for(let i = 0; i < list6.length; i++){
			for(let j = 0; j < 2; j++)
			if(list6[i].indexOf(this.listOfOptionsForBoolean[j]) == -1){
				list6[i].push(this.listOfOptionsForBoolean[j])
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

	removeProgram() {
		// var T = document.getElementById("RemoveProgram");
		// T.style.display = "none";  // <-- Set it to block
		var T = document.getElementById("pro");
		(T as HTMLElement).remove();
		this.programIsOn = false; 
		this.programViewCheck = false;
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
  //Checking if view already has contentid
  //If not allow a new Local Break
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
		}
	
  }
  
  createContentIdComponent() {
  //Checking if view already has contentid
  //If not allow a new Content Id

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
		}
  }
  
  createProgramComponent() {
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
		}
  }

  createNationalBreakComponent() {
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

	let var_local_break_expected_splices_hour

	let var_local_break_start_input_action;
	 let var_local_break_start_input_splice_command; 
	 let var_local_break_start_input_segmentation_type_id;
	 let var_local_break_start_input_out_of_network_indicator;
	 let var_local_break_start_input_splice_event_id;
	 let var_local_break_start_input_splice_immediate_flag;
	 let var_local_break_start_input_duration_flag;
	 let var_local_break_start_input_break_duration_min;
	 let var_local_break_start_input_break_duration_max;
	 let var_local_break_start_input_break_auto_return;

	 let var_local_break_start_output_splice_command; 
	 let var_local_break_start_output_segmentation_type_id; 
	 let var_local_break_start_output_out_of_network_indicator;
	 let var_local_break_start_output_splice_event_id;
	 let var_local_break_start_output_splice_immediate_flag;
	 let var_local_break_start_output_duration_flag;
	 let var_local_break_start_output_break_duration_min;
	 let var_local_break_start_output_break_duration_max;
	 let var_local_break_start_output_break_auto_return; 

	 let var_local_break_duration_flag; 
	 let var_local_break_end_input_action;
	 let var_local_break_end_input_splice_command;
	 let var_local_break_end_input_segmentation_type_id;
	 let var_local_break_end_input_out_of_network_indicator;
	 let var_local_break_end_input_splice_event_id;
	 let var_local_break_end_input_splice_immediate_flag ;
	 let var_local_break_end_input_break_duration_flag; 
	
	 let var_local_break_end_output_splice_command; 
	 let var_local_break_end_output_segmentation_type_id; 
	 let var_local_break_end_output_out_of_network_indicator ;
	 let var_local_break_end_output_splice_immediate_flag;
	 let var_local_break_end_output_splice_event_id;
	 let var_local_break_end_output_break_duration_flag;
	 let var_local_break_end_deviation_tolerance;

	 try{var_local_break_expected_splices_hour = local_break_expected_splices_hour.value}catch{ var_local_break_expected_splices_hour = "None"}

	
	try{var_local_break_start_input_action = local_break_start_input_action.value}catch{ var_local_break_start_input_action = "None"}
	
	try{ var_local_break_start_input_splice_command = local_break_start_input_splice_command.value}catch{var_local_break_start_input_splice_command = "None"}
	
	try{var_local_break_start_input_segmentation_type_id = local_break_start_input_segmentation_type_id.value}catch{ var_local_break_start_input_segmentation_type_id = "None"}
	
	try{ var_local_break_start_input_out_of_network_indicator = local_break_start_input_out_of_network_indicator.value}catch{var_local_break_start_input_out_of_network_indicator = "None"}
	
	try{var_local_break_start_input_splice_event_id = local_break_start_input_splice_event_id.value}catch{ var_local_break_start_input_splice_event_id = "None"}
	
	try{ var_local_break_start_input_splice_immediate_flag = local_break_start_input_splice_immediate_flag.value}catch{var_local_break_start_input_splice_immediate_flag = "None"}
	
	try{var_local_break_start_input_duration_flag = local_break_start_input_duration_flag.value}catch{ var_local_break_start_input_duration_flag = "None"}
	
	try{ var_local_break_start_input_break_duration_min = local_break_start_input_break_duration_min.value}catch{var_local_break_start_input_break_duration_min = "None"}
	
	try{var_local_break_start_input_break_duration_max = local_break_start_input_break_duration_max.value}catch{ var_local_break_start_input_break_duration_max = "None"}
	
	try{ var_local_break_start_input_break_auto_return = local_break_start_input_break_auto_return.value}catch{var_local_break_start_input_break_auto_return = "None"}
	
	try{var_local_break_start_output_splice_command = local_break_start_output_splice_command.value}catch{ var_local_break_start_output_splice_command = "None"}
	
	try{ var_local_break_start_output_segmentation_type_id = local_break_start_output_segmentation_type_id.value}catch{var_local_break_start_output_segmentation_type_id = "None"}
	
	try{var_local_break_start_output_out_of_network_indicator = local_break_start_output_out_of_network_indicator.value}catch{ var_local_break_start_output_out_of_network_indicator = "None"}
	
	try{ var_local_break_start_output_splice_event_id = local_break_start_output_splice_event_id.value}catch{var_local_break_start_output_splice_event_id = "None"}
	
	try{var_local_break_start_output_splice_immediate_flag = local_break_start_output_splice_immediate_flag.value}catch{ var_local_break_start_output_splice_immediate_flag = "None"}
	
	try{ var_local_break_start_output_duration_flag = local_break_start_output_duration_flag.value}catch{var_local_break_start_output_duration_flag = "None"}

	try{ var_local_break_start_output_break_duration_min = local_break_start_output_break_duration_min.value}catch{var_local_break_start_output_break_duration_min = "None"}

	try{ var_local_break_start_output_break_duration_max = local_break_start_output_break_duration_max.value}catch{var_local_break_start_output_break_duration_max = "None"}

	try{ var_local_break_start_output_break_auto_return = local_break_start_output_break_auto_return.value}catch{var_local_break_start_output_break_auto_return = "None"}

	try{ var_local_break_duration_flag = local_break_duration_flag.value}catch{var_local_break_duration_flag = "None"}

	try{ var_local_break_end_input_segmentation_type_id = local_break_end_input_segmentation_type_id.value}catch{var_local_break_end_input_segmentation_type_id = "None"}

	try{ var_local_break_end_input_splice_command = local_break_end_input_splice_command.value}catch{var_local_break_end_input_splice_command = "None"}

	try{ var_local_break_end_input_out_of_network_indicator = local_break_end_input_out_of_network_indicator.value}catch{var_local_break_end_input_out_of_network_indicator = "None"}

	try{ var_local_break_end_input_splice_event_id = local_break_end_input_splice_event_id.value}catch{var_local_break_end_input_splice_event_id = "None"}

	try{ var_local_break_end_input_action = local_break_end_input_action.value}catch{var_local_break_end_input_action = "None"}

	try{ var_local_break_end_input_splice_immediate_flag = local_break_end_input_splice_immediate_flag.value}catch{var_local_break_end_input_splice_immediate_flag = "None"}

	try{ var_local_break_end_input_break_duration_flag = local_break_end_input_break_duration_flag.value}catch{var_local_break_end_input_break_duration_flag = "None"}

	try{ var_local_break_end_output_out_of_network_indicator = local_break_end_output_out_of_network_indicator.value}catch{var_local_break_end_output_out_of_network_indicator = "None"}

	try{ var_local_break_end_output_segmentation_type_id = local_break_end_output_segmentation_type_id.value}catch{var_local_break_end_output_segmentation_type_id = "None"}

	try{ var_local_break_end_output_splice_command = local_break_end_output_splice_command.value}catch{var_local_break_end_output_splice_command = "None"}

	try{var_local_break_end_output_splice_immediate_flag = local_break_end_output_splice_immediate_flag.value}catch{ var_local_break_end_output_splice_immediate_flag = "None"}
	
	try{ var_local_break_end_output_break_duration_flag = local_break_end_output_break_duration_flag.value}catch{var_local_break_end_output_break_duration_flag = "None"}
	
	try{var_local_break_end_output_splice_event_id = local_break_end_output_splice_event_id.value}catch{ var_local_break_end_output_splice_event_id = "None"}
	
	try{var_local_break_end_deviation_tolerance = local_break_end_deviation_tolerance.value}catch{ var_local_break_end_deviation_tolerance = "None"}





	let localBreakArray= [
		var_local_break_expected_splices_hour,

		var_local_break_start_input_action,
		
		var_local_break_start_input_splice_command,
		var_local_break_start_input_out_of_network_indicator,
		var_local_break_start_input_splice_event_id,
		var_local_break_start_input_splice_immediate_flag,
		var_local_break_start_input_duration_flag,
		var_local_break_start_input_break_duration_min,
		var_local_break_start_input_break_duration_max,
		var_local_break_start_input_break_auto_return,

		var_local_break_start_output_splice_command,
		var_local_break_start_output_out_of_network_indicator,
		var_local_break_start_output_splice_event_id,
		var_local_break_start_output_splice_immediate_flag,
		var_local_break_start_output_duration_flag,
		var_local_break_start_output_break_duration_min,
		var_local_break_start_output_break_duration_max,
		var_local_break_start_output_break_auto_return,
		
		var_local_break_end_input_action,

		var_local_break_end_input_splice_command,
		var_local_break_end_input_out_of_network_indicator,
		var_local_break_end_input_splice_event_id,
		var_local_break_end_input_splice_immediate_flag,
		var_local_break_end_input_break_duration_flag,

		var_local_break_end_output_splice_command,
		var_local_break_end_output_out_of_network_indicator,
		var_local_break_end_output_splice_immediate_flag,
		var_local_break_end_output_splice_event_id,
		var_local_break_end_output_break_duration_flag,

		var_local_break_end_deviation_tolerance
	]
	let localbreakJson = JSON.stringify(localBreakArray)
	var localbreak = JSON.parse(localbreakJson)

	
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

	const programEndSwitch = <HTMLInputElement> document.getElementById("programEndSwitch");
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
	const program_end_input_splice_command_type = <HTMLInputElement> document.getElementById("program_end_input_splice_command_type");
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
			var programArray = []

			if(program_start_input_duration_flag.value == "true"){
				programArray = [program_time_specified_flag.value,program_start_input_segmentation_type_id.value,program_start_input_splice_command_type.value,
					program_start_input_duration_flag.value,program_start_input_segmentation_duration_min.value,program_start_input_segmentation_duration_max.value,
					program_start_input_event_cancel_indicator.value,program_start_input_segmentation_flag.value,program_start_input_delivery_not_restricted_flag.value,
					program_start_input_upid_type.value,program_start_input_upid_length.value]
			}
			if(program_start_input_duration_flag.value == "false"){
				programArray = [program_time_specified_flag.value,program_start_input_segmentation_type_id.value,program_start_input_splice_command_type.value,
					program_start_input_duration_flag.value,program_start_input_event_cancel_indicator.value,program_start_input_segmentation_flag.value,
					program_start_input_delivery_not_restricted_flag.value,program_start_input_upid_type.value,program_start_input_upid_length.value]
			}    
			if (programEndSwitch.checked && program_start_input_duration_flag.value == "true") {
				programArray = [program_time_specified_flag.value,program_start_input_segmentation_type_id.value,program_start_input_splice_command_type.value,
					program_start_input_duration_flag.value,program_start_input_segmentation_duration_min.value,program_start_input_segmentation_duration_max.value,
					program_start_input_event_cancel_indicator.value,program_start_input_segmentation_flag.value,program_start_input_delivery_not_restricted_flag.value,
					program_start_input_upid_type.value,program_start_input_upid_length.value,program_end_input_segmentation_type_id.value,
					program_end_input_splice_command_type.value,program_end_input_duration_flag.value,program_end_input_event_cancel_indicator.value,
					program_end_input_segmentation_flag.value,program_end_input_delivery_not_restricted_flag.value,program_end_input_upid_type.value,
					program_end_input_upid_length.value]
			}
			if (programEndSwitch.checked && program_start_input_duration_flag.value == "false") {
				programArray = [program_time_specified_flag.value,program_start_input_segmentation_type_id.value,program_start_input_splice_command_type.value,
					program_start_input_duration_flag.value,program_start_input_event_cancel_indicator.value,program_start_input_segmentation_flag.value,
					program_start_input_delivery_not_restricted_flag.value,program_start_input_upid_type.value,program_start_input_upid_length.value,
					program_end_input_segmentation_type_id.value,program_end_input_splice_command_type.value,program_end_input_duration_flag.value,
					program_end_input_event_cancel_indicator.value,program_end_input_segmentation_flag.value,program_end_input_delivery_not_restricted_flag.value,
					program_end_input_upid_type.value,program_end_input_upid_length.value]
			}
			let programJson = JSON.stringify(programArray)
			var program = JSON.parse(programJson)
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

	try{
		if(nationalBreakTrue.value  == "true"){
			this.nationalBreakViewCheck = true
		}
	}catch{}
	
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

	let newConfig = {
		"network_id": this.NetworkNamesService.getName()
		,"emails": emails.value
		,"validation_frequency": validation_frequency.value
		,"contentid": content
		,"localbreak": localbreak
		,"nationalbreak": nationalbreak
		,"pro": program
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