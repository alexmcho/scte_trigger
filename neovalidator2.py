from base64 import decode
from neovalidator import check_compare
from bson.objectid import ObjectId
import threefive
from threefive import Cue
import json
import pymongo
import neoalert

error_list = []
error_list2 = []

#insert network_id
def getfrommongo():
    #network_id,config,nodes,q
    inputs = "ccc16:hhh21"
    #splitter = inputs[1].split(":")
    splitter = inputs.split(":")
    username = splitter[0]
    password = splitter[1]
    connection = "mongodb+srv://"+ username + ":" + password + "@scte.cfbun.mongodb.net/Configurations?retryWrites=true&w=majority"
    client = pymongo.MongoClient(connection)
    db = client.test
    print(db)
    col = client["Configurations"]
    x = col["Adspace"]
    z = col["BackendConfigs"]
    
    for config in z.find({"network_id" : "MSNBC-4000"}):
        pass

    #for nodes in x.find({"_id" :ObjectId('60b80a323b77502dce74aae1')}, {"0"}):
        #pass

    #for config in z.distinct({"network_id"}):
        #for nodes in x.find({"NetworkId": j}):
            #pass

    for nodes in x.find({"NetworkId": "MSNBC-1590.dfw.1080"}):
        decode_input = Cue(nodes["inputBase64"])
        decode_output = Cue(nodes["OutputBase64"])
        action = nodes["Action"].strip()
        uuid = nodes["Uuid"]
        result = log_verify(decode_input, decode_output, action, uuid, config)
        neoalert.alert_issues(result[0], str(result[1]), str(result[2]), config)

    # decode_input = Cue(nodes["inputBase64"])
    # decode_output = Cue(nodes["OutputBase64"])
    # action = nodes["Action"].strip()
    # uuid = nodes["Uuid"]
    # q.put(log_verify(decode_input, decode_output, action, uuid, config))


def duration_check(cue, body):
    if cue.get_command()["break_duration"] >= body["break_duration_min"] and cue.get_command()["break_duration"] <= body["break_duration_max"]:
        return True
    else:
        return False


def event_id_check(decode, body):
    if type(decode.get_command()["splice_event_id"]) == int:
        return True
    else:
        return False

    
def table_of_seg_type_id(cue, config):
    #Time Signal 
    ct6_seg_id = hex(cue.get_descriptors()[0]["segmentation_type_id"])
    # 0x30 Provider Advertisement Start
    if ct6_seg_id == "0x30":
        read_pointer = config["provider_ad"]["provider_ad_start"]
    # 0x31 Provider Advertisement End
    elif ct6_seg_id == "0x31":
        read_pointer = config["provider_ad"]["provider_ad_end"]
    # 0x34 Provider Placement Opportunity Start
    elif ct6_seg_id == "0x34":
        read_pointer = config["placement_opportunity"]["placement_opportunity_start"]
    # 0x35 Provider Placement Opportunity End
    elif ct6_seg_id == "0x35":
        read_pointer = config["placement_opportunity"]["placement_opportunity_end"]
    elif ct6_seg_id == "0x01":
        read_pointer = config["content_id"]
    elif ct6_seg_id == "0x10":
        read_pointer = config["program"]["program_start"]
    elif ct6_seg_id == "0x11":
        read_pointer = config["program"]["program_end"]


def log_verify(decode_input, decode_output, action, uuid ,config):
    error_list.clear()
    error_list2.clear()
    #if action is NOOP or DELETE only check for one of the triggers
    if action == "NOOP" or action == "DELETE":
        splice_command_type = decode_input.get_info_section()["splice_command_type"]
        if splice_command_type == 5:
            start_or_end = decode_input.get_command()["out_of_network_indicator"]
            if start_or_end == True:
                try:
                    c_lbs_input = config["local_break"]["local_break_start"]["input_trigger"]
                except KeyError:
                    print("input trigger for local break start does not exist for this config")
                try:
                    c_lbs_output = config["local_break"]["local_break_start"]["output_trigger"]
                except KeyError:
                    print("output trigger for local break start does not exist for this config")
                c_lbs_action = config["local_break"]["local_break_start"]["action"]
                if action == c_lbs_action:
                    pass
                else:
                    pass
            else:
                try:
                    c_lbe_input = config["local_break"]["local_break_end"]["input_trigger"]
                except KeyError:
                    print("input trigger for local break end does not exist for this config")
                try:
                    c_lbe_output = config["local_break"]["local_break_end"]["output_trigger"]
                except KeyError:
                    print("output trigger for local break end does not exist for this config")
                c_lbe_action  = config["local_break"]["local_break_end"]["action"]
                if action == c_lbe_action:
                    pass
                else:
                    pass
    else:
        pass

    if "c_lbs_input" in locals():
        print("11111111111222222222222222222")
        check_compare(decode_input, c_lbs_input, splice_command_type)
    if "c_lbs_output" in locals():
        check_compare(decode_input, c_lbs_output, splice_command_type)
    if "c_lbe_input" in locals():
        check_compare(decode_input, c_lbe_input, splice_command_type)
    if "c_lbe_output" in locals():
        check_compare(decode_input, c_lbe_output, splice_command_type)
    print(error_list)
    print(error_list2)
    return [error_list, uuid, str(decode_input.get_command())]


def check_compare(decode, config_part, command_type):
    if command_type == 5:
        for i in config_part.keys():
            try:
                decode.get_command()[i]
            except KeyError:
                continue
            if decode.get_command()[i] == config_part[i]:
                print("compare running")
                pass
            elif i != "splice_event_id":
                list_append(i,decode,config_part)
    if event_id_check(decode, config_part) and command_type == 5:
        pass
    else:
        error_list.append("splice_event_id is not in the correct format : " + "log : " + str(decode.get_command()["splice_event_id"]) + "config : " + str(config_part["splice_event_id"]))
    if decode.get_command()["duration_flag"] == True and command_type == 5:
        if duration_check(decode, config_part):
            pass
        else:
            error_list.append("break_duration does not complie with config, value is not in between " + str(config_part["break_duration_min"]) + " and " + str(config_part["break_duration_max"]))
    


def list_append(i, decode, config_part):
    return error_list.append("log : " + i + " : " + str(decode.get_command()[i]) + " --------> does not complie with config -----> " + " config : " + i + " : " + str(config_part[i]))

def list_append_tsig(i, decode, config_part):
    return error_list.append("log : " + i + " : " + str(decode.get_descriptors()[0][i]) + " --------> does not complie with config -----> " + " config : " + i + " : " + str(config_part[i]))