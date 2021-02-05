import threefive

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

# "./logs/Cooking-Esam_transform.log"
# "./logs/MTV-Last4hours.log"
LOG_FILE = "./logs/MTV-Last4hours.log"

body_log = open(LOG_FILE, "r").read().strip().splitlines()

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

print(pairs)
# for trigger in triggers:
#     open("./logs/MTV-triggers.log", "a").write(str(trigger) + "\n")


stcebase64 = "/DA1AAAAAAAAAP/wFAUAAAABf+/+i/UBJX4AUkKY//8AAAAOAQxDVUVJUN8xMjMqMTEAAJHgAZA="

threefive.Cue(stcebase64).show()