import json
import pymongo
from pymongo.uri_parser import parse_host

def load_temp():
    temp_config = json.loads(open("./translate_temp/template_temp.json", "r").read())
    return temp_config

def network_translate():

    #inputs = sys.argv
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
    x = col["Configs"]

    for nodes in x.find({"_id": 236}):
        pass

    temp_config = load_temp()
    translate_gen(nodes,temp_config)
    clean_up_pre(temp_config)
    sendtodb(temp_config)
    print(temp_config)

    #for networks in x.distinct("network_id"):
        #for nodes in x.find({"network_id" : networks}):
            #temp_config = load_temp()
            #translate_gen(nodes, temp_config)
            #clean_up_pre(temp_config)
            #sendtodb(temp_config)



def translate_gen(nodes, temp_config):
    for i in nodes:
        if i == "emails":
            #temp_config["recipient_emails"][len(temp_config["recipient_emails"])-1] = nodes[i]
            temp_config["recipient_emails"] = nodes[i]
        if i == "validation_frequency":
            temp_config["frequency"] = nodes[i]
        if i == "network_id":
            temp_config["network_id"] = nodes[i]
        if i == "localbreak" and len(nodes[i]) > 0:
            switch = 0
            localbreak_translate(nodes[i], temp_config, switch)
        if i == "contentid" and len(nodes[i]) > 0:
            pass
            #contentid_translate(nodes[i], temp_config)
        if i == "nationalbreak" and len(nodes[i]) > 0:
            switch = 1
            localbreak_translate(nodes[i], temp_config, switch)
        if i == "pro" and len(nodes[i]) > 0:
            pass
            #program_translate(nodes[i], temp_config)


