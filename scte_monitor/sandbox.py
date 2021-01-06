from datetime import datetime
import threefive
import json

log = open("./Cooking-Esam_transform.log", "r").read()
line = log.splitlines()[14]
timestamp = datetime.strptime(line.split(" ")[0], "%Y%m%d%H%M%S")
data = line.split(" ")[1].split(":")
direction = data[0]
user_id = data[1]
trigger_id = data[2]
insertion_encoded = data[3]
action = data[4]
print(timestamp)
print(data)
print(direction)
print(user_id)
print(trigger_id)
print(insertion_encoded)
print(action)
print()

insertion = threefive.decode(insertion_encoded)

# print(insertion)

# config = json.loads(open("./config.json", "r").read())

# timing_issues = ["hello"]
# timing_issues.append("world")
# # timing_issues = timing_issues.append("world")
# print(timing_issues)

# import smtplib
# from email.mime.text import MIMEText

# sender_email = config["sender_email"]
# password = "testaccount"
#
# sent_from = sender_email
# to = config["recipient_emails"]
# subject = "I hope this works"
# email_text = "Thank you very little."
# print(sender_email)
# print(password)
# try:
#     server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
#     server.ehlo()
#     server.login(sender_email, password)
#     server.sendmail(sent_from, to, email_text)
#     server.close()
# except Exception as e:
#     print(e)


# print('info_section' in insertion.keys())

# keys = {}
# no_discriptors = 0
# for line in open('Cooking-Esam_transform.log', 'r').read().splitlines():
#     line_dict = threefive.decode(line.split(" ")[1].split(":")[3]).get()
#     for k in ['info_section', 'command']:
#         for key in line_dict[k].keys():
#             if key in keys.keys():
#                 keys[key] = keys[key] + 1
#             else:
#                 keys[key] = 1
#     try:
#         for key in line_dict['descriptors'][0].keys():
#             if key in keys.keys():
#                 keys[key] = keys[key] + 1
#             else:
#                 keys[key] = 1
#     except:
#         no_discriptors += 1
#
# print(keys)
# print(no_discriptors)

# descriptions = {}
# for line in log.splitlines():
#     timestamp = datetime.strptime(line.split(" ")[0], "%Y%m%d%H%M%S")
#     data = line.split(" ")[1].split(":")
#     insertion_encoded = data[3]
#     insertion = threefive.decode(insertion_encoded).get()
#     descriptions[len(descriptions)] = insertion["command"]["name"]
#
# print(descriptions)

examples = open("./trigger_examples.txt", "r").read().split("***")

# provider_ad
# print(examples[5].split("\n")[1])
# provider_ad_long = examples[4].split("\n")[2]
# provider_ad_enc = provider_ad_long.split()[0].split(":")[2]
# provider_ad = threefive.decode(provider_ad_enc)
# print(provider_ad)

# placement_opportunity_end
# print(examples[4].split("\n")[1])
# placement_opportunity_end_long = examples[4].split("\n")[2]
# placement_opportunity_end_enc = placement_opportunity_end_long.split()[0].split(":")[2]
# placement_opportunity_end = threefive.decode(placement_opportunity_end_enc)
# print(placement_opportunity_end)

# placement_opportunity_start
# print(examples[3].split("\n")[1])
# placement_opportunity_start_long = examples[3].split("\n")[2]
# placement_opportunity_start_enc = placement_opportunity_start_long.split()[0].split(":")[2]
# placement_opportunity_start = threefive.decode(placement_opportunity_start_enc)
# print(placement_opportunity_start)

# program start
# program_start_long = examples[1].split("\n")[2]
# program_start_enc = program_start_long.split()[0].split(":")[2]
# program_start = threefive.decode(program_start_enc)
# print(program_start)

# content id
# content_id_trigger_enc = examples.split()[2].split(":")[2]
# content_id_trigger = dict(threefive.decode(content_id_trigger_enc))
# print(content_id_trigger)
