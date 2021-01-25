# SCTE Trigger Real Time Monitoring, Validation and Alerting - main package
# Zachary Thomas
# Last edited 10/12/2020

# Importing datetime package for handling datetime objects and json package to handle json import of config.json
from datetime import datetime
# Importing json package for handling of config.json
import json
# Importing threefive from https://github.com/futzu/SCTE35-threefive to handle SCTE-35 encoding/decoding
import threefive
# Importing the compare_template script for comparing an insertion to the template defined by config.json
import compliance
# Importing Simple Mail Transfer Protocol Library for sending email notifications of deviation
import smtplib

# Change log_name to change what log is being checked for template compliance
log_name = "./Cooking-Esam_transform.log"

config = json.loads(open("./config.json", "r").read())
print("What is the password for {}?".format(config["sender_email"]))
# email_password = input()

log = open(log_name, 'r').read().strip().splitlines()  # Opening log_name and storing each line as string in [string]

log_pairs = {}
found_id = []
for i in range(0, len(log)):
    id = log[i].split(":")[2]
    if id not in found_id:
        for j in range(i+1, len(log)):
            if log[j].split(":")[2] == id:
                if log[i].split(" ")[1].split(":")[0] == "IN" and log[j].split(" ")[1].split(":")[0] == "OUT":
                    log_pairs[len(log_pairs)] = [log[i], log[j]]
                    found_id.append(id)
                    break
                elif log[j].split(" ")[1].split(":")[0] == "IN" and log[i].split(" ")[1].split(":")[0] == "OUT":
                    log_pairs[len(log_pairs)] = [log[j], log[i]]
                    found_id.append(id)
                    break
        if id not in found_id:
            print('warning: data at line {} missing pair'.format(i+1))

print(log_pairs)

splice_pairs = {}
template_issues = []
timing_success = []
timing_issues = []
times = []
for i in range(len(log_pairs) - 1, -1, -1):
    trigger1 = log_pairs[i][0]
    timestamp = datetime.strptime(trigger1.split(" ")[0], "%Y%m%d%H%M%S")
    data = trigger1.split(" ")[1].split(":")
    cue1 = threefive.decode(data[3]).get()
    if cue1["info_section"]["splice_command_type"] == 5:
        if cue1["command"]["out_of_network_indicator"]:
            if not compliance.compare(cue1, config['Cooking_Local_Template']['local_break_start']):
                template_issues.append(log_pairs[i])
        else:
            if not compliance.compare(cue1, config['Cooking_Local_Template']['local_break_end']):
                template_issues.append(log_pairs[i])

    if cue1["info_section"]["splice_command_type"] == 5:
        if cue1["command"]["out_of_network_indicator"]:
            for j in range(i-1, -1, -1):
                trigger2 = log_pairs[j][0].split(" ")[1].split(":")
                cue2 = threefive.decode(trigger2[3]).get()
                if cue2["info_section"]["splice_command_type"] == 5:
                    if not cue2["command"]["out_of_network_indicator"]:
                        times.append(compliance.timing(cue1, cue2)[1])
                        if not compliance.timing(cue1, cue2)[0]:
                            timing_issues.append([log_pairs[i], log_pairs[j]])
                        else:
                            timing_success.append([log_pairs[i], log_pairs[j]])
                    break

print(template_issues)
print(len(timing_issues)/(len(timing_issues)+len(timing_success)))
times.sort(reverse=True)
print(times)
sender_email = config["sender_email"]

sent_from = sender_email
to = config["recipient_emails"]
subject = "SCTE Trigger Report"
email_text = "templating issues: " + str(template_issues) + "\n" + "timing issues: " + str(timing_issues)
# try:
#     server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
#     server.ehlo()
#     server.login(sender_email, email_password)
#     server.sendmail(sent_from, to, )
#     server.close()
#     print("Email sent")
# except Exception as e:
#     print(e)
