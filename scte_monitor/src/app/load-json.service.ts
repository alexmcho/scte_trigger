import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { map } from "rxjs/operators";
import { filter } from "rxjs/operators"

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { KeyNumber } from "./key-value";
import { KeyString } from "./key-value";
import { KeyBool } from "./key-value"
import { KeyStringArray } from "./key-value";
import { KeyNumberArray } from "./key-value";
import { KeyObject } from "./key-value";

import { LocalBreak } from "./template_definitions";
import { ContentId } from "./template_definitions";
import { PlacementOpportunity } from "./template_definitions";
import { Program } from "./template_definitions";
import { ProviderAd } from "./template_definitions"; 

@Injectable({
  providedIn: 'root'
})
export class LoadJsonService {

  constructor(private http: HttpClient) { }

  getConfig(url: string) {
    let getHeaders = new HttpHeaders({'Content-type': 'application/json', 'Referrer-Policy': 'origin'})
    return this.http.get(url, {headers: getHeaders}).pipe(
      map((config: any) => {
        console.log(config)
        return <KeyObject> {key: "config", value: this.mapping(config, "config.value"), type: "expandable", path: "config"}
      })
    );
  }

  mapping(config, pathSoFar: string) {
    let keys = Object.keys(config);
    let flags = [];
    for(let i=0; i < keys.length; i++){
      if(keys[i] == "local_break")  {
        flags.push(<KeyObject>{key:"local_break", value:[this.addLocalBreak(config[keys[i]])], type:"localBreak", path: pathSoFar.concat("[",String(i),"]")})
      }
      else if(keys[i] == "content_id") {
        flags.push(<KeyObject>{key:"content_id", value:[this.addContentId(config[keys[i]])], type:"contentId", path: pathSoFar.concat("[",String(i),"]")})
      }
      else if(keys[i] == "placement_opportunity") {
        flags.push(<KeyObject>{key:"placement_opportunity", value:[this.addPlacementOpportunity(config[keys[i]])], type:"placementOpportunity", path: pathSoFar.concat("[",String(i),"]")})
      }
      else if(keys[i] == "program") {
        flags.push(<KeyObject>{key:"program", value:[this.addProgram(config[keys[i]])], type:"Program", path: pathSoFar.concat("[",String(i),"]")})
      }
      else if(keys[i] == "provider_ad") {
        flags.push(<KeyObject>{key:"provider_ad", value:[this.addProviderAd(config[keys[i]])], type:"providerAd", path: pathSoFar.concat("[",String(i),"]")})
      }
      else if(typeof config[keys[i]] == "string") {
        flags.push(<KeyString> {key:keys[i], value:config[keys[i]], type:"terminal", path: pathSoFar.concat("[",String(i),"]")});
      }
      else if(typeof config[keys[i]] == "number") {
        flags.push(<KeyNumber> {key:keys[i], value:config[keys[i]], type:"terminal", path: pathSoFar.concat("[",String(i),"]")});
      }
      else if(typeof config[keys[i]] == "boolean") {
        flags.push(<KeyBool> {key: keys[i], value: config[keys[i]], type:"terminal", path: pathSoFar.concat("[",String(i),"]")})
      }
      else if(Array.isArray(config[keys[i]])) {
        if(typeof config[keys[i]][0] == "number") {
          flags.push(<KeyNumberArray> {key: keys[i], value: config[keys[i]], type:"numberArray", path: pathSoFar.concat("[",String(i),"]")});
        }
        else {
          flags.push(<KeyStringArray> {key: keys[i], value: config[keys[i]], type:"stringArray", path: pathSoFar.concat("[",String(i),"]")});
        }
      }
      else if(typeof config[keys[i]] == "object") {
        let currentPath = pathSoFar.concat("[",String(i),"]")
        flags.push(<KeyObject> {key:keys[i], value:this.mapping(config[keys[i]], currentPath.concat(".value")), type:"expandable", path: currentPath})
      }
      else {
        console.log("Not expecting type ", typeof config[keys[i]])
      }
    }
    return flags
  }

