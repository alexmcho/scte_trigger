# SCTE Trigger Real Time Monitoring, Validation and Alerting - compare_template package
# Zachary Thomas
# Last edited 10/12/2020

# Import for email notifications
import smtplib
# Import josn for reading of config.json file
import json

# This function takes an insertion (as a dict) and a template (as a dict) as parameters
# it will return False if the insertion does not match the defined template and True if all conditions are met
# *note* the insertion may have other key:values that are not defined in the template without failing the comparison
# any normal comparable value (e.g. "Splice Insert", 60) is an acceptable restriction for the value in a template
# Special circumstances include: "isnumeric" will check to make sure the insertion value is a valid number
#   a 2 number array e.g. [30, 120] that define a range of valid values (inclusive)
def compare(insert, template):
    for template_key in template.keys():  # For every key:value pair defined in the template
        target = template[template_key]
        # if the template value is "isnumeric" then just check if the insert value is a number but not the value
        if target == "isnumeric":
            try:
                float(insert["command"][template_key])
            except ValueError:
                print("must use a numeric value for {}".format(template_key))
                return False
            except KeyError:
                print("{} does not exist in insertion commands".format(template_key))
                return False
        # if the template value is a list then check if the insert value is within the range
        elif type(target) is list:
            try:
                if insert['command'][template_key] < target[0] or insert['command'][template_key] > target[1]:
                    return False
            except:
                return False
        # otherwise check if the template value and insert value are the same
        else:
            try:
                # attempt to round any numbers
                insert['command'][template_key] = round(insert['command'][template_key])
            except:
                pass
            finally:
                try:
                    if insert["command"][template_key] != target:
                        return False
                except KeyError:
                    print("{} does not exist in insertion commands".format(template_key))
                    return False
    # if all insert values match the template then return True
    return True


def timing(cue_out, cue_in):
    break_duration = cue_out['command']['break_duration']
    cue_out_time = cue_out['command']['pts_time']
    cue_in_time = cue_in['command']['pts_time']
    actual_duration = cue_in_time - cue_out_time
    time_diff = actual_duration - break_duration
    if -0.1 <= time_diff <= 0.1:
        return True, time_diff
    else:
        return False, time_diff

