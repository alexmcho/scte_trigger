import threefive
from threefive import Cue
import json
#using threefive 2.2.25


#one single string validation to the the config

error_list = []
action_dict = {}
deviation_network = {}


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

def action_dict_add(splitted):
    if splitted[0].find("OUT") > -1:
        action_dict[splitted[2]] = splitted[4]
    return action_dict

def break_deviation_calc(tolarance_ruler, c_bd_devi_tol, network_name):
    if tolarance_ruler <= c_bd_devi_tol:
        deviation_network.clear()
        pass
    else:
        error_list.append("break_duration_deviation_tolerance violation for " + str(deviation_network[network_name+"uuid_1"])
        + " pts_time_start = " +  str(deviation_network[network_name+":Start"]) + " and " + str(deviation_network[network_name+"uuid_2"]) 
        + " pts_time_end = "+ str(deviation_network[network_name+":End"]) 
        +" deviation over tolerance: " + str(c_bd_devi_tol) + " by " + str(tolarance_ruler))
        deviation_network.clear()


def deviation_network_calc(splitted, cue, start_or_end, c_bd_devi_tol):
    # break_duration - time_separation, time_separation = pts_time_end - pts_time_start
    # pts_time_end = local break end, pts_time_start = local break start
    network_name = splitted[1]
    deviation_network[network_name+":pts_s"] = False
    deviation_network[network_name+":pts_e"] = False
    if start_or_end == True:
        pts_time_start = cue.get_command()["pts_time"]
        break_duration = cue.get_command()["break_duration"]
        deviation_network[network_name+":Start"] = pts_time_start
        deviation_network[network_name+":Duration"] = break_duration
        deviation_network[network_name+"uuid_1"] = splitted[2]
        deviation_network[network_name+":pts_s"] = True
    elif start_or_end == False and deviation_network[network_name+":pts_s"]:
        pts_time_end = cue.get_command()["pts_time"]
        deviation_network[network_name+":End"] = pts_time_end
        deviation_network[network_name+"uuid_2"] = splitted[2]
        deviation_network[network_name+":pts_e"] = True
    if deviation_network[network_name+":pts_s"] and deviation_network[network_name+":pts_e"]:
        time_separation = deviation_network[network_name+":End"] - deviation_network[network_name+":Start"]
        tolarance_ruler = deviation_network[network_name+":Duration"] - time_separation
        break_deviation_calc(tolarance_ruler, c_bd_devi_tol, network_name)

def action_dict_clear():
    action_dict.clear()

#the devi_func requires to have the log be in chronological order for calculation to be done right, 
#log files I have need to be read from bottom up to be chronological
#if read from top to bottom, the first line which is a break_end will be skipped
#on the other hand action_dict and a_d must be read from top to bottom to work at all, otherwise there will be an KeyError
#in other words, if the code needs to be refactored, 
#one could change the for-loop in a way to take in two lines at each iteration and change how action_dict takes in data
#or change the behavior of action_dict therefore a_d alone in way that does not cause KeyError
#the above two suggestion are assuming that one would change the for-loop to a single for-loop that read from bottom up,
#instead of an nested for-loop
def devi_func(body_log, config):
    splitted = body_log.split(":")
    cue = Cue(splitted[3])
    start_or_end = cue.get_command()["out_of_network_indicator"]
    #break_duration_deviation_tolerance
    c_bd_devi_tol = config["local_break"]["break_duration_deviation_tolerance"]
    splice_command_type = cue.get_info_section()["splice_command_type"]
    #calculate rather break duration deviation is in tolarance
    if splitted[0].find("IN") and splice_command_type == 5:
        deviation_network_calc(splitted, cue, start_or_end, c_bd_devi_tol)

