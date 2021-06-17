from bson.objectid import ObjectId
import threefive
from threefive import Cue
import json
import pymongo
import neovalidator

def getfrommongo():
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

    
    for j in z.find({"network_id" : "MSNBC-4000"}):
        pass

    for nodes in x.find({"_id" :ObjectId('60b80a323b77502dce74aae1')}, {"0"}):
        pass

    #for j in z.distinct({"network_id"}):
        #for nodes in x.find({"network_id": j}):
            #pass
    
    log_line = nodes[list(nodes.keys())[1]]
    splitter = log_line.split(":")
    log_msg = splitter[3]
    decode = Cue(log_msg)
    test(decode)
    neovalidator.logverify(log_line, j)
    
    
def test(decode):
    print(decode)
