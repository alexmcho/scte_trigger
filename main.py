import uvicorn
from typing import Optional
from fastapi import status, Body, Form, FastAPI
from fastapi.requests import Request
from fastapi.responses import PlainTextResponse, Response
from fastapi.middleware.cors import CORSMiddleware
import json
import triggervalidator
import triggeralert
import threading
import time
import logging
import sys
import pymongo
from flask import jsonify
from flask import request
from bson.json_util import dumps






# Program Constants
ENV_FILE = "./env.json"
CONFIG_FILE = "./config.json"

'''
    SCTE Monitor Service
'''
# Trigger retrieval daemon


def trigger_monitor_daemon(env_file, config_file):
    '''
    Function that runs on interval and calls the validator tool over a file
    '''
    while True:
        config = json.loads(open(config_file, "r").read())
        if triggervalidator.verifyconfiguration(config):
            print("Running verification ...")

            # Call trigger verification tool
            # [template_issues, action_issues, timing_issues]
            env = json.loads(open(env_file, "r").read())
            file_path = env["path_to_logs"] + \
                "/Cooking-Esam_transform.log"  # Hardcoded file
            log = open(file_path, 'r').read().strip().splitlines()
            result = triggervalidator.verifytriggers(log, config)
            print("ISSUES =" , result)
            # Alert via email
            triggeralert.alert_issues(
            result[0], result[1], result[2], config, env)

            # Set interval
            # config frequency is in minutes, convert to seconds
            seconds = config["frequency"] * 60
            print("Thread will pause", seconds, "seconds")
            time.sleep(seconds)
        else:
            print("Configuration file is invalid, please verify the config.json is valid.")
            time.sleep(120) # Sleep for 2 minutes before re-trying

# Configure the thread
monitor_svc = threading.Thread(
    target=trigger_monitor_daemon, daemon=True, args=(ENV_FILE, CONFIG_FILE))

# Start the thread
monitor_svc.start()


''' SCTE Monitor Service END '''


'''
    HTTP Back-End Server
'''

# Application object
app = FastAPI()

# Set cors policy to accept all from localhost
origins = [
    "*",
]
# Set CORS headers to accept all
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

'''
    Method GET
'''


@app.get("/")
def read_root():
    return str("SCTE Monitoring Service")


@app.get("/config")
def read_configuration():
    return json.loads(open(CONFIG_FILE, "r").read())
    
'''
Connection to database req. 'username:password' when running program
'''

inputs = sys.argv
splitter = inputs[1].split(":")
username = splitter[0]
password = splitter[1]
connection = "mongodb+srv://"+ username + ":" + password + "@scte.cfbun.mongodb.net/Configurations?retryWrites=true&w=majority"

client = pymongo.MongoClient(connection)
db = client.test
print(db)
col = client["Configurations"]
x = col["Configs"]

result = x.find_one()

'''
Proof of connection this will show database
'''

@app.get("/database")
def show_connection_test():
    return result



@app.get("/get/{network}")
async def read_user_item(network: str):
    networks = []
    string = str(network)
    for nodes in x.find({"network_id": string}):
        networks.append(nodes)
    return networks


@app.get("/networks")
def networks():
    dict = []
    count = 0
    final_network_list= []
    for nodes in x.find({},{ "network_id" }):
        dict.append(str(nodes))

    for strings in dict:
        if "network_id" in strings:
            final_network_list.append(strings.split("'network_id'")[1].split("'")[1])
    if len(final_network_list) == 0:
        return "list empty"
    return final_network_list
    
    
@app.get("/idCounter")
def networks():
    for t in x.find({"_id":0}):
        counter = str(t)
    counter = int(counter.split(":")[2].split("}")[0])
    return counter
    
'''
    Method POST
'''

    

@app.post("/addConfig", status_code=status.HTTP_200_OK)
def write_configuration(body=Body(..., media_type="application/json")):
    try:
        x.insert_one(body)
        return "Data has been successfully inserted"
    except:
        return "Please Make sure that the data providied is valid and follows configs rules"
    

@app.post("/config", status_code=status.HTTP_200_OK)
def write_configuration(body=Body(..., media_type="application/json")):
    if triggervalidator.verifyconfiguration(body):
        open(CONFIG_FILE, "w").write(json.dumps(body))
        return json.loads(open(CONFIG_FILE, "r").read())
    else:
        # Send error status code when config is not valid
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {"error": "Config file is invalid or corrupted"}


@app.post("/monitortriggers", response_class=PlainTextResponse, status_code=status.HTTP_200_OK)
def verify_triggers(response: Response, body: str = Body(..., media_type="text/plain")):
    # Strip log form any trailing whitespaces then split on end of lines
    body_log = str(body).strip().splitlines()
    # Load the configuration and env info
    config = json.loads(open(CONFIG_FILE, "r").read())
    env = json.loads(open(ENV_FILE, "r").read())
#    Verify if configuration is valid then proceed
    if triggervalidator.verifyconfiguration(config):
        # Call trigger verification tool
        # [template_issues, action_issues, timing_issues]
        result = triggervalidator.verifytriggers(body_log, config)

        # Alert via email
        triggeralert.alert_issues(
            result[0], result[1], result[2], config, env)

        return str(result)
    else:
        # Send error status code when config is not valid
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {"error": "Config file is invalid or corrupted"}


'''
    Method PUT
'''

@app.put("/update/{network}", status_code=status.HTTP_200_OK)
async def update_configuration(network: str, body=Body(..., media_type="application/json")):
    try:
        string = str(network)
        query = {'network_id': string}
        newvalues = {"$set": body}
        x.update_one(query,  newvalues)
        
        return "Data has been successfully inserted"
    except Exception as ex:
        return str(ex)


@app.put("/updateCounterId", status_code=status.HTTP_200_OK)
def update_configuration():
    try:
        counter = ""
        for t in x.find({"_id":0}):
            counter = str(t)
        counter = int(counter.split(":")[2].split("}")[0])

        query = {'_id': 0}
        newCount = {"$set":{ "COUNTER_ID": counter+1}}
        
        x.update_one(query,  newCount)
        
        return "Data has been successfully inserted"
    except Exception as ex:
        return str(ex)
'''
    Method DELETE
'''

@app.delete("/remove/{network}")
async def read_user_item(network: str):
    try:
        string = str(network)
        query = {"network_id": string}
        x.delete_one(query)
        return "Data has been successfully removed"
    except:
        return "Please Make sure that the data providied is valid and follows configs rules"
   

'''
    App Run
'''
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
