import threefive

def sort_by_timestamp(e):
    '''
    Use to sort all the paired elements by the timestamp
    '''
    return e["timestamp"]


def clean_list(full_list, spliceCommandType, networkid):
    '''
    This method eliminates all the triggers that are any type other than spliceCommandType
    and all the triggers that are not of networkid 
    '''
    type_list = []
    for i in range(0, len(full_list)):
        item = full_list[i].split(":")
        if item[1] == networkid:
            cue = threefive.decode(item[3]).get()
            if cue["info_section"]["splice_command_type"] == spliceCommandType:
                type_list.append(full_list[i])
    return type_list


def pair_up(log):
    '''
    Pairs all the triggers based on the uuid
    '''
    pairs = list()
    found_id = []
    for i in range(0, len(log)):
        timestamp = log[i].split(" ")[0]
        id = log[i].split(":")[2]
        if id not in found_id:
            for j in range(i+1, len(log)):
                if log[j].split(":")[2] == id:
                    if log[i].split(" ")[1].split(":")[0] == "IN" and log[j].split(" ")[1].split(":")[0] == "OUT":
                        pairs.append({"timestamp": timestamp, "input_trigger": log[i].split(
                            " ")[1], "output_trigger": log[j].split(" ")[1]})
                        found_id.append(id)
                        break
                    elif log[j].split(" ")[1].split(":")[0] == "IN" and log[i].split(" ")[1].split(":")[0] == "OUT":
                        pairs.append({"timestamp": timestamp, "input_trigger": log[j].split(
                            " ")[1], "output_trigger": log[i].split(" ")[1]})
                        found_id.append(id)
                        break
            if id not in found_id:
                print('warning: data at line {} missing pair'.format(i+1))
    return pairs


def compare(cue, template):
    '''
    Validates that the template matches with the cue
    '''
    for template_key in template.keys():  # For every key:value pair defined in the template

        template_value = template[template_key]

        # if the template value is "isnumeric" then just check if the cue value is a number but not the value
        if template_value == "isnumeric":
            try:
                float(cue["command"][template_key])
            except ValueError:
                print("must use a numeric value for {}".format(template_key))
                return False
            except KeyError:
                print("{} does not exist in insertion commands".format(template_key))
                return False

        # elif template_key == "break_duration_max":
        #     if cue["command"]["break_duration"] > template_value:
        #         return False

        # elif template_key == "break_duration_min":
        #     if cue["command"]["break_duration"] < template_value:
        #         return False

        # otherwise check if the template value and cue value are the same
        else:
            if template_key in cue["command"]:
                if cue["command"][template_key] != template_value:
                    return False

    # if all cue values match the template then return True
    return True


def timing_deviation(cue_start, cue_end, tolerance, b_d_max, b_d_min):
    '''
    Finds any time deviation that surpasses the tolerance
    '''
    break_duration = cue_start['command']['break_duration']
    cue_start_time = cue_start['command']['pts_time']
    cue_end_time = cue_end['command']['pts_time']
    actual_duration = cue_end_time - cue_start_time
    # time_diff = actual_duration - break_duration
    if b_d_min - tolerance < actual_duration < b_d_max + tolerance:
        return [False, actual_duration]
    else:
        return [True, actual_duration]


def verifyconfiguration(config):
    '''
    Tool use to verify the format of the config file.
    It can also be possible to return the key of the breaks found in the config.
    '''
    isValid = True
    if "recipient_emails" not in config:
        isValid = False
    if "frequency" not in config:
        isValid = False
    if "network_id" not in config:
        isValid = False


    # ---------------------------------------------------
    # Get the configuration templates
    break_template = config.get("local_break")
    content_template = config.get("content_id")
    placement_template = config.get("placement_opportunity")
    program_template = config.get("program")
    provider_template = config.get("provider_ad")

    # verify that at least one template is available
    if break_template is None and content_template is None and placement_template is None and program_template is None and provider_template is None:
        isValid = False
    
    # break_exist = False
    # for config_key in config.keys():
    #     if str(config_key).find("break") != -1:
    #         break_exist = True

    # if break_exist == False:
    #     isValid = False

    return isValid