  // Fills in local Break. all asignments in try catch blocks to fill in defaults if not found in config.json
  // s for start, e for end, i for input, o for output
  addLocalBreak(local_break): LocalBreak {
    console.log(local_break)
    let include_local_break_end = true
    if(typeof local_break["local_break_end"] == "undefined") {
      include_local_break_end = false;
    }

    let my_expected_splices_hour
    if(typeof local_break["expected_splices_hour"] == "undefined") {
      my_expected_splices_hour = 0
    } else {
      my_expected_splices_hour = local_break["expected_splices_hour"]
    }
    let my_validate_splice_count
    if(typeof local_break["validate_splice_count"] == "undefined") {
      my_validate_splice_count = false
    } else {
      my_validate_splice_count = local_break["validate_splice_count"]
    }
    //start
    let s_action
    try {s_action = local_break["local_break_start"]["action"]} catch {s_action = "NOOP"}
    let s_command_type
    try {s_command_type = local_break["local_break_start"]["splice_command_type"]} catch {s_command_type = 5}
    //start input
    let s_i_splice_event_id
    try {s_i_splice_event_id = local_break["local_break_start"]["input_trigger"]["splice_event_id"]} catch{s_i_splice_event_id="isnumeric"}
    let s_i_out_net_ind
    try {s_i_out_net_ind = local_break["local_break_start"]["input_trigger"]["out_of_network_indicator"]} catch{s_i_out_net_ind=true}
    let s_i_duration
    try {s_i_duration = local_break["local_break_start"]["input_trigger"]["duration_flag"]} catch{s_i_duration=true}
    let s_i_splice_immediate
    try{s_i_splice_immediate = local_break["local_break_start"]["input_trigger"]["splice_immediate_flag"]} catch{s_i_splice_immediate=false}
    let s_i_break_auto_return
    try{s_i_break_auto_return = local_break["local_break_start"]["input_trigger"]["break_auto_return"]} catch{s_i_break_auto_return=false}
    let s_i_break_min
    try{s_i_break_min = local_break["local_break_start"]["input_trigger"]["break_duration_min"]} catch{s_i_break_min=58}
    let s_i_break_max
    try{s_i_break_max = local_break["local_break_start"]["input_trigger"]["break_duration_max"]} catch{s_i_break_max=62}
    //start output
    let s_o_splice_event_id
    try{s_o_splice_event_id = local_break["local_break_start"]["output_trigger"]["splice_event_id"]} catch{s_o_splice_event_id="isnumeric"}
    let s_o_out_net_ind
    try {s_o_out_net_ind = local_break["local_break_start"]["output_trigger"]["out_of_network_indicator"]} catch{s_o_out_net_ind=true}
    let s_o_duration
    try {s_o_duration = local_break["local_break_start"]["output_trigger"]["duration_flag"]} catch{s_o_duration=true}
    let s_o_splice_immediate
    try{s_o_splice_immediate = local_break["local_break_start"]["output_trigger"]["splice_immediate_flag"]} catch{s_o_splice_immediate=false}
    let s_o_break_auto_return
    try{s_o_break_auto_return = local_break["local_break_start"]["output_trigger"]["break_auto_return"]} catch{s_o_break_auto_return=false}
    let s_o_break_min
    try{s_o_break_min = local_break["local_break_start"]["output_trigger"]["break_duration_min"]} catch{s_o_break_min=58}
    let s_o_break_max
    try{s_o_break_max = local_break["local_break_start"]["output_trigger"]["break_duration_max"]} catch{s_o_break_max=62}
    //end
    let e_action
    try {e_action = local_break["local_break_end"]["action"]} catch {e_action = "DELETE"}
    let e_command_type
    try {e_command_type = local_break["local_break_end"]["splice_command_type"]} catch {e_command_type = 5}
    //end input
    let e_i_splice_event_id
    try {e_i_splice_event_id = local_break["local_break_end"]["input_trigger"]["splice_event_id"]} catch{e_i_splice_event_id="isnumeric"}
    let e_i_out_net_ind
    try {e_i_out_net_ind = local_break["local_break_end"]["input_trigger"]["out_of_network_indicator"]} catch{e_i_out_net_ind=false}
    let e_i_duration
    try {e_i_duration = local_break["local_break_end"]["input_trigger"]["duration_flag"]} catch{e_i_duration=true}
    let e_i_splice_immediate
    try {e_i_splice_immediate = local_break["local_break_end"]["input_trigger"]["splice_immediate_flag"]} catch {e_i_splice_immediate=false}
    //end output
    let e_o_splice_event_id
    try {e_o_splice_event_id = local_break["local_break_end"]["output_trigger"]["splice_event_id"]} catch{e_o_splice_event_id="isnumeric"}
    let e_o_out_net_ind
    try {e_o_out_net_ind = local_break["local_break_end"]["output_trigger"]["out_of_network_indicator"]} catch{e_o_out_net_ind=false}
    let e_o_duration
    try {e_o_duration = local_break["local_break_end"]["output_trigger"]["duration_flag"]} catch{e_o_duration=true}
    let e_o_splice_immediate
    try {e_o_splice_immediate = local_break["local_break_end"]["output_trigger"]["splice_immediate_flag"]} catch {e_o_splice_immediate=false}

    let duration_deviation_tolerance
    if(typeof local_break["break_duration_deviation_tolerance"] == "undefined") {
      duration_deviation_tolerance = 0.1
    } else {
      duration_deviation_tolerance = local_break["break_duration_deviation_tolerance"]
    }

    return <LocalBreak> {
        include_break_end: include_local_break_end,
        expected_splices_hour: my_expected_splices_hour,
        validate_splice_count: my_validate_splice_count,
        local_break_start: {
          action: s_action,
          splice_command_type: s_command_type,
          input_trigger: {
            splice_event_id: s_i_splice_event_id,
            out_of_network_indicator: s_i_out_net_ind,
            duration_flag: s_i_duration,
            splice_immediate_flag: s_i_splice_immediate,
            break_auto_return: s_i_break_auto_return,
            break_duration_min: s_i_break_min,
            break_duration_max: s_i_break_max
          },
          output_trigger: {
            splice_event_id: s_o_splice_event_id,
            out_of_network_indicator: s_o_out_net_ind,
            duration_flag: s_o_duration,
            splice_immediate_flag: s_o_splice_immediate,
            break_auto_return: s_o_break_auto_return,
            break_duration_min: s_o_break_min,
            break_duration_max: s_o_break_max
          }
        },
        local_break_end: {
          action: e_action,
          splice_command_type: e_command_type,
          input_trigger: {
            splice_event_id: e_i_splice_event_id,
            out_of_network_indicator: e_i_out_net_ind,
            duration_flag: e_i_duration,
            splice_immediate_flag: e_i_splice_immediate
          },
          output_trigger: {
            splice_event_id: e_o_splice_event_id,
            out_of_network_indicator: e_o_out_net_ind,
            duration_flag: e_o_duration,
            splice_immediate_flag: e_o_splice_immediate
          }
        },
      break_duration_deviation_tolerance: duration_deviation_tolerance
    }
  }

