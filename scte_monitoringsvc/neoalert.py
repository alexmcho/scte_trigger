import smtplib
import datetime
import json
from email.message import EmailMessage

def alert_issues(error_list, uuid, get_command, config):
    ENV_FILE = "./env.json"
    env = json.loads(open(ENV_FILE, "r").read())
    if len(error_list) > 0:
        msg = EmailMessage()
        msg['Subject'] = "SCTE issues " + str(datetime.date.today())
        msg['From'] = env["sender_email"]
        msg['To'] = config["recipient_emails"]
        body = str()
        body += "<!DOCTYPE html><html><body>"
        body += "UUID : " + uuid + "</li><br><hr><br>"
        if len(error_list) != 0:
            body += "<h2>Error List:</h2>"
            body += "<ol>"
            for i in error_list:
                body += i + "</li><br><hr><br>"
            body += get_command +"</li><br><hr><br>"
            body += "</ol>"
        if body == "":
            body += "<h1>No issues during log verification.</h1>"

        body += "</body></html>"

        msg.set_content(body)

        msg.add_alternative(body, subtype='html')

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            # IMPORTANT load email and password
            smtp.login(env["sender_email"], env["password"])
            smtp.send_message(msg)
            smtp.close()
