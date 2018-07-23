from flask import Flask, send_file, send_from_directory
from flask import request
from flask import send_from_directory
from flask_cors import CORS
import sendgrid
import os
from sendgrid.helpers.mail import *

app = Flask(__name__)
CORS(app)


@app.route('/<filename>')
def main(filename):
    return send_file(filename)

@app.route('/resources/<filename>')
def resources(filename):
    return send_from_directory('resources', filename)

@app.route('/', methods=['GET', 'POST'])
def get_contact():
    if request.method == 'GET':
        return app.send_static_file('index.html')
    if request.method == 'POST':
        print("Hello, world!")
        sg = sendgrid.SendGridAPIClient(apikey="")
        json = request.get_json(force=True)
        to_email = Email("brandon@winchestercomputers.com")
        from_email = Email(json['email'])
        subject = "New website inquiry"
        print("From: {} \n \n Message: {} \n \n Email: {} ".format(json['name'], json['query'], json['email']))
        content = Content("text/plain", "From: {} \n \n Message: {} \n \n Email: {} ".format(json['name'], json['query'], json['email'])) 

        print(from_email)
        print(subject)
        print(content)
        print(to_email)

        mail = Mail(from_email, subject, to_email, content)
        print(mail.get())
        #response = sg.client.mail.send.post(request_body=mail.get())
        
        print(response.status_code)
        print(response.body)
        print(response.headers)
        
        return 'Test'