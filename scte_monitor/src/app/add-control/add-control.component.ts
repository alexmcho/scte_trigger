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
      // childComponent.parentRef = this;
  
      // add reference for newly created component
    // this.componentsReferences.push(childComponentRef);
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
      // childComponent.parentRef = this;
  
      // add reference for newly created component
      // this.componentsReferences.push(childComponentRef);
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

    // let localAlreadyThere:Boolean = false;
	  
    // const localBreakTrue = <HTMLInputElement> document.getElementById("localBreakTrue");
    // if(localBreakTrue.value  == "true"){
    //   localAlreadyThere = true;
    // }
    
    // if(!this.localIsOn && !localAlreadyThere){
    //   this.localIsOn = true;
    //   this.contentIdViewCheck = true;
    //   let componentFactory = this.CFR.resolveComponentFactory(LbcComponent);
    //   let childComponentRef = this.VCR.createComponent(componentFactory);
    //   let childComponent = childComponentRef.instance;
      
    //   childComponent.index = ++this.localbreak_index;
  
    //   // childComponent.parentRef = this;
    
    //   // add reference for newly created component
    //   // this.componentsReferences.push(childComponentRef);
    //   }
  }

    // createNationalBreakComponent() {
    //   if(!this.nationalIsOn){
    //     this.nationalIsOn = true;
    //   let componentFactory = this.CFR.resolveComponentFactory(NbcComponent);
    //     let childComponentRef = this.VCR.createComponent(componentFactory);
    //   let childComponent = childComponentRef.instance;
      
    //     childComponent.index = ++this.providerad_index;
    //   }
    // }

    createNationalBreakComponent() {
      // let componentFactory = this.CFR.resolveComponentFactory(NbcComponent);
        // let childComponentRef = this.VCR.createComponent(componentFactory);
      // let childComponent = childComponentRef.instance;
      
        // childComponent.index = ++this.providerad_index;
      // childComponent.parentRef = this;
      // let nationalAlreadyThere:Boolean = false;
        
      // const nationalBreakTrue = <HTMLInputElement> document.getElementById("nationalBreakTrue");
      // if(nationalBreakTrue.value  == "true"){
      //   nationalAlreadyThere = true;
      // }
    
      if(!this.nationalIsOn){
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

    
      addNewNetwork() {

        // const buttonForValidateLbc = <HTMLInputElement> document.getElementById("buttonForValidateLbc");
      
        // console.log(buttonForValidateLbc.value)
      
        const emails = <HTMLInputElement> document.getElementById("emails");
        const networkName = <HTMLInputElement> document.getElementById("networkName");
        const validation_frequency = <HTMLInputElement> document.getElementById("validation_frequency");
        
        const validate_splice_count = <HTMLInputElement> document.getElementById("validate_splice_count");
        const validate_splice_count2 = <HTMLInputElement> document.getElementById("validate_splice_count2");

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
      
        const localBreakEndSwitch = <HTMLInputElement> document.getElementById("localBreakEndSwitch");

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
        
        // if(this.localIsOn){
        //   let localBreakArr= [
        //     local_break_expected_splices_hour.value,
        //     local_break_start_input_action.value,
        //     local_break_start_input_splice_command.value,
        //     local_break_start_input_segmentation_type_id.value,
        //     local_break_start_input_out_of_network_indicator.value,
        //     local_break_start_input_splice_event_id.value,
        //     local_break_start_input_splice_immediate_flag.value,
        //     local_break_start_input_duration_flag.value,
        //     local_break_start_input_break_duration_min.value,
        //     local_break_start_input_break_duration_max.value,
        //     local_break_start_input_break_auto_return.value,

        //     local_break_start_output_splice_command.value,
        //     local_break_start_output_segmentation_type_id.value,
        //     local_break_start_output_out_of_network_indicator.value,
        //     local_break_start_output_splice_event_id.value,
        //     local_break_start_output_splice_immediate_flag.value,
        //     local_break_start_output_duration_flag.value,
        //     local_break_start_output_break_duration_min.value,
        //     local_break_start_output_break_duration_max.value,
        //     local_break_start_output_break_auto_return.value,

        //     local_break_end_input_action.value,
        //     local_break_end_input_splice_command.value,
        //     local_break_end_input_segmentation_type_id.value,
        //     local_break_end_input_out_of_network_indicator.value,
        //     local_break_end_input_splice_event_id.value,
        //     local_break_end_input_splice_immediate_flag.value,
        //     local_break_end_input_break_duration_flag.value,

        //     local_break_end_output_splice_command.value,
        //     local_break_end_output_segmentation_type_id.value,
        //     local_break_end_output_out_of_network_indicator.value,
        //     local_break_end_output_splice_immediate_flag.value,
        //     local_break_end_output_splice_event_id.value,
        //     local_break_end_output_break_duration_flag.value,
        //     local_break_end_deviation_tolerance.value
        //   ]	
        // let localJson = JSON.stringify(localBreakArr)
        // var localbreak = JSON.parse(localJson)
        // }
        // else{
        //   localbreak = []
        // }

        if(this.localBreakViewCheck){
          if (this.localIsOn || localBreakTrue.value) {
            var localBreakArray = []
      
            var seg5start: boolean = false 
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
                  local_break_expected_splices_hour.value,local_break_start_input_action.value,local_break_start_input_splice_command.value,
                  local_break_start_input_out_of_network_indicator.value,local_break_start_input_splice_event_id.value,
                  local_break_start_input_splice_immediate_flag.value,local_break_start_input_duration_flag.value,local_break_start_input_break_duration_min.value,
                  local_break_start_input_break_duration_max.value,local_break_start_input_break_auto_return.value,local_break_start_output_splice_command.value,
                  local_break_start_output_out_of_network_indicator.value,local_break_start_output_splice_event_id.value,
                  local_break_start_output_splice_immediate_flag.value,local_break_start_output_duration_flag.value,local_break_start_output_break_duration_min.value,
                  local_break_start_output_break_duration_max.value,local_break_start_output_break_auto_return.value,
                  
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
        
        
      

        
        const content_id_splice_command_type = <HTMLInputElement> document.getElementById("content_id_splice_command_type");
        const content_id_segmentation_type_id = <HTMLInputElement> document.getElementById("content_id_segmentation_type_id");
        const content_id_segmentation_event_cancel_indicator = <HTMLInputElement> document.getElementById("content_id_segmentation_event_cancel_indicator");
        const content_id_program_segmentation_flag = <HTMLInputElement> document.getElementById("content_id_program_segmentation_flag");
        const content_id_segmentation_duration_flag = <HTMLInputElement> document.getElementById("content_id_segmentation_duration_flag");
        const content_id_delivery_not_restricted_flag = <HTMLInputElement> document.getElementById("content_id_delivery_not_restricted_flag");
        const content_id_segmentation_upid_type = <HTMLInputElement> document.getElementById("content_id_segmentation_upid_type");
        const content_id_segmentation_upid_length = <HTMLInputElement> document.getElementById("content_id_segmentation_upid_length");
        const content_id_time_specified_flag = <HTMLInputElement> document.getElementById("content_id_time_specified_flag");

      
        if (this.contentIsOn) {
        let contentIdArry= [content_id_splice_command_type.value, content_id_segmentation_type_id.value, content_id_segmentation_event_cancel_indicator.value, 
            content_id_program_segmentation_flag.value, content_id_segmentation_duration_flag.value, content_id_delivery_not_restricted_flag.value, 
            content_id_segmentation_upid_type.value, content_id_segmentation_upid_length.value, content_id_time_specified_flag.value]

        
        let contentJson = JSON.stringify(contentIdArry)
        var content = JSON.parse(contentJson)
        }
        else{
          
          content = []
        }
        
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
      
        if(this.programIsOn){
        let programArr= [
          program_time_specified_flag.value,
          program_start_input_segmentation_type_id.value,program_start_input_splice_command_type.value,
          program_start_input_duration_flag.value,program_start_input_segmentation_duration_min.value,program_start_input_segmentation_duration_max.value,
          program_start_input_event_cancel_indicator.value,program_start_input_segmentation_flag.value,program_start_input_delivery_not_restricted_flag.value,
          program_start_input_upid_type.value,program_start_input_upid_length.value,program_end_input_segmentation_type_id.value,program_end_input_splice_comand_type.value,
          program_end_input_duration_flag.value,program_end_input_event_cancel_indicator.value,program_end_input_segmentation_flag.value,
          program_end_input_delivery_not_restricted_flag.value,program_end_input_upid_type.value,program_end_input_upid_length.value
        ]

        let programJson = JSON.stringify(programArr)
        var program = JSON.parse(programJson)
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

        // if(this.nationalIsOn){
        //   let nationalArr = [
        //     national_break_expected_splices_hour.value,national_break_start_input_action.value,national_break_start_input_splice_command.value,
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
        //     national_break_end_deviation_tolerance.value
        //   ]



        //   let nationalJson = JSON.stringify(nationalArr)
        //   var nationalbreak = JSON.parse(nationalJson)
        //   }
        //   else{
        //     nationalbreak = []
        //   }
      

	// console.log(this.nationalBreakViewCheck)
	if(this.nationalBreakViewCheck){
		if (this.nationalIsOn || nationalBreakTrue.value) {
			var nationalBreakArray = []

			var seg5start: boolean = false 
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
      
        let newConfig = {
          "_id":this.counterID
          ,"emails": emails.value
          ,"validation_frequency": validation_frequency.value
          ,"network_id": networkName.value
          ,"localbreak": localbreak
          ,"contentid": content
          ,"pro":program
          ,"nationalbreak": nationalbreak 
        
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