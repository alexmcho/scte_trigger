import { Component, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ViewChild, OnInit, Type, ɵConsole } from '@angular/core';
import { LoadJsonService } from '../load-json.service';
import { KeyObject } from "../key-value";
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
  networklink: String;

  form:FormGroup;
  public formSubmitAttempt: boolean;
  userNameOnRequired:boolean = false;

  closeResult = ''; 

  @ViewChild('viewContainerRef', { read: ViewContainerRef }) VCR: ViewContainerRef;
//   index = [];
//   componentsReferences = Array<ComponentRef<any>>();
//   localbreak_index: number = 3;
//   contentid_index: number = 4;
//   placementopportunity_index: number = 5;
//   program_index: number = 6;
//   providerad_index: number = 7;

  constructor(private LoadJsonService: LoadJsonService, private CFR: ComponentFactoryResolver, private modalService: NgbModal, 
	private NetworkNamesService:NetworkNamesService, private HttpClient: HttpClient, private router:Router, private formBuilder: FormBuilder) {
	let url = "http://127.0.0.1:8000/get/"+ this.NetworkNamesService.getName();
	console.log(this.NetworkNamesService.getName())
	console.log(this.networklink)

    this.LoadJsonService.getConfig(url).subscribe(data => {
		this.config = data;
		console.log(this.config)
		for(let i = 0; i < this.config.value[0].length; i++) {
			this.existingTemplates.push(this.config.value[i].key)
			console.log(this.config.value[0].key)
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

  openEmail(contentEmail) {
	this.modalService.open(contentEmail, {ariaLabelledBy: 'modal-basic-title-email'}).result.then((result) => {
		this.closeResult = ``;
	  }, (reason) => {
		this.closeResult = ``;
	  });
  }


  createLocalBreakComponent() {
	let componentFactory = this.CFR.resolveComponentFactory(LocalBreakComponent);
    let childComponentRef = this.VCR.createComponent(componentFactory);
	let childComponent = childComponentRef.instance;
  }

  createContentIdComponent() {
	let componentFactory = this.CFR.resolveComponentFactory(ContentIdComponent);
    let childComponentRef = this.VCR.createComponent(componentFactory);
	let childComponent = childComponentRef.instance;
  }

  createPlacementOpportunityComponent() {
	let componentFactory = this.CFR.resolveComponentFactory(PlacementOpportunityComponent);
    let childComponentRef = this.VCR.createComponent(componentFactory);
	let childComponent = childComponentRef.instance;
  }

  createProgramComponent() {
	let componentFactory = this.CFR.resolveComponentFactory(ProgramComponent);
    let childComponentRef = this.VCR.createComponent(componentFactory);
	let childComponent = childComponentRef.instance;
  }

  createProviderAdComponent() {
	let componentFactory = this.CFR.resolveComponentFactory(ProviderAdComponent);
    let childComponentRef = this.VCR.createComponent(componentFactory);
	let childComponent = childComponentRef.instance;
  }
  
  ngOnInit(): void {
	console.log(this.config)
	this.form = this.formBuilder.group({
		"recipient_emails":  [null, [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
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
		return this.form.get(field).value && this.form.get(field).invalid
  }

  getConfig() {
    return this.config
  }
  
  @HostListener('window:load') goToPage() {
    this.router.navigate(['/dashboard']);
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