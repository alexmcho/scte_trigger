// export interface LocalBreakStart {
//     "splice_command_type": number;
//     "splice_event_id": string;
//     "out_of_network_indicator": boolean;
//     "duration_flag": boolean;
//     "splice_immediate_flag": boolean;
//     "break_auto_return": boolean;
//     "break_duration": number | number[]
// }

// export interface LocalBreakEnd {
//     "splice_command_type": number;
//     "splice_event_id": string;
//     "out_of_network_indicator": boolean;
//     "duration_flag": boolean;
//     "splice_immediate_flag": boolean;
// }

// export interface InputTrigger {

// }

export interface LocalBreak {
    "include_break_end": boolean,
    "expected_splices_hour": number,
    "validate_splice_count": boolean,
    "local_break_start": {
        "splice_command_type": 5,
        "action": "NOOP" | "DELETE" | "REPLACE",
        "input_trigger": {
            "splice_event_id": "isnumeric",
            "out_of_network_indicator": true,
            "duration_flag": true,
            "splice_immediate_flag": false,
            "break_auto_return": false,
            "break_duration_min": number,
            "break_duration_max": number
        },
        "output_trigger": {
            "splice_event_id": "isnumeric",
            "out_of_network_indicator": true,
            "duration_flag": true,
            "splice_immediate_flag": false,
            "break_auto_return": false,
            "break_duration_min": number,
            "break_duration_max": number
        }
    },
    "local_break_end": {
        "splice_command_type": 5,
        "action": "NOOP" | "DELETE" | "REPLACE",
        "input_trigger": {
            "splice_event_id": "isnumeric",
            "out_of_network_indicator": false,
            "duration_flag": false,
            "splice_immediate_flag": false
        },
        "output_trigger": {
            "splice_event_id": "isnumeric",
            "out_of_network_indicator": false,
            "duration_flag": false,
            "splice_immediate_flag": false
        }
    },
    "break_duration_deviation_tolerance": number
}

export interface ContentId {
    "content_id_start": {
        "splice_command_type": 5,
        "input_trigger": {
            "segmentation_type_id": "isnumeric",
        },
        "output_trigger": {
            "segmentation_type_id": "isnumeric",
        }
    },
    "content_id_end": {
        "splice_command_type": 5,
        "input_trigger": {
            "segmentation_type_id": "isnumeric",
        },
        "output_trigger": {
            "segmentation_type_id": "isnumeric",
        }
    }
}

export interface PlacementOpportunity {
    "placement_opportunity_start": {
        "splice_command_type": 5,
        "input_trigger": {
            "segmentation_type_id": "isnumeric",
            "duration_flag": true,
            "segmentation_auto_return": false,
            "segmentation_duration_min": number,
            "segmentation_duration_max": number
        },
        "output_trigger": {
            "segmentation_type_id": "isnumeric",
            "duration_flag": true,
            "segmentation_auto_return": false,
            "segmentation_duration_min": number,
            "segmentation_duration_max": number
        }
    },
    "placement_opportunity_end": {
        "splice_command_type": 5,
        "input_trigger": {
            "segmentation_type_id": 1,
            "duration_flag": false
        },
        "output_trigger": {
            "segmentation_type_id": 1,
            "duration_flag": false
        }
    }
}

export interface Program {
    "program_start": {
        "splice_command_type": 5,
        "input_trigger": {
            "segmentation_type_id": "isnumeric",
            "duration_flag": true,
            "segmentation_auto_return": false,
            "segmentation_duration_min": number,
            "segmentation_duration_max": number
        },
        "output_trigger": {
            "segmentation_type_id": "isnumeric",
            "duration_flag": true,
            "segmentation_auto_return": false,
            "segmentation_duration_min": number,
            "segmentation_duration_max": number
        }
    },
    "program_end": {
        "splice_command_type": 5,
        "input_trigger": {
            "segmentation_type_id": "isnumeric",
            "duration_flag": false
        },
        "output_trigger": {
            "segmentation_type_id": "isnumeric",
            "duration_flag": false

        }
    }
}

export interface ProviderAd {
    "provider_ad_start": {
        "splice_command_type": 5,
        "input_trigger": {
            "segmentation_type_id": "isnumeric",
            "duration_flag": true,
            "segmentation_auto_return": false,
            "segmentation_duration_min": number,
            "segmentation_duration_max": number
        },
        "output_trigger": {
            "segmentation_type_id": "isnumeric",
            "duration_flag": true,
            "segmentation_auto_return": false,
            "segmentation_duration_min": number,
            "segmentation_duration_max": number
        }
    },
    "provider_ad_end": {
        "splice_command_type": 5,
        "input_trigger": {
            "segmentation_type_id": "isnumeric",
            "duration_flag": false,
            "segmentation_duration_min": number,
            "segmentation_duration_max": number
        },
        "output_trigger": {
            "segmentation_type_id": "isnumeric",
            "duration_flag": false,
            "segmentation_duration_min": number,
            "segmentation_duration_max": number
        }
    }
}