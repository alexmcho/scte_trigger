import threading
import pymongo
import translator

def threadtest():

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
    
    #for nodes in x.find({"_id": 236}):
        #pass

    for networks in x.distinct("network_id"):
        t = threading.Thread(target=translator.network_translate())