import threefive
from threefive import Cue
import json
#using threefive 2.2.25


#one single string validation to the the config


error_list = []


def duration_check(cue, body):
    if cue.get_command()["break_duration"] >= body["break_duration_min"] and cue.get_command()["break_duration"] <= body["break_duration_max"]:
        return True
    else:
        return False
    
    
def event_id_check(cue, body):
    if type(cue.get_command()["splice_event_id"]) == int:
        return True
    else:
        return False


def logverify(body_log, config):
    error_list.clear()
    key = False
    # for i in body_log:
    #     splitted = str(i).split(":")
    #print("this is i : " + str(i) + " this is splitted : " + str(splitted))
    splitted = body_log.split(":")
    cue = Cue(splitted[3])
    start_or_end = cue.get_command()["out_of_network_indicator"]
    splice_command_type = cue.get_info_section()["splice_command_type"]
    print("start or end :" + str(start_or_end))
    uuid = splitted[2]
    if start_or_end == True and splice_command_type == 5:
        #lbs = local break start, c = config
        c_lbs = config["local_break"]["local_break_start"]
        c_lbs_action = c_lbs["action"]
        try:
            c_lbs_input = c_lbs["input_trigger"]
        except KeyError:
            print("input trigger for local break start does not exist for this config")
        try:
            c_lbs_output = c_lbs["output_trigger"]
        except KeyError:
            print("output trigger for local break start does not exist for this config")
    elif splice_command_type == 5:
        #lbe = local break end
        c_lbe = config["local_break"]["local_break_end"]
        c_lbe_action = c_lbe["action"]
        try:
            c_lbe_input = c_lbe["input_trigger"]
        except KeyError:
            print("input trigger for local break end does not exist for this config")
        try:
            c_lbe_output = c_lbe["output_trigger"]
        except KeyError:
            print("output trigger for local break end does not exist for this config")
    #elif for splice_command_type other than 5 continue down here
    
    if "c_lbs_input" in locals() and splitted[0].find("IN") > -1:       
        #print("hellowww " + str(splitted))
        check_compare(cue, c_lbs_input)
    if "c_lbs_output" in locals():
        #print("Hellodqwd")
        check_compare(cue, c_lbs_output)
    if "c_lbe_input" in locals() and splitted[0].find("IN") > -1:
        check_compare(cue, c_lbe_input)
    if "c_lbe_output" in locals():
        check_compare(cue, c_lbe_output)
    
    return [error_list, uuid, str(cue.get_command())]


    # if "c_lbs_output" in locals():
    #     for i in c_lbs_output.keys():


def check_compare(cue, config_part):
    for i in config_part.keys():
        try:
            cue.get_command()[i]
        except KeyError:
            continue
        #if cue.get_command()[i] == config_part[i] and i != "splice_event_id" and i != "break_auto_return" and i != "break_duration_min" and i != "break_duration_max":
        if cue.get_command()[i] == config_part[i]:
            pass
        elif i != "splice_event_id":
            list_append(i,cue,config_part)
    if event_id_check(cue, config_part):
        pass
    else:
        error_list.append("splice_event_id is not in the correct format : " + "log : " + str(cue.get_command["splice_event_id"]) + "config : " + str(config_part["splice_event_id"]))
    if cue.get_command()["duration_flag"] == True:
        if duration_check(cue, config_part):
            pass
        else:
            error_list.append("break_duration does not complie with config, value is not in between " + str(config_part["break_duration_min"]) + " and " + str(config_part["break_duration_max"]))


def list_append(i, cue, config_part):
    return error_list.append("log : " + i + " : " + str(cue.get_command()[i]) + " --------> does not complie with config -----> " + " config : " + i + " : " + str(config_part[i]))
