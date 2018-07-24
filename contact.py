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

@app.route('/<dir>/<filename>')
def resources(dir, filename):
    return send_from_directory(dir, filename)

@app.route('/', methods=['GET', 'POST'])
def get_contact():
    if request.method == 'GET':
        return send_file('index.html')
    if request.method == 'POST':

        sg = sendgrid.SendGridAPIClient(apikey="")
        json = request.get_json(force=True)
        to_email = Email("brandon@winchestercomputers.com")
        from_email = Email(json['email'])
        subject = "New website inquiry"
        content = Content("text/plain", "From: {} \n \n Message: {} \n \n Email: {} ".format(json['name'], json['query'], json['email'])) 

        mail = Mail(from_email, subject, to_email, content)
        response = sg.client.mail.send.post(request_body=mail.get())
        return 'Test'