  addContentId(content_id): ContentId {
    console.log(content_id)
    let include_content_id_end = true
    if(typeof content_id["content_id_end"] == "undefined") {
      include_content_id_end = false;
    }

    let my_expected_splices_hour
    if(typeof content_id["expected_splices_hour"] == "undefined") {
      my_expected_splices_hour = 0
    } else {
      my_expected_splices_hour = content_id["expected_splices_hour"]
    }
    let my_validate_splice_count
    if(typeof content_id["validate_splice_count"] == "undefined") {
      my_validate_splice_count = false
    } else {
      my_validate_splice_count = content_id["validate_splice_count"]
    }
    //start
    let s_command_type
    try {s_command_type = content_id["content_id_start"]["splice_command_type"]} catch {s_command_type = 5}
    //start input
    let s_i_segmentation_type_id
    try {s_i_segmentation_type_id = content_id["content_id_start"]["input_trigger"]["segmentation_type_id"]} catch{s_i_segmentation_type_id="isnumeric"}
    //start output
    let s_o_segmentation_type_id
    try{s_o_segmentation_type_id = content_id["content_id_start"]["output_trigger"]["segmentation_type_id"]} catch{s_o_segmentation_type_id="isnumeric"}
    //end
    let e_command_type
    try {e_command_type = content_id["content_id_end"]["splice_command_type"]} catch {e_command_type = 5}
    //end input
    let e_i_segmentation_type_id
    try {e_i_segmentation_type_id = content_id["content_id_end"]["input_trigger"]["segmentation_type_id"]} catch{e_i_segmentation_type_id="isnumeric"}
    //end output
    let e_o_segmentation_type_id
    try {e_o_segmentation_type_id = content_id["content_id_end"]["output_trigger"]["segmentation_type_id"]} catch{e_o_segmentation_type_id="isnumeric"}

    let duration_deviation_tolerance
    if(typeof content_id["break_duration_deviation_tolerance"] == "undefined") {
      duration_deviation_tolerance = 0.1
    } else {
      duration_deviation_tolerance = content_id["break_duration_deviation_tolerance"]
    }

    return <ContentId> {
        content_id_start: {
          splice_command_type: s_command_type,
          input_trigger: {
            segmentation_type_id: s_i_segmentation_type_id,
          },
          output_trigger: {
            segmentation_type_id: s_o_segmentation_type_id,
          }
        },
        content_id_end: {
          splice_command_type: e_command_type,
          input_trigger: {
            segmentation_type_id: e_i_segmentation_type_id,
          },
          output_trigger: {
            segmentation_type_id: e_o_segmentation_type_id,
          }
        },
      break_duration_deviation_tolerance: duration_deviation_tolerance
    }
  }