def logverify(body_log, config):
    error_list.clear()
    key = False
    # for i in body_log:
    #     splitted = str(i).split(":")
    #print("this is i : " + str(i) + " this is splitted : " + str(splitted))
    splitted = body_log.split(":")
    cue = Cue(splitted[3])
    #if start_or_end is true, then it is local break start
    start_or_end = cue.get_command()["out_of_network_indicator"]
    splice_command_type = cue.get_info_section()["splice_command_type"]
    print("start or end :" + str(start_or_end))
    uuid = splitted[2]
    if start_or_end == True and splice_command_type == 5:
        #lbs = local break start, c = config
        c_lbs = config["local_break"]["local_break_start"]
        c_lbs_action = c_lbs["action"]
        print("lbsaction is "  + c_lbs_action)
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

    #Time Signal 
    if splice_command_type == 6:
        ct6_seg_id = hex(cue.get_descriptors()[0]["segmentation_type_id"])
        # 0x30 Provider Advertisement Start
        if ct6_seg_id == "0x30":
            # config_provider_ad_start
            c_pas = config["provider_ad"]["provider_ad_start"]
        # 0x31 Provider Advertisement End
        elif ct6_seg_id == "0x31":
            # config_provider_ad_end
            c_pae = config["provider_ad"]["provider_ad_end"]
        # 0x34 Provider Placement Opportunity Start
        elif ct6_seg_id == "0x34":
            # config_provider_placement_opportunity_start
            c_ppos = config["placement_opportunity"]["placement_opportunity_start"]
        # 0x35 Provider Placement Opportunity End
        elif ct6_seg_id == "0x35":
            c_ppoe = config["placement_opportunity"]["placement_opportunity_end"]
        elif ct6_seg_id == "0x01":
            c_c_id = config["content_id"]

    a_d = action_dict_add(splitted)
    #print("action_dict : " + str(a_d))

    if "c_lbs_input" in locals() and splitted[0].find("IN") > -1 and a_d[splitted[2]] == c_lbs_action:       
        print("hellowww " + str(splitted) + "   ====" + c_lbs_action)
        check_compare(cue, splice_command_type, c_lbs_input)
    if "c_lbs_output" in locals() and a_d[splitted[2]] == c_lbs_action:
        print("Hellodqwd")
        check_compare(cue, splice_command_type, c_lbs_output)
    if "c_lbe_input" in locals() and splitted[0].find("IN") > -1 and a_d[splitted[2]] == c_lbe_action:
        print("HOwdy! " + c_lbe_action)
        check_compare(cue, splice_command_type, c_lbe_input)
    if "c_lbe_output" in locals() and a_d[splitted[2]] == c_lbe_action:
        print("YOOOO")
        check_compare(cue, splice_command_type, c_lbe_output)
    if "c_pas" in locals():
        check_compare(cue, splice_command_type, c_pas)
    if "c_pae" in locals():
        check_compare(cue, splice_command_type, c_pae)
    if "c_ppos" in locals():
        check_compare(cue, splice_command_type, c_ppos)
    if "c_ppoe" in locals():
        check_compare(cue, splice_command_type, c_ppoe)
    if "c_c_id" in locals():
        check_compare(cue, splice_command_type, c_c_id)
    
    return [error_list, uuid, str(cue.get_command())]


    # if "c_lbs_output" in locals():
    #     for i in c_lbs_output.keys():

def check_compare(cue, command_type, config_part):
    if command_type == 5:
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
    elif command_type == 6:
        #need to write for command type 6
        for i in config_part.keys():
            try:
                cue.get_descriptors()[0][i]
            except KeyError:
                continue
            if cue.get_descriptors()[0][i] == config_part[i]:
                pass
            else:
                list_append_tsig(i, cue, config_part)
    if event_id_check(cue, config_part) and command_type == 5:
        pass
    else:
        error_list.append("splice_event_id is not in the correct format : " + "log : " + str(cue.get_command()["splice_event_id"]) + "config : " + str(config_part["splice_event_id"]))
    if cue.get_command()["duration_flag"] == True and command_type == 5:
        if duration_check(cue, config_part):
            pass
        else:
            error_list.append("break_duration does not complie with config, value is not in between " + str(config_part["break_duration_min"]) + " and " + str(config_part["break_duration_max"]))


def list_append(i, cue, config_part):
    return error_list.append("log : " + i + " : " + str(cue.get_command()[i]) + " --------> does not complie with config -----> " + " config : " + i + " : " + str(config_part[i]))

def list_append_tsig(i, cue, config_part):
    return error_list.append("log : " + i + " : " + str(cue.get_descriptors()[0][i]) + " --------> does not complie with config -----> " + " config : " + i + " : " + str(config_part[i]))