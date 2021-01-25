import smtplib
import datetime
import json
from email.message import EmailMessage

#IMPORTANT: gmail has built in feature that blocks emails written with smtp, 
# enable "Less secure app access" for sender email that use gmail


def alert_issues(template_issues, action_issues, timing_issues, config, env):
    '''
    Alert using smtp ssl
    '''

    if len(template_issues) > 0 or len(action_issues) > 0 or len(timing_issues) > 0:
        msg = EmailMessage()
        msg['Subject'] = "SCTE issues " + str(datetime.date.today())
        msg['From'] = env["sender_email"]
        msg['To'] = config["recipient_emails"]

        body = str()
        body += "<!DOCTYPE html><html><body>"
        
        if len(template_issues) != 0:
            body += "<h2>Template Issues:</h2>"
            body += "<p>The following pair of trigguers do not comply with the configuration template.</p>"
            body += "<ol>"
            for target_list in template_issues:
                body += "<li>" + "<p><b>Timestamp:</b></p>" + "&#8195;" + str(target_list["timestamp"]) + "<br>" + "<p><b>Input Trigger:</b></p>" + "&#8195;" + str(target_list["input_trigger"]) + "<br>" + "<p><b>Input Trigger:</b></p>" + "&#8195;" + str(target_list["output_trigger"]) + "</li><br><hr><br>"
            body += "</ol>"
        
        if len(action_issues) != 0:
            body += "<h2>Action Issues:</h2>"
            body += "<p>The following pair of trigguers actions do not comply with the configuration predetermined action.</p>"
            body += "<ol>"
            for target_list in action_issues:
                body += "<li>" + "<p><b>Timestamp:</b></p>" + "&#8195;" + str(target_list["timestamp"]) + "<p><b>Action:</b></p>" + "&#8195;" + str(target_list["output_trigger"].split(":")[4]) + "<br>" + "<p><b>Input Trigger:</b></p>" + "&#8195;" + str(target_list["input_trigger"]) + "<br>" + "<p><b>Output Trigger:</b></p>" + "&#8195;" + str(target_list["output_trigger"]) + "</li><br><hr><br>"
            body += "</ol>"

        if len(timing_issues) != 0:
            body += "<h2>Timing Issues:</h2>"
            body += "<p>The following pair of trigguers deviate from the timing tolerance.</p>"
            body += "<ol>"
            for target_list in timing_issues:
                body += "<li>" + "<p><b>Break Start:</b></p>" + "&#8195;" + str(target_list["break_start_trigger"]["input_trigger"]) + "<br>" + "&#8195;" + str(target_list["break_start_trigger"]["output_trigger"]) + "<br>" + "<p><b>Break End:</b></p>" + "&#8195;" + str(target_list["break_end_trigger"]["input_trigger"]) + "<br>" +  "&#8195;" + str(target_list["break_end_trigger"]["output_trigger"]) + "</li><br><hr><br>" 
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