  addPlacementOpportunity(placement_opportunity): PlacementOpportunity {
    console.log(placement_opportunity)
    let include_placement_opportunity_end = true
    if(typeof placement_opportunity["placement_opportunity_end"] == "undefined") {
      include_placement_opportunity_end = false;
    }

    let my_expected_splices_hour
    if(typeof placement_opportunity["expected_splices_hour"] == "undefined") {
      my_expected_splices_hour = 0
    } else {
      my_expected_splices_hour = placement_opportunity["expected_splices_hour"]
    }
    let my_validate_splice_count
    if(typeof placement_opportunity["validate_splice_count"] == "undefined") {
      my_validate_splice_count = false
    } else {
      my_validate_splice_count = placement_opportunity["validate_splice_count"]
    }
    //start
    let s_command_type
    try {s_command_type = placement_opportunity["placement_opportunity_start"]["splice_command_type"]} catch {s_command_type = 5}
    //start input
    let s_i_segmentation_type_id
    try {s_i_segmentation_type_id = placement_opportunity["placement_opportunity_start"]["input_trigger"]["segmentation_type_id"]} catch{s_i_segmentation_type_id=52}
    let s_i_duration
    try {s_i_duration = placement_opportunity["placement_opportunity_start"]["input_trigger"]["duration_flag"]} catch{s_i_duration=true}
    let s_i_segmentation_auto_return
    try {s_i_segmentation_auto_return = placement_opportunity["placement_opportunity_start"]["input_trigger"]["segmentation_auto_return"]} catch{s_i_segmentation_auto_return=false}
    let s_i_segmentation_min
    try {s_i_segmentation_min = placement_opportunity["placement_opportunity_start"]["input_trigger"]["segmentation_duration_min"]} catch{s_i_segmentation_min=58}
    let s_i_segmentation_max
    try {s_i_segmentation_max = placement_opportunity["placement_opportunity_start"]["input_trigger"]["segmentation_duration_max"]} catch{s_i_segmentation_max=62}
    //start output
    let s_o_segmentation_type_id
    try{s_o_segmentation_type_id = placement_opportunity["placement_opportunity_start"]["output_trigger"]["segmentation_type_id"]} catch{s_o_segmentation_type_id=52}
    let s_o_duration
    try {s_o_duration = placement_opportunity["placement_opportunity_start"]["output_trigger"]["duration_flag"]} catch{s_o_duration=true}
    let s_o_segmentation_auto_return
    try {s_o_segmentation_auto_return = placement_opportunity["placement_opportunity_start"]["input_trigger"]["segmentation_auto_return"]} catch{s_o_segmentation_auto_return=false}
    let s_o_segmentation_min
    try {s_o_segmentation_min = placement_opportunity["placement_opportunity_start"]["input_trigger"]["segmentation_duration_min"]} catch{s_o_segmentation_min=58}
    let s_o_segmentation_max
    try {s_o_segmentation_max = placement_opportunity["placement_opportunity_start"]["input_trigger"]["segmentation_duration_max"]} catch{s_o_segmentation_max=62}
    //end
    let e_command_type
    try {e_command_type = placement_opportunity["placement_opportunity_end"]["splice_command_type"]} catch {e_command_type = 5}
    //end input
    let e_i_segmentation_type_id
    try {e_i_segmentation_type_id = placement_opportunity["placement_opportunity_end"]["input_trigger"]["segmentation_type_id"]} catch{e_i_segmentation_type_id=52}
    let e_i_duration
    try {e_i_duration = placement_opportunity["placement_opportunity_end"]["input_trigger"]["duration_flag"]} catch{e_i_duration=true}
    //end output
    let e_o_segmentation_type_id
    try {e_o_segmentation_type_id = placement_opportunity["placement_opportunity_end"]["output_trigger"]["segmentation_type_id"]} catch{e_o_segmentation_type_id=52}
    let e_o_duration
    try {e_o_duration = placement_opportunity["placement_opportunity_end"]["output_trigger"]["duration_flag"]} catch{e_o_duration=true}


    let duration_deviation_tolerance
    if(typeof placement_opportunity["segmentation_duration_deviation_tolerance"] == "undefined") {
      duration_deviation_tolerance = 0.1
    } else {
      duration_deviation_tolerance = placement_opportunity["segmentation_duration_deviation_tolerance"]
    }

    return <PlacementOpportunity> {
      placement_opportunity_start: {
        splice_command_type: s_command_type,
        input_trigger: {
            segmentation_type_id: s_i_segmentation_type_id,
            duration_flag: s_i_duration,
            segmentation_auto_return: s_i_segmentation_auto_return,
            segmentation_duration_min: s_i_segmentation_min,
            segmentation_duration_max: s_i_segmentation_max
        },
        output_trigger: {
            segmentation_type_id: s_o_segmentation_type_id,
            duration_flag: s_o_duration,
            segmentation_auto_return: s_o_segmentation_auto_return,
            segmentation_duration_min: s_o_segmentation_min,
            segmentation_duration_max: s_o_segmentation_max
        }
    },
    placement_opportunity_end: {
        splice_command_type: e_command_type,
        input_trigger: {
            segmentation_type_id: e_i_segmentation_type_id,
            duration_flag: e_i_duration
        },
        output_trigger: {
            segmentation_type_id: e_o_segmentation_type_id,
            duration_flag: e_o_duration
        }
    }
  }
}