def verifytriggers(body_log, config):
    '''
    Main verification function for the triggers

    Only follows the current config json template
    '''
    # Get all the lines that start with a number (this logic guarantees trigger starts in timestamp)
    triggers = []
    for item in body_log:
        if item[0].isnumeric():
            splitted = item.split(":")
            if len(splitted) == 3:
                newInputTrigger = str(splitted[0]) + " " + "IN:" + splitted[1].split('_POISID_')[0] + ":" + splitted[1].split('_POISID_')[1] + ":" +splitted[2] + ":PTS-"
                newOutputTrigger = str(splitted[0]) + " " + "OUT:" + splitted[1].split('_POISID_')[0] + ":" + splitted[1].split('_POISID_')[1] + ":" +splitted[2] + ":PADDED"
                triggers.append(newInputTrigger)
                triggers.append(newOutputTrigger)
            else:
                triggers.append(item)

    # pair all the triggers if applicable [ { timestamp, input_trigger, output_trigger }, ... ]
    pairs = pair_up(triggers)

    # for target_list in expression_list:
    #     pass

    '''
    Local_break only
    '''
    # Check if the template break start and end exist
    break_template = config.get("local_break")
    break_start_exist = False
    break_start_key = ""

    break_end_exist = False
    break_end_key = ""

    for break_template_key in break_template.keys():
        if str(break_template_key).find("break_start") != -1:
            break_start_exist = True
            break_start_key = break_template_key
        if str(break_template_key).find("break_end") != -1:
            break_end_exist = True
            break_end_key = break_template_key

    if break_start_exist:  # Make sure template has at least break start to continue
        action_issues = []
        template_issues = []
        timing_issues = []
        
        # Look for applicable break start triggers
        break_start_pairs = []
        break_start_template = break_template[break_start_key]

        # Look for applicable break end triggers
        break_end_pairs = []
        break_end_template = {}
        if break_end_exist:
            break_end_template = break_template[break_end_key]

        for pair in pairs:
            action = pair["output_trigger"].split(":")[4]
            cue = threefive.decode(
                pair["input_trigger"].split(":")[3]).get()

            # The following logic compares the command type to be the same. But the logic is made for splice inserts.
            if cue["info_section"]["splice_command_type"] == break_start_template["splice_command_type"]:
                if compare(cue, break_start_template["input_trigger"]):
                    # Verify action is the same as template
                    if break_start_template["action"] != action:
                        action_issues.append(pair)
                    # Since comparison returns true this cue is break start
                    break_start_pairs.append(pair)

                elif break_end_exist:
                    if compare(cue, break_end_template["input_trigger"]):
                        # Verify action is the same as template
                        if break_end_template["action"] != action:
                            action_issues.append(pair)
                        # Since comparison returns true this cue is break end
                        break_end_pairs.append(pair)
                    else:
                        # No matching template
                        template_issues.append(pair)

                else:
                    # No matching template then verify explicit DELETE action
                    if action != "DELETE":
                        action_issues.append(pair)

            else:
                # If the command type is not same as template then verify explicit DELETE action
                if action != "DELETE":
                    action_issues.append(pair)

        # sort the list of paired trigguers in ascending fashion by timestamp (earliest to latest)
        break_start_pairs.sort(key=sort_by_timestamp)
        break_end_pairs.sort(key=sort_by_timestamp)
        if len(break_start_pairs) == len(break_end_pairs):
            for i in range(len(break_start_pairs)):
                start_cue = threefive.decode(
                    break_start_pairs[i]["input_trigger"].split(":")[3]).get()
                end_cue = threefive.decode(
                    break_end_pairs[i]["input_trigger"].split(":")[3]).get()
                result = timing_deviation(
                    start_cue, end_cue, break_template["break_duration_deviation_tolerance"], break_template["local_break_start"]["input_trigger"]["break_duration_max"], break_template["local_break_start"]["input_trigger"]["break_duration_min"])
                if result[0]:
                    # Check time deviation between Duration in Splice insert
                    # start trigger and time separation(PTS TIme) between splice insert start and end trigger
                    timing_issues.append(
                        {"break_start_trigger": break_start_pairs[i], "break_end_trigger": break_end_pairs[i], "cue_start": start_cue, "cue_end": end_cue, "actual_time": result[1]})

        return [template_issues, action_issues, timing_issues]
    else:
        return list()