def localbreak_translate(localbreak, temp_config, switch):
    if switch == 0:
        placeholder = "local_break"
    elif switch == 1:
        placeholder = "national_break"
    for i in range(len(localbreak)):
        if type(localbreak[i]) != type(None) and localbreak[i] != "none" and localbreak[i] != "":
            if i == 0:
                temp_config[placeholder]["expected_splices_hour"] = int(localbreak[i])
            elif i == 1:
                temp_config[placeholder][placeholder+"_start"]["action"] = localbreak[i]
            elif i == 2:
                num = int(localbreak[i].split(" ")[0].split("[")[1].split("]")[0])
                temp_config[placeholder][placeholder+"_start"]["input_trigger"]["splice_command_type"] = num
            elif i == 3:
                temp_config[placeholder][placeholder+"_start"]["input_trigger"]["out_of_network_indicator"] = localbreak[i]
            elif i == 4:
                temp_config[placeholder][placeholder+"_start"]["input_trigger"]["splice_event_id"] = localbreak[i]
            elif i == 5:
                temp_config[placeholder][placeholder+"_start"]["input_trigger"]["splice_immediate_flag"] = localbreak[i]
            elif i == 6:
                temp_config[placeholder][placeholder+"_start"]["input_trigger"]["duration_flag"] = localbreak[i]
            elif i == 7:
                temp_config[placeholder][placeholder+"_start"]["input_trigger"]["break_duration_min"] = int(localbreak[i])
            elif i == 8:
                temp_config[placeholder][placeholder+"_start"]["input_trigger"]["break_duration_max"] = int(localbreak[i])
            elif i == 9:
                temp_config[placeholder][placeholder+"_start"]["input_trigger"]["break_auto_return"] = localbreak[i]
            elif i == 10:
                num = int(localbreak[i].split(" ")[0].split("[")[1].split("]")[0])
                temp_config[placeholder][placeholder+"_start"]["output_trigger"]["splice_command_type"] = num
            elif i == 11:
                temp_config[placeholder][placeholder+"_start"]["output_trigger"]["out_of_network_indicator"] = localbreak[i]
            elif i == 12:
                temp_config[placeholder][placeholder+"_start"]["output_trigger"]["splice_event_id"] = localbreak[i]
            elif i == 13:
                temp_config[placeholder][placeholder+"_start"]["output_trigger"]["splice_immediate_flag"] = localbreak[i]
            elif i == 14:
                temp_config[placeholder][placeholder+"_start"]["output_trigger"]["duration_flag"] = localbreak[i]
            elif i == 15:
                temp_config[placeholder][placeholder+"_start"]["output_trigger"]["break_duration_min"] = int(localbreak[i])
            elif i == 16:
                temp_config[placeholder][placeholder+"_start"]["output_trigger"]["break_duration_max"] = int(localbreak[i])
            elif i == 17:
                temp_config[placeholder][placeholder+"_start"]["output_trigger"]["break_auto_return"] = localbreak[i]
            elif i == 18:
                temp_config[placeholder][placeholder+"_end"]["action"] = localbreak[i]
            elif i == 19:
                num = int(localbreak[i].split(" ")[0].split("[")[1].split("]")[0])
                temp_config[placeholder][placeholder+"_end"]["input_trigger"]["splice_command_type"] = num
            elif i == 20:
                temp_config[placeholder][placeholder+"_end"]["input_trigger"]["out_of_network_indicator"] = localbreak[i]
            elif i == 21:
                temp_config[placeholder][placeholder+"_end"]["input_trigger"]["splice_event_id"] = localbreak[i]
            elif i == 22:
                temp_config[placeholder][placeholder+"_end"]["input_trigger"]["splice_immediate_flag"] = localbreak[i]
            elif i == 23:
                temp_config[placeholder][placeholder+"_end"]["input_trigger"]["duration_flag"] = localbreak[i]
            elif i == 24:
                num = int(localbreak[i].split(" ")[0].split("[")[1].split("]")[0])
                temp_config[placeholder][placeholder+"_end"]["output_trigger"]["splice_command_type"] = num
            elif i == 25:
                temp_config[placeholder][placeholder+"_end"]["output_trigger"]["out_of_network_indicator"] = localbreak[i]
            elif i == 26:
                temp_config[placeholder][placeholder+"_end"]["output_trigger"]["splice_event_id"] = localbreak[i]
            elif i == 27:
                temp_config[placeholder][placeholder+"_end"]["output_trigger"]["splice_immediate_flag"] = localbreak[i]
            elif i == 28:
                temp_config[placeholder][placeholder+"_end"]["output_trigger"]["duration_flag"] = localbreak[i]
            elif i == 29:
                temp_config[placeholder]["break_duration_deviation_tolerance"] = float(localbreak[i])
            elif i == 30:
                num = int(localbreak[i].split(" ")[0].split("[")[1].split("]")[0])
                temp_config[placeholder][placeholder+"_start"]["input_trigger"]["segmentation_type_id"] = num
            elif i == 31:
                num = int(localbreak[i].split(" ")[0].split("[")[1].split("]")[0])
                temp_config[placeholder][placeholder+"_start"]["output_trigger"]["segmentation_type_id"] = num
            elif i == 32:
                num = int(localbreak[i].split(" ")[0].split("[")[1].split("]")[0])
                temp_config[placeholder][placeholder+"_end"]["input_trigger"]["segmentation_type_id"] = num
            elif i == 33:
                num = int(localbreak[i].split(" ")[0].split("[")[1].split("]")[0])
                temp_config[placeholder][placeholder+"_end"]["output_trigger"]["segmentation_type_id"] = num

def contentid_translate(contentid, temp_config):
    for i in range(len(contentid)):
        if type(contentid[i]) != type(None) and contentid[i] != "none" and contentid[i] != "":
            if i == 0:
                temp_config["content_id"]["segmentation_type_id"] = contentid[i]
            elif i == 1:
                temp_config["content_id"]["splice_command_type"] = contentid[i]
            elif i == 2:
                temp_config["content_id"]["segmentation_event_cancel_indicator"] = contentid[i]
            elif i == 3:
                temp_config["content_id"]["program_segmentation_flag"]= contentid[i]
            elif i == 4:
                temp_config["content_id"]["segmentation_duration_flag"] = contentid[i]
            elif i == 5:
                temp_config["content_id"]["delivery_not_restricted_flag"] = contentid[i]
            elif i == 6:
                temp_config["content_id"]["segmentation_upid_type"] = contentid[i]
            elif i == 7:
                temp_config["content_id"]["segmentation_upid_length"] = contentid[i]
            elif i == 8:
                temp_config["content_id"]["time_specified_flag"] = contentid[i]

