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

@Component({
  selector: 'app-add-control',
  templateUrl: './add-control.component.html',
  template:'',
  styleUrls: ['./add-control.component.css']
})

export class AddControlComponent implements OnInit {
  public config: KeyObject;
  public existingTemplates = <string[]>[];

  form:FormGroup;
  private formSubmitAttempt: boolean;
  userNameOnRequired:boolean = false;
  
  counterID: Number;
  recipient_emails: string;
  validation_frequency: string;
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
  id: number; 
  networks: String;

  localIsOn:boolean = false;
  contentIsOn:boolean = false;
  providerIsOn:boolean = false;
  placementIsOn:boolean = false;
  programIsOn:boolean = false;
  nationalIsOn:boolean = false; 

  closeResult = ''; 

  @ViewChild('viewContainerRef', { read: ViewContainerRef }) VCR: ViewContainerRef;
  index = [];
  componentsReferences = Array<ComponentRef<any>>();
  localbreak_index: number = 3;
  contentid_index: number = 5;
  program_index: number = 6;
  nationalbreak_index: number = 7;
  networklink: String;
  contentIdViewCheck:boolean;
  localBreakViewCheck:boolean;
  programViewCheck:boolean;
  nationalBreakViewCheck:boolean;

  constructor(private LoadJsonService: LoadJsonService, private CFR: ComponentFactoryResolver, 
	private modalService: NgbModal, private NetworkNamesService:NetworkNamesService, 
	private HttpClient: HttpClient, private router:Router, private formBuilder: FormBuilder) {
	let url = "http://127.0.0.1:8000/get/"+ this.NetworkNamesService.getName();
	console.log(this.NetworkNamesService.getName())
	console.log(this.networklink)

    this.LoadJsonService.getConfig(url).subscribe(data => {
		this.config = data;
		console.log(this.config)
		for(let i = 0; i < this.config.value.length; i++) {
			this.existingTemplates.push(this.config.value[i].key)
		}
	})
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

  getNetworks(){
    return this.HttpClient.get<String>("http://127.0.0.1:8000/networks")
  }

	getId(){
		return this.HttpClient.get<Number>("http://127.0.0.1:8000/idCounter")
	}

  ngOnInit(): void {
    console.log(this.config)
    this.getNetworks().subscribe(
      networkArr => this.networks = networkArr
    )
    // this.form = this.formBuilder.group({
    //   "emails":  [null, [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]]
    //   ,"network_id":  [null, [Validators.required, Validators.pattern("")]]
    //   ,"validation_frequency":  [null, [Validators.required, Validators.pattern("")]]
    // })
    this.getId().subscribe(count =>{
      this.counterID = Number(count)
    })
  }
  
  
  isFieldRequired(field: string) {
    if(!this.form.get(field).value && this.form.get(field).touched){
      return true;
    }
    if(!this.form.get(field).value && this.form.get(field).dirty  ){
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

  createContentIdComponent() {
    if(!this.contentIsOn){
    this.contentIsOn = true;
    let componentFactory = this.CFR.resolveComponentFactory(CicComponent);
      let childComponentRef = this.VCR.createComponent(componentFactory);
    let childComponent = childComponentRef.instance;
    
      childComponent.index = ++this.contentid_index;
    }
  }
  
    createProgramComponent() {
    if(!this.programIsOn){
    this.programIsOn = true;
    let componentFactory = this.CFR.resolveComponentFactory(PcComponent);
      let childComponentRef = this.VCR.createComponent(componentFactory);
    let childComponent = childComponentRef.instance;
    
    childComponent.index = ++this.program_index;
    }
  }

  createLocalBreakComponent() {
    if(!this.localIsOn){
      this.localIsOn = true;
      this.localBreakViewCheck = true;
    let componentFactory = this.CFR.resolveComponentFactory(LbcComponent);
      let childComponentRef = this.VCR.createComponent(componentFactory);
    let childComponent = childComponentRef.instance;
    
      childComponent.index = ++this.localbreak_index;
    }
  }

    createNationalBreakComponent() {
      if(!this.nationalIsOn){
        this.nationalIsOn = true;
        this.nationalBreakViewCheck = true;
        let componentFactory = this.CFR.resolveComponentFactory(NbcComponent);
        let childComponentRef = this.VCR.createComponent(componentFactory);
        let childComponent = childComponentRef.instance;
        
        childComponent.index = ++this.nationalbreak_index;

        }
      }

    
      addNewNetwork() {
          const networkName = <HTMLInputElement> document.getElementById("networkName");
          const emails = <HTMLInputElement> document.getElementById("emails");
          const validation_frequency = <HTMLInputElement> document.getElementById("validation_frequency");
          const localBreakEndSwitch = <HTMLInputElement> document.getElementById("localBreakEndSwitch");
        
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

          const local_break_validate_splice_count = <HTMLInputElement> document.getElementById("local_break_validate_splice_count");
          const local_break_start_input_break_duration = <HTMLInputElement> document.getElementById("local_break_start_input_break_duration");
          const local_break_start_output_break_duration = <HTMLInputElement> document.getElementById("local_break_start_output_break_duration");
          const local_break_include_break_end = <HTMLInputElement> document.getElementById("local_break_include_break_end");
        
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

           let var_local_break_validate_splice_count;
           let var_local_break_start_input_break_duration;
           let var_local_break_start_output_break_duration;
           let var_local_break_include_break_end;
        
          try{ var_local_break_expected_splices_hour = local_break_expected_splices_hour.value}catch{ var_local_break_expected_splices_hour = "none"}

          try{ var_local_break_start_input_action = local_break_start_input_action.value}catch{ var_local_break_start_input_action = "none"}
          try{ var_local_break_start_input_splice_command = local_break_start_input_splice_command.value}catch{var_local_break_start_input_splice_command ="none"}
          try{ var_local_break_start_input_segmentation_type_id = local_break_start_input_segmentation_type_id.value}catch{ var_local_break_start_input_segmentation_type_id = "none"}
          try{ var_local_break_start_input_out_of_network_indicator = local_break_start_input_out_of_network_indicator.value}catch{var_local_break_start_input_out_of_network_indicator = "none"}
          try{ var_local_break_start_input_splice_event_id = local_break_start_input_splice_event_id.value}catch{ var_local_break_start_input_splice_event_id = "none"}
          try{ var_local_break_start_input_splice_immediate_flag = local_break_start_input_splice_immediate_flag.value}catch{var_local_break_start_input_splice_immediate_flag = "none"}
          try{ var_local_break_start_input_duration_flag = local_break_start_input_duration_flag.value}catch{ var_local_break_start_input_duration_flag = "none"}
          try{ var_local_break_start_input_break_duration_min = local_break_start_input_break_duration_min.value}catch{var_local_break_start_input_break_duration_min = "none"}
          try{ var_local_break_start_input_break_duration_max = local_break_start_input_break_duration_max.value}catch{ var_local_break_start_input_break_duration_max = "none"}
          try{ var_local_break_start_input_break_auto_return = local_break_start_input_break_auto_return.value}catch{var_local_break_start_input_break_auto_return = "none"}

          try{ var_local_break_start_output_splice_command = local_break_start_output_splice_command.value}catch{ var_local_break_start_output_splice_command = "none"}
          try{ var_local_break_start_output_segmentation_type_id = local_break_start_output_segmentation_type_id.value}catch{var_local_break_start_output_segmentation_type_id = "none"}
          try{ var_local_break_start_output_out_of_network_indicator = local_break_start_output_out_of_network_indicator.value}catch{ var_local_break_start_output_out_of_network_indicator = "none"}
          try{ var_local_break_start_output_splice_event_id = local_break_start_output_splice_event_id.value}catch{var_local_break_start_output_splice_event_id = "none"}
          try{ var_local_break_start_output_splice_immediate_flag = local_break_start_output_splice_immediate_flag.value}catch{ var_local_break_start_output_splice_immediate_flag = "none"}
          try{ var_local_break_start_output_duration_flag = local_break_start_output_duration_flag.value}catch{var_local_break_start_output_duration_flag = "none"}
          try{ var_local_break_start_output_break_duration_min = local_break_start_output_break_duration_min.value}catch{var_local_break_start_output_break_duration_min = "none"}
          try{ var_local_break_start_output_break_duration_max = local_break_start_output_break_duration_max.value}catch{var_local_break_start_output_break_duration_max = "none"}
          try{ var_local_break_start_output_break_auto_return = local_break_start_output_break_auto_return.value}catch{var_local_break_start_output_break_auto_return ="none"}

          try{ var_local_break_duration_flag = local_break_duration_flag.value}catch{var_local_break_duration_flag = "none"}
          try{ var_local_break_end_input_segmentation_type_id = local_break_end_input_segmentation_type_id.value}catch{var_local_break_end_input_segmentation_type_id = "none"}
          try{ var_local_break_end_input_splice_command = local_break_end_input_splice_command.value}catch{var_local_break_end_input_splice_command = "none"}
          try{ var_local_break_end_input_out_of_network_indicator = local_break_end_input_out_of_network_indicator.value}catch{var_local_break_end_input_out_of_network_indicator = "none"}
          try{ var_local_break_end_input_splice_event_id = local_break_end_input_splice_event_id.value}catch{var_local_break_end_input_splice_event_id = "none"}
          try{ var_local_break_end_input_action = local_break_end_input_action.value}catch{var_local_break_end_input_action = "none"}
          try{ var_local_break_end_input_splice_immediate_flag = local_break_end_input_splice_immediate_flag.value}catch{var_local_break_end_input_splice_immediate_flag = "none"}
          try{ var_local_break_end_input_break_duration_flag = local_break_end_input_break_duration_flag.value}catch{var_local_break_end_input_break_duration_flag = "none"}

          try{ var_local_break_end_output_out_of_network_indicator = local_break_end_output_out_of_network_indicator.value}catch{var_local_break_end_output_out_of_network_indicator = "none"}
          try{ var_local_break_end_output_segmentation_type_id = local_break_end_output_segmentation_type_id.value}catch{var_local_break_end_output_segmentation_type_id = "none"}
          try{ var_local_break_end_output_splice_command = local_break_end_output_splice_command.value}catch{var_local_break_end_output_splice_command = "none"}
          try{ var_local_break_end_output_splice_immediate_flag = local_break_end_output_splice_immediate_flag.value}catch{ var_local_break_end_output_splice_immediate_flag = "None"}
          try{ var_local_break_end_output_break_duration_flag = local_break_end_output_break_duration_flag.value}catch{ var_local_break_end_output_break_duration_flag = "none"}
          try{ var_local_break_end_output_splice_event_id = local_break_end_output_splice_event_id.value}catch{ var_local_break_end_output_splice_event_id = "none"}
          try{ var_local_break_end_deviation_tolerance = local_break_end_deviation_tolerance.value}catch{ var_local_break_end_deviation_tolerance = "none"}

          try{ var_local_break_validate_splice_count = local_break_validate_splice_count.checked}catch{ var_local_break_validate_splice_count = "none"}
          try{ var_local_break_start_input_break_duration = local_break_start_input_break_duration.value}catch{var_local_break_start_input_break_duration = "none"}
          try{ var_local_break_start_output_break_duration = local_break_start_output_break_duration.value}catch{var_local_break_start_output_break_duration = "none"}
          try{ var_local_break_include_break_end = local_break_include_break_end.checked}catch{var_local_break_include_break_end = "none"}


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
            var_local_break_end_deviation_tolerance,
            
            var_local_break_start_input_segmentation_type_id,
            var_local_break_start_output_segmentation_type_id,
            var_local_break_end_input_segmentation_type_id,
            var_local_break_end_output_segmentation_type_id,

            var_local_break_validate_splice_count,
            var_local_break_start_input_break_duration,
            var_local_break_start_output_break_duration,
            var_local_break_include_break_end,

          ]
        
          let localbreakJson = JSON.stringify(localBreakArray)
          var localbreak = JSON.parse(localbreakJson)
        
          if(this.contentIsOn){
          const contentIdTrue = <HTMLInputElement> document.getElementById("contentIdTrue");
          const content_id_splice_command_type = <HTMLInputElement> document.getElementById("content_id_splice_command_type");
          const content_id_segmentation_type_id = <HTMLInputElement> document.getElementById("content_id_segmentation_type_id");
          const content_id_segmentation_upid= <HTMLInputElement> document.getElementById("content_id_segmentation_upid");
          const content_id_time_specified_flag = <HTMLInputElement> document.getElementById("content_id_time_specified_flag");
       
                let contentIdArray= [content_id_splice_command_type.value, content_id_segmentation_type_id.value, 
                    content_id_segmentation_upid.value, content_id_time_specified_flag.value]
                
                let contentJson = JSON.stringify(contentIdArray)
                var content = JSON.parse(contentJson)
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
        
          let var_program_time_specified_flag;
          let var_program_start_input_segmentation_type_id;
          let var_program_start_input_splice_command_type;
          let var_program_start_input_duration_flag;
          let var_program_start_input_segmentation_duration_min;
          let var_program_start_input_segmentation_duration_max;
          let var_program_start_input_event_cancel_indicator;
          let var_program_start_input_segmentation_flag;
          let var_program_start_input_delivery_not_restricted_flag;
          let var_program_start_input_upid_type;
          let var_program_start_input_upid_length
        
          let var_program_end_input_segmentation_type_id;
          let var_program_end_input_splice_command_type;
          let var_program_end_input_duration_flag;
          let var_program_end_input_event_cancel_indicator;
          let var_program_end_input_segmentation_flag;
          let var_program_end_input_delivery_not_restricted_flag;
          let var_program_end_input_upid_type;
          let var_program_end_input_upid_length;

          try{var_program_start_input_splice_command_type = program_start_input_splice_command_type.value}catch{ var_program_start_input_splice_command_type = "None"}
          try{var_program_start_input_segmentation_type_id = program_start_input_segmentation_type_id.value}catch{ var_program_start_input_segmentation_type_id = "None"}
          try{var_program_start_input_duration_flag = program_start_input_duration_flag.value}catch{ var_program_start_input_duration_flag = "None"}
          try{var_program_start_input_segmentation_duration_min = program_start_input_segmentation_duration_min.value}catch{ var_program_start_input_segmentation_duration_min = "None"}
          try{var_program_start_input_segmentation_duration_max = program_start_input_segmentation_duration_max.value}catch{ var_program_start_input_segmentation_duration_max = "None"}

          try{var_program_time_specified_flag = program_time_specified_flag.value}catch{ var_program_time_specified_flag = "None"}
          
          try{var_program_end_input_splice_command_type = program_end_input_splice_command_type.value}catch{ var_program_end_input_splice_command_type = "None"}
          try{var_program_end_input_segmentation_type_id = program_end_input_segmentation_type_id.value}catch{ var_program_end_input_segmentation_type_id = "None"}
          try{var_program_end_input_duration_flag = program_end_input_duration_flag.value}catch{ var_program_end_input_duration_flag = "None"}
        
              let programArray = [
                  var_program_start_input_splice_command_type,
                  var_program_start_input_segmentation_type_id,
                  var_program_start_input_duration_flag,
                  var_program_start_input_segmentation_duration_min,
                  var_program_start_input_segmentation_duration_max,
                  var_program_time_specified_flag,
        
                  var_program_end_input_splice_command_type,
                  var_program_end_input_segmentation_type_id,
                  var_program_end_input_duration_flag,
                ]
        
                  let programJson = JSON.stringify(programArray)
                  var program = JSON.parse(programJson)
          
            
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

          const national_break_validate_splice_count = <HTMLInputElement> document.getElementById("national_break_validate_splice_count");
          const national_break_start_input_break_duration = <HTMLInputElement> document.getElementById("national_break_start_input_break_duration");
          const national_break_start_output_break_duration = <HTMLInputElement> document.getElementById("national_break_start_output_break_duration");
          const national_break_include_break_end = <HTMLInputElement> document.getElementById("national_break_include_break_end");
          
          let var_national_break_expected_splices_hour
          
          let var_national_break_start_input_action;
            let var_national_break_start_input_splice_command; 
            let var_national_break_start_input_segmentation_type_id;
            let var_national_break_start_input_out_of_network_indicator;
            let var_national_break_start_input_splice_event_id;
            let var_national_break_start_input_splice_immediate_flag;
            let var_national_break_start_input_duration_flag;
            let var_national_break_start_input_break_duration_min;
            let var_national_break_start_input_break_duration_max;
            let var_national_break_start_input_break_auto_return;
          
            let var_national_break_start_output_splice_command; 
            let var_national_break_start_output_segmentation_type_id; 
            let var_national_break_start_output_out_of_network_indicator;
            let var_national_break_start_output_splice_event_id;
            let var_national_break_start_output_splice_immediate_flag;
            let var_national_break_start_output_duration_flag;
            let var_national_break_start_output_break_duration_min;
            let var_national_break_start_output_break_duration_max;
            let var_national_break_start_output_break_auto_return; 
          
            let var_national_break_duration_flag; 
            let var_national_break_end_input_action;
            let var_national_break_end_input_splice_command;
            let var_national_break_end_input_segmentation_type_id;
            let var_national_break_end_input_out_of_network_indicator;
            let var_national_break_end_input_splice_event_id;
            let var_national_break_end_input_splice_immediate_flag ;
            let var_national_break_end_input_break_duration_flag; 
          
            let var_national_break_end_output_splice_command; 
            let var_national_break_end_output_segmentation_type_id; 
            let var_national_break_end_output_out_of_network_indicator ;
            let var_national_break_end_output_splice_immediate_flag;
            let var_national_break_end_output_splice_event_id;
            let var_national_break_end_output_break_duration_flag;
            let var_national_break_end_deviation_tolerance;

            let var_national_break_validate_splice_count;
            let var_national_break_start_input_break_duration;
            let var_national_break_start_output_break_duration;
            let var_national_break_include_break_end;
          
          try{var_national_break_expected_splices_hour = national_break_expected_splices_hour.value}catch{ var_national_break_expected_splices_hour = "none"}
          
          try{ var_national_break_start_input_action = national_break_start_input_action.value}catch{ var_national_break_start_input_action = "none"}
          try{ var_national_break_start_input_splice_command = national_break_start_input_splice_command.value}catch{var_national_break_start_input_splice_command ="none"}
          try{ var_national_break_start_input_segmentation_type_id = national_break_start_input_segmentation_type_id.value}catch{ var_national_break_start_input_segmentation_type_id = "none"}
          try{ var_national_break_start_input_out_of_network_indicator = national_break_start_input_out_of_network_indicator.value}catch{var_national_break_start_input_out_of_network_indicator = "none"}
          try{ var_national_break_start_input_splice_event_id = national_break_start_input_splice_event_id.value}catch{ var_national_break_start_input_splice_event_id = "none"}
          try{ var_national_break_start_input_splice_immediate_flag = national_break_start_input_splice_immediate_flag.value}catch{var_national_break_start_input_splice_immediate_flag = "none"}
          try{ var_national_break_start_input_duration_flag = national_break_start_input_duration_flag.value}catch{ var_national_break_start_input_duration_flag = "none"}
          try{ var_national_break_start_input_break_duration_min = national_break_start_input_break_duration_min.value}catch{var_national_break_start_input_break_duration_min = "none"}
          try{ var_national_break_start_input_break_duration_max = national_break_start_input_break_duration_max.value}catch{ var_national_break_start_input_break_duration_max = "none"}
          try{ var_national_break_start_input_break_auto_return = national_break_start_input_break_auto_return.value}catch{var_national_break_start_input_break_auto_return = "none"}
          
          try{ var_national_break_start_output_splice_command = national_break_start_output_splice_command.value}catch{ var_national_break_start_output_splice_command = "none"}
          try{ var_national_break_start_output_segmentation_type_id = national_break_start_output_segmentation_type_id.value}catch{var_national_break_start_output_segmentation_type_id = "none"}
          try{ var_national_break_start_output_out_of_network_indicator = national_break_start_output_out_of_network_indicator.value}catch{ var_national_break_start_output_out_of_network_indicator = "none"}
          try{ var_national_break_start_output_splice_event_id = national_break_start_output_splice_event_id.value}catch{var_national_break_start_output_splice_event_id = "none"}
          try{ var_national_break_start_output_splice_immediate_flag = national_break_start_output_splice_immediate_flag.value}catch{ var_national_break_start_output_splice_immediate_flag = "none"}
          try{ var_national_break_start_output_duration_flag = national_break_start_output_duration_flag.value}catch{var_national_break_start_output_duration_flag = "none"}
          try{ var_national_break_start_output_break_duration_min = national_break_start_output_break_duration_min.value}catch{var_national_break_start_output_break_duration_min = "none"}
          try{ var_national_break_start_output_break_duration_max = national_break_start_output_break_duration_max.value}catch{var_national_break_start_output_break_duration_max = "none"}
          try{ var_national_break_start_output_break_auto_return = national_break_start_output_break_auto_return.value}catch{var_national_break_start_output_break_auto_return ="none"}
          
          try{ var_national_break_duration_flag = national_break_duration_flag.value}catch{var_national_break_duration_flag = "none"}
          
          try{ var_national_break_end_input_segmentation_type_id = national_break_end_input_segmentation_type_id.value}catch{var_national_break_end_input_segmentation_type_id = "none"}
          try{ var_national_break_end_input_splice_command = national_break_end_input_splice_command.value}catch{var_national_break_end_input_splice_command = "none"}
          try{ var_national_break_end_input_out_of_network_indicator = national_break_end_input_out_of_network_indicator.value}catch{var_national_break_end_input_out_of_network_indicator = "none"}
          try{ var_national_break_end_input_splice_event_id = national_break_end_input_splice_event_id.value}catch{var_national_break_end_input_splice_event_id = "none"}
          try{ var_national_break_end_input_action = national_break_end_input_action.value}catch{var_national_break_end_input_action = "none"}
          try{ var_national_break_end_input_splice_immediate_flag = national_break_end_input_splice_immediate_flag.value}catch{var_national_break_end_input_splice_immediate_flag = "none"}
          try{ var_national_break_end_input_break_duration_flag = national_break_end_input_break_duration_flag.value}catch{var_national_break_end_input_break_duration_flag = "none"}
          
          try{ var_national_break_end_output_out_of_network_indicator = national_break_end_output_out_of_network_indicator.value}catch{var_national_break_end_output_out_of_network_indicator = "none"}
          try{ var_national_break_end_output_segmentation_type_id = national_break_end_output_segmentation_type_id.value}catch{var_national_break_end_output_segmentation_type_id = "none"}
          try{ var_national_break_end_output_splice_command = national_break_end_output_splice_command.value}catch{var_national_break_end_output_splice_command = "none"}
          try{ var_national_break_end_output_splice_immediate_flag = national_break_end_output_splice_immediate_flag.value}catch{ var_national_break_end_output_splice_immediate_flag = "None"}
          try{ var_national_break_end_output_break_duration_flag = national_break_end_output_break_duration_flag.value}catch{var_national_break_end_output_break_duration_flag = "None"}
          try{ var_national_break_end_output_splice_event_id = national_break_end_output_splice_event_id.value}catch{ var_national_break_end_output_splice_event_id = "None"}
          
          try{var_national_break_end_deviation_tolerance = national_break_end_deviation_tolerance.value}catch{ var_national_break_end_deviation_tolerance ="none"}

          try{ var_national_break_validate_splice_count = national_break_validate_splice_count.checked}catch{ var_national_break_validate_splice_count = "none"}
          try{ var_national_break_start_input_break_duration = national_break_start_input_break_duration.value}catch{var_national_break_start_input_break_duration = "none"}
          try{ var_national_break_start_output_break_duration = national_break_start_output_break_duration.value}catch{var_national_break_start_output_break_duration = "none"}
          try{ var_national_break_include_break_end = national_break_include_break_end.checked}catch{var_national_break_include_break_end = "none"}

          
          let nationalBreakArray= [
          
            var_national_break_expected_splices_hour,
          
            var_national_break_start_input_action,
            var_national_break_start_input_splice_command,
            var_national_break_start_input_out_of_network_indicator,
            var_national_break_start_input_splice_event_id,
            var_national_break_start_input_splice_immediate_flag,
            var_national_break_start_input_duration_flag,
            var_national_break_start_input_break_duration_min,
            var_national_break_start_input_break_duration_max,
            var_national_break_start_input_break_auto_return,
          
            var_national_break_start_output_splice_command,
            var_national_break_start_output_out_of_network_indicator,
            var_national_break_start_output_splice_event_id,
            var_national_break_start_output_splice_immediate_flag,
            var_national_break_start_output_duration_flag,
            var_national_break_start_output_break_duration_min,
            var_national_break_start_output_break_duration_max,
            var_national_break_start_output_break_auto_return,
            
            var_national_break_end_input_action,
            var_national_break_end_input_splice_command,
            var_national_break_end_input_out_of_network_indicator,
            var_national_break_end_input_splice_event_id,
            var_national_break_end_input_splice_immediate_flag,
            var_national_break_end_input_break_duration_flag,
          
            var_national_break_end_output_splice_command,
            var_national_break_end_output_out_of_network_indicator,
            var_national_break_end_output_splice_immediate_flag,
            var_national_break_end_output_splice_event_id,
            var_national_break_end_output_break_duration_flag,
            var_national_break_end_deviation_tolerance,
            
            var_national_break_start_input_segmentation_type_id,
            var_national_break_start_output_segmentation_type_id,
            var_national_break_end_input_segmentation_type_id,
            var_national_break_end_output_segmentation_type_id, 

            var_national_break_validate_splice_count,
            var_national_break_start_input_break_duration,
            var_national_break_start_output_break_duration,
            var_national_break_include_break_end,

          ]
          
          let nationalbreakJson = JSON.stringify(nationalBreakArray)
          var nationalbreak = JSON.parse(nationalbreakJson)
        
        
        
           if(!this.nationalIsOn){
            nationalbreak = []
           }
           if(!this.contentIsOn){
            content = []
           }
           if(!this.localIsOn){
            localbreak = []
           }
           if(!this.programIsOn){
            program = []
           }
          
          let newConfig = {
            "_id": this.counterID
            ,"network_id": networkName.value
            ,"emails": emails.value
            ,"validation_frequency": validation_frequency.value
            ,"contentid": content
            ,"localbreak": localbreak
            ,"nationalbreak": nationalbreak
            ,"pro": program
          }
        let postHeaders = new HttpHeaders({'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*'})
            this.HttpClient.post("http://127.0.0.1:8000/addConfig", newConfig, {headers: postHeaders})
          .subscribe(Response => console.log(Response));
        this.HttpClient.put("http://127.0.0.1:8000/updateCounterId" ,{headers: postHeaders}).
        subscribe(Response => console.log(Response));
          this.router.navigate(['/dashboard']);
        }


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
  
}
export class AppModule {}