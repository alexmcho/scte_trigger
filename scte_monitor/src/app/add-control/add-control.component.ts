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
import { PacComponent } from '../pac/pac.component';
import { PocComponent } from '../poc/poc.component';
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

  localIsON:boolean = false;
  contentIsOn:boolean = false;
  providerIsOn:boolean = false;
  placementIsOn:boolean = false;
  programIsOn:boolean = false;

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
  
    createPlacementOpportunityComponent() {
    if(!this.placementIsOn){
    this.placementIsOn = true;
    let componentFactory = this.CFR.resolveComponentFactory(PocComponent);
      let childComponentRef = this.VCR.createComponent(componentFactory);
    let childComponent = childComponentRef.instance;
    
      childComponent.index = ++this.placementopportunity_index;
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
  
    createProviderAdComponent() {
    if(!this.providerIsOn){
    this.providerIsOn = true;
    let componentFactory = this.CFR.resolveComponentFactory(PacComponent);
      let childComponentRef = this.VCR.createComponent(componentFactory);
    let childComponent = childComponentRef.instance;
    
      childComponent.index = ++this.providerad_index;
      // childComponent.parentRef = this;
  
      // add reference for newly created component
    // this.componentsReferences.push(childComponentRef);
    }
    }

  createLocalBreakComponent() {
    let componentFactory = this.CFR.resolveComponentFactory(LbcComponent);
      let childComponentRef = this.VCR.createComponent(componentFactory);
    let childComponent = childComponentRef.instance;
    
      childComponent.index = ++this.localbreak_index;
    }

    createNationalBreakComponent() {
      let componentFactory = this.CFR.resolveComponentFactory(NbcComponent);
        let childComponentRef = this.VCR.createComponent(componentFactory);
      let childComponent = childComponentRef.instance;
      
        childComponent.index = ++this.providerad_index;
      }

    
      addNewNetwork() {

        // const buttonForValidateLbc = <HTMLInputElement> document.getElementById("buttonForValidateLbc");
      
        // console.log(buttonForValidateLbc.value)
      
        const emails = <HTMLInputElement> document.getElementById("emails");
      
        const networkName = <HTMLInputElement> document.getElementById("networkName");
        
        const local_expected_splices_hour = <HTMLInputElement> document.getElementById("local_expected_splices_hour");
        const local_splice_command_start = <HTMLInputElement> document.getElementById("local_splice_command_start");
        const local_break_action = <HTMLInputElement> document.getElementById("local_break_action");
        const local_splice_immidiate_flag = <HTMLInputElement> document.getElementById("local_splice_immidiate_flag");
        const local_break_splice_event_id = <HTMLInputElement> document.getElementById("local_break_splice_event_id");
        const local_break_duration_flag = <HTMLInputElement> document.getElementById("local_break_duration_flag");
        const local_break_duration_min = <HTMLInputElement> document.getElementById("local_break_duration_min");
        const local_break_duration_max = <HTMLInputElement> document.getElementById("local_break_duration_max");
        const local_break_auto_return = <HTMLInputElement> document.getElementById("local_break_auto_return");
        const local_break_output_splice_immidiate_flag = <HTMLInputElement> document.getElementById("local_break_output_splice_immidiate_flag");
        const local_break_output_splice_event_id = <HTMLInputElement> document.getElementById("local_break_output_splice_event_id");
        const local_break_output_duration_flag = <HTMLInputElement> document.getElementById("local_break_output_duration_flag");
        const local_break_output_break_duration_min = <HTMLInputElement> document.getElementById("local_break_output_break_duration_min");
        const local_break_output_break_duration_max = <HTMLInputElement> document.getElementById("local_break_output_break_duration_max");
        const local_break_output_break_auto_return = <HTMLInputElement> document.getElementById("local_break_output_break_auto_return");
        const local_break_splice_command = <HTMLInputElement> document.getElementById("local_break_splice_command");
        const local_break_end_input_trigger = <HTMLInputElement> document.getElementById("local_break_end_input_trigger");
        const local_break_end_input_splice_immidiate_flag = <HTMLInputElement> document.getElementById("local_break_end_input_splice_immidiate_flag");
        const local_break_end_input_splice_event_id = <HTMLInputElement> document.getElementById("local_break_end_input_splice_event_id");
        const local_break_end_output_splice_immediate_flag = <HTMLInputElement> document.getElementById("local_break_end_output_splice_immediate_flag");
        const local_break_end_output_splice_event_id = <HTMLInputElement> document.getElementById("local_break_end_output_splice_event_id");
        const local_break_end_devation_tolerance = <HTMLInputElement> document.getElementById("local_break_end_devation_tolerance");
        
        if(this.localIsON){
          let localBreakArr= [local_expected_splices_hour.value,local_splice_command_start.value,local_break_action.value,local_splice_immidiate_flag.value,local_break_splice_event_id.value,
            local_break_duration_flag.value, local_break_duration_min.value,local_break_duration_max.value,local_break_auto_return.value,local_break_output_splice_immidiate_flag.value,
            local_break_output_splice_event_id.value,local_break_output_duration_flag.value,local_break_output_break_duration_min.value, local_break_output_break_duration_max.value,
            local_break_output_break_auto_return.value, local_break_splice_command.value, local_break_end_input_trigger.value,
            local_break_end_input_splice_immidiate_flag.value,local_break_end_input_splice_event_id.value,local_break_end_output_splice_immediate_flag.value,
            local_break_end_output_splice_event_id.value,local_break_end_devation_tolerance.value]	
        let localJson = JSON.stringify(localBreakArr)
        var localBreak = JSON.parse(localJson)
        }
        else{
          localBreak = []
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
      
        const placement_splice_comand_type_start = <HTMLInputElement> document.getElementById("placement_splice_comand_type_start");
        const placement_segmentation_type_id = <HTMLInputElement> document.getElementById("placement_segmentation_type_id");
        const placement_duration_flag = <HTMLInputElement> document.getElementById("placement_duration_flag");
        const placement_segmentation_duration_min = <HTMLInputElement> document.getElementById("placement_segmentation_duration_min");
        const placement_segmentation_duration_max = <HTMLInputElement> document.getElementById("placement_segmentation_duration_max");
        const placement_output_segmentation_duration_min = <HTMLInputElement> document.getElementById("placement_output_segmentation_duration_min");
        const placement_output_segmentation_duration_max = <HTMLInputElement> document.getElementById("placement_output_segmentation_duration_max");
        
        if(this.placementIsOn){
        let placementArr= [placement_splice_comand_type_start.value,placement_segmentation_type_id.value,placement_duration_flag.value,placement_segmentation_duration_min.value,
          placement_segmentation_duration_max.value,placement_output_segmentation_duration_min.value,placement_output_segmentation_duration_max.value]
        
        let placementJson = JSON.stringify(placementArr)
        var placement = JSON.parse(placementJson)
        }
        else{
          placement = []
        }
      
        const program_splice_comand_type_start = <HTMLInputElement> document.getElementById("program_splice_comand_type_start");
        const program_segmentation_type_id = <HTMLInputElement> document.getElementById("program_segmentation_type_id");
        const program_duration_flag = <HTMLInputElement> document.getElementById("program_duration_flag");
        const program_segmentation_duration_min = <HTMLInputElement> document.getElementById("program_segmentation_duration_min");
        const program_segmentation_duration_max = <HTMLInputElement> document.getElementById("program_segmentation_duration_max");
        const program_output_segmentation_duration_min = <HTMLInputElement> document.getElementById("program_output_segmentation_duration_min");
        const program_output_segmentation_duration_max = <HTMLInputElement> document.getElementById("program_output_segmentation_duration_max");
        
        if(this.programIsOn){
        let programArr= [program_splice_comand_type_start.value,program_segmentation_type_id.value,program_duration_flag.value,program_segmentation_duration_min.value,program_segmentation_duration_max.value,
          program_output_segmentation_duration_min.value,program_output_segmentation_duration_max.value]
        let programJson = JSON.stringify(programArr)
        var program = JSON.parse(programJson)
        }
        else{
          program = []
        }
      
        
        const providerad_splice_comand_type_start = <HTMLInputElement> document.getElementById("providerad_splice_comand_type_start");
        const providerad_segmentation_type_id = <HTMLInputElement> document.getElementById("providerad_segmentation_type_id");
        const providerad_duration_flag = <HTMLInputElement> document.getElementById("providerad_duration_flag");
        const providerad_segmentation_duration_min = <HTMLInputElement> document.getElementById("providerad_segmentation_duration_min");
        const providerad_segmentation_duration_max = <HTMLInputElement> document.getElementById("providerad_segmentation_duration_max");
        const providerad_output_segmentation_duration_max = <HTMLInputElement> document.getElementById("providerad_output_segmentation_duration_max");
        const providerad_output_segmentation_duration_min = <HTMLInputElement> document.getElementById("providerad_output_segmentation_duration_min");
        
        if(this.providerIsOn){
        let providerArr = [providerad_splice_comand_type_start.value, providerad_segmentation_type_id.value,providerad_duration_flag.value,providerad_segmentation_duration_min.value,providerad_segmentation_duration_max.value,
          providerad_output_segmentation_duration_min.value,providerad_output_segmentation_duration_max.value]
        let providerJson = JSON.stringify(providerArr)
        var provider = JSON.parse(providerJson)
        }
        else{
          provider = []
        }
      
        let newConfig = {
          "_id":this.counterID
          ,"emails": emails.value
          ,"network_id": networkName.value
          ,"localbreak": localBreak
          ,"contentid": content
          ,"placement": placement
          ,"pro":program
          ,"providerad":provider
        
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