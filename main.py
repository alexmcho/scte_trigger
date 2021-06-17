import uvicorn
from typing import Optional
from fastapi import status, Body, Form, FastAPI
from fastapi.requests import Request
from fastapi.responses import PlainTextResponse, Response
from fastapi.middleware.cors import CORSMiddleware
import json
import triggervalidator
import triggeralert
import neovalidator
import neoalert
import threading
import time
import translator
import logging
import sys
import pymongo
from flask import jsonify
from flask import request
from bson.json_util import dumps
import requests
import threading



# Program Constants
ENV_FILE = "./env.json"
CONFIG_FILE = "./config.json"

'''
    SCTE Monitor Service
'''
'''
Connection to database req. 'username:password' when running program
'''

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
x = col["BackendConfigs"]

result = x.find_one()
# Trigger retrieval daemon


def trigger_monitor_daemon(env_file, config_file):
    '''
    Function that runs on interval and calls the validator tool over a file
    '''
    #for nodes in x.find({"_id":1}):

    #t = threading.Thread(target=neovalidator.logverify(body_log, config), args=(10,))

    #t.start()

    #t.join()

    while True:
        translator.network_translate()
        f = open("./logs/only-insert.log", "r")
        for nodes in x.find({"_id": 1}):
            pass
        body_log = str(f.read()).strip().splitlines()
        #config = json.loads(open(config_file, "r").read())
        config = nodes
        env = json.loads(open(ENV_FILE, "r").read())
        if triggervalidator.verifyconfiguration(config):
            print("Running verification ...")

            # Call trigger verification tool
            for item in body_log:
                for itex in reversed(body_log):
                    neovalidator.devi_func(itex, config)
                result = neovalidator.logverify(item, config)
                neoalert.alert_issues(result[0], str(result[1]), str(result[2]), config)
            neovalidator.action_dict_clear()
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
Proof of connection this will show database
'''

@app.get("/database")
def show_connection_test():
    return result



# @app.get("/get/{network}")
# async def read_user_item(network: str):
#     String = str(dumps(x.find({"network_id": network})))
    
#     fix1 = String[1:]
#     fix2 = fix1[:-2]
    
#     return dumps(fix2)

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
    # Verify if configuration is valid then proceed
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


@app.post("/verifylogs", response_class=PlainTextResponse, status_code=status.HTTP_200_OK)
def verifylogs(response: Response, body: str = Body(..., media_type="text/plain")):
    f = open("./logs/"+body, "r")
    #f = reversed(f)
    #f = open("./logs/test1.log", "r")
    #for now the log file itself is hardcoded, but can be easily automated once, 
    #other splice command types has been implemented

    r = requests.get('http://127.0.0.1:8000/networks')
    string = ""

    # for i in r:
    #     print(type(i))
    #     string= str(i)
    # print(string)
    # index = str(string)
    # list_i = index.split(",")
    for nodes in x.find({"_id": 1}):
        #print(nodes)
        pass
    
    body_log = str(f.read()).strip().splitlines()
    #below is an one of the ways to reverse read
    #body_log = body_log[::-1]
    #config = json.loads(open(CONFIG_FILE, "r").read())
    config = nodes
    env = json.loads(open(ENV_FILE, "r").read())
    #config loop required
    if triggervalidator.verifyconfiguration(config):
        #for item in reversed(body_log):
        for item in body_log:
            #print(item)
            #please read the comments above devi_func in neovalidator
            #on why there is an nested for-loop reading in reverse
            for itex in reversed(body_log):
                neovalidator.devi_func(itex, config)
            result = neovalidator.logverify(item, config)
            print(result)
        # triggeralert.alert_issues(
        #     result[0], result[1], result[2], config, env)
            neoalert.alert_issues(result[0], str(result[1]), str(result[2]), config)
        #print("action dict outside loop before clear : " + str(neovalidator.action_dict))
        neovalidator.action_dict_clear()
        print("action dict outside loop after clear : " + str(neovalidator.action_dict))
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
