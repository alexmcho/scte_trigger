import threading
import queue
import concurrent.futures
import pymongo
import translator
import neovalidator2
import neoalert

def controller():
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


    for network in z.distinct("network_id"):
        print(network)
        for j in z.find({"network_id": network}):
            pass
        print(j)
        for message in x.find({"NetworkId": network}):
            print(message)
            q = queue.Queue()
            t = threading.Thread(target=neovalidator2.getfrommongo(), args=(network,j,message,q)).start()
            t.join() 
            print("t end")
            result = q.get()
            neoalert.alert_issues(result[0], str(result[1]), str(result[2]), j)
