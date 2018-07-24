from flask import Flask, send_file, send_from_directory
from flask import request, Response, jsonify
from flask import send_from_directory
from flask_cors import CORS
import sendgrid
import os
import requests
from sendgrid.helpers.mail import *

app = Flask(__name__)
CORS(app)

@app.route('/')
def main():
    return send_file('index.html')

@app.route('/<filename>')
def files(filename):
    try:
        return send_file(filename)
    except:
        return "404"

@app.route('/<dir>/<filename>')
def resources(dir, filename):
    return send_from_directory(dir, filename)

@app.route('/contact', methods=['GET', 'POST'])
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
        r = requests.post("https://www.google.com/recaptcha/api/siteverify", {'secret':'6LeYF2YUAAAAACW7GB7HFWtePH1y0jflf5nIXRS2', 'response':json['g-recaptcha-response']})
        res = r.json()
        print(r.text, res, res['success'])

        if res["success"] == True or res["success"] == "True":
            mail = Mail(from_email, subject, to_email, content)
            sg.client.mail.send.post(request_body=mail.get())
            return jsonify(valid="true")
        else:
            return jsonify(valid="false")
        
        
