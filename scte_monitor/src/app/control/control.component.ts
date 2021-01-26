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
import { PocComponent } from '../poc/poc.component';
import { PcComponent } from '../pc/pc.component';
import { PacComponent } from '../pac/pac.component';
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
  networklink: String;

  constructor(private LoadJsonService: LoadJsonService, private CFR: ComponentFactoryResolver, private modalService: NgbModal, private NetworkNamesService:NetworkNamesService, private HttpClient: HttpClient, private router:Router, private formBuilder: FormBuilder) {
	let url = "http://127.0.0.1:8000/get/"+ this.NetworkNamesService.getName();
	console.log(this.NetworkNamesService.getName())
	console.log(this.networklink)

    this.LoadJsonService.getConfig(url).subscribe(data => {
		this.config = data;
		console.log(this.config)
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
		var T = document.getElementById("RemoveLocal");
		T.style.display = "none";  // <-- Set it to block
	}

	removeContent() {
		var T = document.getElementById("RemoveContent");
		T.style.display = "none";  // <-- Set it to block
		// var T = document.getElementById("contentId");
		// (T as HTMLElement).remove();
	}

	removePlacement() {
		var T = document.getElementById("RemovePlacement");
		T.style.display = "none";  // <-- Set it to block
	}

	removeProgram() {
		var T = document.getElementById("RemoveProgram");
		T.style.display = "none";  // <-- Set it to block
	}

	removeProvider() {
		var T = document.getElementById("RemoveProvider");
		T.style.display = "none";  // <-- Set it to block
	}

	removeNational() {
		var T = document.getElementById("RemoveNational");
		T.style.display = "none";  // <-- Set it to block
	}
  
  createLocalBreakComponent() {
	let componentFactory = this.CFR.resolveComponentFactory(LbcComponent);
    let childComponentRef = this.VCR.createComponent(componentFactory);
	let childComponent = childComponentRef.instance;
	
    childComponent.index = ++this.localbreak_index;
    childComponent.parentRef = this;
  }
  
  createContentIdComponent() {
	let componentFactory = this.CFR.resolveComponentFactory(CicComponent);
    let childComponentRef = this.VCR.createComponent(componentFactory);
	let childComponent = childComponentRef.instance;
	
    childComponent.index = ++this.contentid_index;
    childComponent.parentRef = this;
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
	const emails = <HTMLInputElement> document.getElementById("emails");
	const validation_frequency = <HTMLInputElement> document.getElementById("validation_frequency");

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
	const local_break_start_ouput_duration_flag = <HTMLInputElement> document.getElementById("local_break_start_ouput_duration_flag");
	const local_break_start_output_break_duration_min = <HTMLInputElement> document.getElementById("local_break_start_output_break_duration_min");
	const local_break_start_output_break_duration_max = <HTMLInputElement> document.getElementById("local_break_start_output_break_duration_max");
	const local_break_start_output_break_auto_return = <HTMLInputElement> document.getElementById("local_break_start_output_break_auto_return");

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

	const content_id_segmentation_type_id = <HTMLInputElement> document.getElementById("content_id_segmentation_type_id");
	const content_id_splice_command_type = <HTMLInputElement> document.getElementById("content_id_splice_command_type");
	const content_id_segmentation_event_cancel_indicator = <HTMLInputElement> document.getElementById("content_id_segmentation_event_cancel_indicator");
	const content_id_program_segmentation_flag = <HTMLInputElement> document.getElementById("content_id_program_segmentation_flag");
	const content_id_segmentation_duration_flag = <HTMLInputElement> document.getElementById("content_id_segmentation_duration_flag");
	const content_id_delivery_not_restricted_flag = <HTMLInputElement> document.getElementById("content_id_delivery_not_restricted_flag");
	const content_id_segmentation_upid_type = <HTMLInputElement> document.getElementById("content_id_segmentation_upid_type");
	const content_id_segmentation_upid_length = <HTMLInputElement> document.getElementById("content_id_segmentation_upid_length");
	const content_id_time_specified_flag = <HTMLInputElement> document.getElementById("content_id_time_specified_flag");
   
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
	const national_break_start_ouput_duration_flag = <HTMLInputElement> document.getElementById("national_break_start_ouput_duration_flag");
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
		,"localbreak":[local_break_expected_splices_hour.value,local_break_start_input_action.value,local_break_start_input_splice_command.value,
			local_break_start_input_segmentation_type_id.value,local_break_start_input_out_of_network_indicator.value,local_break_start_input_splice_event_id.value,
			local_break_start_input_splice_immediate_flag.value,local_break_start_input_duration_flag.value,local_break_start_input_break_duration_min.value,
			local_break_start_input_break_duration_max.value,local_break_start_input_break_auto_return.value,local_break_start_output_splice_command.value,
			local_break_start_output_segmentation_type_id.value,local_break_start_output_out_of_network_indicator.value,local_break_start_output_splice_event_id.value,
			local_break_start_output_splice_immediate_flag.value,local_break_start_ouput_duration_flag.value,local_break_start_output_break_duration_min.value,
			local_break_start_output_break_duration_max.value,local_break_start_output_break_auto_return.value,local_break_end_input_action.value,
			local_break_end_input_splice_command.value,local_break_end_input_segmentation_type_id.value,local_break_end_input_out_of_network_indicator.value,
			local_break_end_input_splice_event_id.value,local_break_end_input_splice_immediate_flag.value,local_break_end_input_break_duration_flag.value,
			local_break_end_output_splice_command.value,local_break_end_output_segmentation_type_id.value,local_break_end_output_out_of_network_indicator.value,
			local_break_end_output_splice_immediate_flag.value,local_break_end_output_splice_event_id.value,local_break_end_output_break_duration_flag.value,
			local_break_end_deviation_tolerance.value]
		,"contentid":[content_id_segmentation_type_id.value, content_id_splice_command_type.value, content_id_segmentation_event_cancel_indicator.value, 
            content_id_program_segmentation_flag.value, content_id_segmentation_duration_flag.value, content_id_delivery_not_restricted_flag.value, 
            content_id_segmentation_upid_type.value, content_id_segmentation_upid_length.value, content_id_time_specified_flag.value]
		,"pro":[program_time_specified_flag.value,program_start_input_segmentation_type_id.value,program_start_input_splice_command_type.value,
			program_start_input_duration_flag.value,program_start_input_segmentation_duration_min.value,program_start_input_segmentation_duration_max.value,
			program_start_input_event_cancel_indicator.value,program_start_input_segmentation_flag.value,program_start_input_delivery_not_restricted_flag.value,
			program_start_input_upid_type.value,program_start_input_upid_length.value,program_end_input_segmentation_type_id.value,program_end_input_splice_comand_type.value,
			program_end_input_duration_flag.value,program_end_input_event_cancel_indicator.value,program_end_input_segmentation_flag.value,
			program_end_input_delivery_not_restricted_flag.value,program_end_input_upid_type.value,program_end_input_upid_length.value]
		,"nationalbreak":[national_break_expected_splices_hour.value,national_break_start_input_action.value,national_break_start_input_splice_command.value,
            national_break_start_input_segmentation_type_id.value,national_break_start_input_out_of_network_indicator.value,national_break_start_input_splice_event_id.value,
            national_break_start_input_splice_immediate_flag.value,national_break_start_input_duration_flag.value,national_break_start_input_break_duration_min.value,
            national_break_start_input_break_duration_max.value,national_break_start_input_break_auto_return.value,national_break_start_output_splice_command.value,
            national_break_start_output_segmentation_type_id.value,national_break_start_output_out_of_network_indicator.value,national_break_start_output_splice_event_id.value,
            national_break_start_output_splice_immediate_flag.value,national_break_start_ouput_duration_flag.value,national_break_start_output_break_duration_min.value,
            national_break_start_output_break_duration_max.value,national_break_start_output_break_auto_return.value,national_break_end_input_action.value,
            national_break_end_input_splice_command.value,national_break_end_input_segmentation_type_id.value,national_break_end_input_out_of_network_indicator.value,
            national_break_end_input_splice_event_id.value,national_break_end_input_splice_immediate_flag.value,national_break_end_input_break_duration_flag.value,
            national_break_end_output_splice_command.value,national_break_end_output_segmentation_type_id.value,national_break_end_output_out_of_network_indicator.value,
            national_break_end_output_splice_immediate_flag.value,national_break_end_output_splice_event_id.value,national_break_end_output_break_duration_flag.value,
			national_break_end_deviation_tolerance.value]
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