  addProgram(program): Program {
    console.log(program)
    let include_program_end = true
    if(typeof program["program_end"] == "undefined") {
      include_program_end = false;
    }

    let my_expected_splices_hour
    if(typeof program["expected_splices_hour"] == "undefined") {
      my_expected_splices_hour = 0
    } else {
      my_expected_splices_hour = program["expected_splices_hour"]
    }
    let my_validate_splice_count
    if(typeof program["validate_splice_count"] == "undefined") {
      my_validate_splice_count = false
    } else {
      my_validate_splice_count = program["validate_splice_count"]
    }
    //start
    let s_command_type
    try {s_command_type = program["program_start"]["splice_command_type"]} catch {s_command_type = 5}
    //start input
    let s_i_segmentation_type_id
    try {s_i_segmentation_type_id = program["program_start"]["input_trigger"]["segmentation_type_id"]} catch{s_i_segmentation_type_id=16}
    let s_i_duration
    try {s_i_duration = program["program_start"]["input_trigger"]["duration_flag"]} catch{s_i_duration=true}
    let s_i_segmentation_auto_return
    try {s_i_segmentation_auto_return = program["program_start"]["input_trigger"]["segmentation_auto_return"]} catch{s_i_segmentation_auto_return=false}
    let s_i_segmentation_min
    try {s_i_segmentation_min = program["program_start"]["input_trigger"]["segmentation_duration_min"]} catch{s_i_segmentation_min=58}
    let s_i_segmentation_max
    try {s_i_segmentation_max = program["program_start"]["input_trigger"]["segmentation_duration_max"]} catch{s_i_segmentation_max=62}
    //start output
    let s_o_segmentation_type_id
    try{s_o_segmentation_type_id = program["program_start"]["output_trigger"]["segmentation_type_id"]} catch{s_o_segmentation_type_id=16}
    let s_o_duration
    try {s_i_duration = program["program_start"]["input_trigger"]["duration_flag"]} catch{s_i_duration=true}
    let s_o_segmentation_auto_return
    try {s_o_segmentation_auto_return = program["program_start"]["input_trigger"]["segmentation_auto_return"]} catch{s_o_segmentation_auto_return=false}
    let s_o_segmentation_min
    try {s_o_segmentation_min = program["program_start"]["input_trigger"]["segmentation_duration_min"]} catch{s_o_segmentation_min=58}
    let s_o_segmentation_max
    try {s_o_segmentation_max = program["program_start"]["input_trigger"]["segmentation_duration_max"]} catch{s_o_segmentation_max=62}
    //end
    let e_command_type
    try {e_command_type = program["program_end"]["splice_command_type"]} catch {e_command_type = 5}
    //end input
    let e_i_segmentation_type_id
    try {e_i_segmentation_type_id = program["program_end"]["input_trigger"]["segmentation_type_id"]} catch{e_i_segmentation_type_id=16}
    let e_i_duration
    try {s_i_duration = program["program_start"]["input_trigger"]["duration_flag"]} catch{s_i_duration=true}
    //end output
    let e_o_segmentation_type_id
    try {e_o_segmentation_type_id = program["program_end"]["output_trigger"]["segmentation_type_id"]} catch{e_o_segmentation_type_id=16}
    let e_o_duration
    try {s_i_duration = program["program_start"]["input_trigger"]["duration_flag"]} catch{s_i_duration=true}

    let duration_deviation_tolerance
    if(typeof program["segmentation_duration_deviation_tolerance"] == "undefined") {
      duration_deviation_tolerance = 0.1
    } else {
      duration_deviation_tolerance = program["segmentation_duration_deviation_tolerance"]
    }

    return <Program> {
      program_start: {
        splice_command_type: s_command_type,
        input_trigger: {
          segmentation_type_id: s_i_segmentation_type_id,
          duration_flag: s_i_duration,
          segmentation_auto_return: s_i_segmentation_auto_return,
          segmentation_duration_min: s_i_segmentation_min,
          segmentation_duration_max: s_i_segmentation_max
        },
        output_trigger: {
          segmentation_type_id: s_o_segmentation_type_id,
          duration_flag: s_o_duration,
          segmentation_auto_return: s_o_segmentation_auto_return,
          segmentation_duration_min: s_o_segmentation_min,
          segmentation_duration_max: s_o_segmentation_max
        }
    },
      program_end: {
        splice_command_type: e_command_type,
        input_trigger: {
          segmentation_type_id: e_i_segmentation_type_id,
          duration_flag: e_i_duration
        },
        output_trigger: {
          segmentation_type_id: e_o_segmentation_type_id,
          duration_flag: e_o_duration
        }
    }
  }
}

