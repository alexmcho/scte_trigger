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
    }
}