def program_translate(program, temp_config):
    for i in range(len(program)):
        if type(program[i]) != type(None) and program[i] != "none" and program[i] != "":
            if i == 0:
                temp_config["program"]["time_specified_flag"] = program[i]
            elif i == 1:
                temp_config["program"]["program_start"]["segmentation_type_id"] = program[i]
            elif i == 2:
                temp_config["program"]["program_start"]["splice_command_type"] = program[i]
            elif i == 3:
                temp_config["program"]["program_start"]["segmentation_duration_flag"] = program[i]
            elif i == 4:
                temp_config["program"]["program_start"]["segmentation_duration_min"] = program[i]
            elif i == 5:
                temp_config["program"]["program_start"]["segmentation_duration_max"] = program[i]
            elif i == 6:
                temp_config["program"]["program_start"]["segmentation_event_cancel_indicator"] = program[i]
            elif i == 7:
                temp_config["program"]["program_start"]["program_segmentation_flag"] = program[i]
            elif i == 8:
                temp_config["program"]["program_start"]["delivery_not_restricted_flag"] = program[i]
            elif i == 9:
                temp_config["program"]["program_start"]["segmentation_upid_type"] = program[i]
            elif i == 10:
                temp_config["program"]["program_start"]["segmentation_upid_length"] = program[i]
            elif i == 11:
                temp_config["program"]["program_end"]["segmentation_type_id"] = program[i]
            elif i == 12:
                temp_config["program"]["program_end"]["splice_command_type"] = program[i]
            elif i == 13:
                temp_config["program"]["program_end"]["segmentation_duration_flag"] = program[i]
            elif i == 14:
                temp_config["program"]["program_end"]["segmentation_event_cancel_indicator"] = program[i]
            elif i == 15:
                temp_config["program"]["program_end"]["program_segmentation_flag"] = program[i]
            elif i == 16:
                temp_config["program"]["program_end"]["delivery_not_restricted_flag"] = program[i]
            elif i == 17:
                temp_config["program"]["program_end"]["segmentation_upid_type"] = program[i]
            elif i == 18:
                temp_config["program"]["program_end"]["segmentation_upid_length"] = program[i]

def clean_up_pre(temp_config):
    for i in list(temp_config):
        if i != "recipient_emails" and i != "frequency" and i != "network_id":
            clean_up(temp_config[i])
            clean_up_after(temp_config[i])
            if len(temp_config[i]) == 0:
                del temp_config[i]


def clean_up(temp_config_inner):
    for key, value in list(temp_config_inner.items()):
        if type(value) == type({}):
            clean_up(value)
        else:
            if value == "" or type(value) == type(None) or value == -1:
                del temp_config_inner[key]

def clean_up_after(temp_config_after):
    for i in list(temp_config_after.keys()):
        if type(temp_config_after[i]) == type({}) and len(temp_config_after[i]) > 0:
            clean_up_after(temp_config_after[i])
        elif type(temp_config_after[i]) == type({}) and len(temp_config_after[i]) == 0:
            del temp_config_after[i]
    for i in list(temp_config_after):
        if type(temp_config_after[i]) == type({}) and len(temp_config_after[i]) == 0:
            del temp_config_after[i]


def sendtodb(temp_config):
    inputs = "ccc16:hhh21"
    #splitter = inputs[1].split(":")
    splitter = inputs.split(":")
    username = splitter[0]
    password = splitter[1]
    connection = "mongodb+srv://"+ username + ":" + password + "@scte.cfbun.mongodb.net/Configurations?retryWrites=true&w=majority"
    client = pymongo.MongoClient(connection)
    db = client.Configurations
    db.BackendConfigs.insert_one(temp_config)