  addProviderAd(provider_ad): ProviderAd {
    console.log(provider_ad)
    let include_provider_ad_end = true
    if(typeof provider_ad["provider_ad_end"] == "undefined") {
      include_provider_ad_end = false;
    }

    let my_expected_splices_hour
    if(typeof provider_ad["expected_splices_hour"] == "undefined") {
      my_expected_splices_hour = 0
    } else {
      my_expected_splices_hour = provider_ad["expected_splices_hour"]
    }
    let my_validate_splice_count
    if(typeof provider_ad["validate_splice_count"] == "undefined") {
      my_validate_splice_count = false
    } else {
      my_validate_splice_count = provider_ad["validate_splice_count"]
    }
    //start
    let s_command_type
    try {s_command_type = provider_ad["provider_ad_start"]["splice_command_type"]} catch {s_command_type = 5}
    //start input
    let s_i_segmentation_type_id
    try {s_i_segmentation_type_id = provider_ad["provider_ad_start"]["input_trigger"]["segmentation_type_id"]} catch{s_i_segmentation_type_id=50}
    let s_i_duration
    try {s_i_duration = provider_ad["provider_ad_start"]["input_trigger"]["duration_flag"]} catch{s_i_duration=true}
    let s_i_segmentation_auto_return
    try {s_i_segmentation_auto_return = provider_ad["provider_ad_start"]["input_trigger"]["segmentation_auto_return"]} catch{s_i_segmentation_auto_return=false}
    let s_i_segmentation_min
    try {s_i_segmentation_min = provider_ad["provider_ad_start"]["input_trigger"]["segmentation_duration_min"]} catch{s_i_segmentation_min=58}
    let s_i_segmentation_max
    try {s_i_segmentation_max = provider_ad["provider_ad_start"]["input_trigger"]["segmentation_duration_max"]} catch{s_i_segmentation_max=62}
    //start output
    let s_o_segmentation_type_id
    try{s_o_segmentation_type_id = provider_ad["provider_ad_start"]["output_trigger"]["segmentation_type_id"]} catch{s_o_segmentation_type_id=50}
    let s_o_duration
    try {s_o_duration = provider_ad["provider_ad_start"]["input_trigger"]["duration_flag"]} catch{s_i_duration=true}
    let s_o_segmentation_auto_return
    try {s_o_segmentation_auto_return = provider_ad["provider_ad_start"]["input_trigger"]["segmentation_auto_return"]} catch{s_o_segmentation_auto_return=false}
    let s_o_segmentation_min
    try {s_o_segmentation_min = provider_ad["provider_ad_start"]["input_trigger"]["segmentation_duration_min"]} catch{s_o_segmentation_min=58}
    let s_o_segmentation_max
    try {s_o_segmentation_max = provider_ad["provider_ad_start"]["input_trigger"]["segmentation_duration_max"]} catch{s_o_segmentation_max=62}
    //end
    let e_command_type
    try {e_command_type = provider_ad["provider_ad_end"]["splice_command_type"]} catch {e_command_type = 5}
    //end input
    let e_i_segmentation_type_id
    try {e_i_segmentation_type_id = provider_ad["provider_ad_end"]["input_trigger"]["segmentation_type_id"]} catch{e_i_segmentation_type_id=50}
    let e_i_duration
    try {s_i_duration = provider_ad["provider_ad_start"]["input_trigger"]["duration_flag"]} catch{s_i_duration=true}
    //end output
    let e_o_segmentation_type_id
    try {e_o_segmentation_type_id = provider_ad["provider_ad_end"]["output_trigger"]["segmentation_type_id"]} catch{e_o_segmentation_type_id=50}
    let e_o_duration
    try {e_o_duration = provider_ad["provider_ad_start"]["input_trigger"]["duration_flag"]} catch{s_i_duration=true}

    let duration_deviation_tolerance
    if(typeof provider_ad["segmentation_duration_deviation_tolerance"] == "undefined") {
      duration_deviation_tolerance = 0.1
    } else {
      duration_deviation_tolerance = provider_ad["segmentation_duration_deviation_tolerance"]
    }

    return <ProviderAd> {
      provider_ad_start: {
        splice_command_type: s_command_type,
        input_trigger: {
          segmentation_type_id: s_i_segmentation_type_id,
          duration_flag: s_i_duration,
          segmentation_auto_return: s_i_segmentation_auto_return,
          segmentation_duration_min: s_i_segmentation_min,
          segmentation_duration_max: s_i_segmentation_max
        },
        output_trigger: {
          segmentation_type_id: s_o_segmentation_type_id,
          duration_flag: s_o_duration,
          segmentation_auto_return: s_o_segmentation_auto_return,
          segmentation_duration_min: s_o_segmentation_min,
          segmentation_duration_max: s_o_segmentation_max
        }
    },
      provider_ad_end: {
        splice_command_type: e_command_type,
        input_trigger: {
          segmentation_type_id: e_i_segmentation_type_id,
          duration_flag: e_i_duration
        },
        output_trigger: {
          segmentation_type_id: e_o_segmentation_type_id,
          duration_flag: e_o_duration
        }
    }
  }
}

  writeConfig(newConfig) {
    let postHeaders = new HttpHeaders({'Content-type': 'application/json', 'Referrer-Policy': 'origin'})
    return this.http.post("http://127.0.0.1:8000/config", newConfig, {headers: postHeaders}).pipe(
      map((response: any) => {
        console.log(response)
      })
    );
  }
}
