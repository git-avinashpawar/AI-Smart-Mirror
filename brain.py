import wolframalpha
import wikipedia
import smtplib
import requests
import json
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from database import get_contact
from playsound import playsound as play
from utils import get_command
from twilio.rest import Client, TwilioException


name = 'Vishwajeet'
account_sid = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'	# twilio Account SID 
auth_token = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'	# twilio Auth Token
client = Client(account_sid, auth_token)


def get_ans(ask):
    """
    Forwards the user command to Walframalpha and Wikipedia
    :param
        ask --> str (command)
    :return:
        answer --> str
    """
    try:
        app_id = 'XXXXXX-XXXXXXXXX'	# wolframalpha app id
        client = wolframalpha.Client(app_id)

        res = client.query(ask)
        ans = next(res.results).text
        if ans:
            return ans
        return "Sorry, I haven't found anything"
    except:
        try:
            return wikipedia.summary(ask, sentences=1)
        except wikipedia.WikipediaException:
            return "Sorry, I haven't found anything"


def send_email(email, message):
    """
    Send email using SMTP via GMAIL
    :param
        email --> str (reciver email)
        message --> str
    :return:
        flag --> int
    """
    msg = MIMEMultipart()
    password = "XXXXXXXXXXXXXXX"	# mail-id password 
    msg['From'] = 'smartmirror.dot@gmail.com'	# mail-id
    msg['To'] = email
    msg['Subject'] = 'Vishwajeet via Smart Mirror'

    msg.attach(MIMEText(message, 'plain'))

    try:
        mail = smtplib.SMTP('smtp.gmail.com', 587)
        mail.ehlo()
        mail.starttls()
        mail.login(msg['From'], password)
        mail.sendmail(msg['From'], msg['To'], msg.as_string())
        mail.close()
        return 1
    except smtplib.SMTPException:
        return 0
    

def send_message(phone, msg):
    """
    Send WhatsApp message via Twilio 
    :param
        phone --> str (reciver phone)
        msg --> str
    :return:
        flag --> int
    """
    try:
        message = client.messages.create(
            body=msg,
            from_='whatsapp:+14155238886',
            to='whatsapp:+91'+phone
        )
        return 1
    except TwilioException:
        return 0
    
    
def get_response(cmd):
    """
    Process the user command and returns response.
    :param
        cmd --> str (command)
    :return:
        response --> str
    """
    global name
    if 'what' in cmd and 'name' in cmd:
        if 'my' in cmd:
            return 'Your name is ' + name
        else:
            return "Hi, I'm Smart Mirror."
    elif 'my name is' in cmd:
        name = cmd.split()[-1]
        return "Okay {}, I'll remember your name.".format(name)
    elif cmd in ['who created you', 'who is your family', 'who is your father', 'who is your mother']:
        return 'Vishwajeet and his team.'
    elif 'how are you' in cmd:
        return "I'm doing well, thank you!"
    elif 'joke' in cmd:
        try:
            res = requests.get('https://icanhazdadjoke.com/', headers={"Accept": "application/json"})
            if res.status_code == requests.codes.ok:
                return str(res.json()['joke'])
            else:
                return 'Oops! I ran out of jokes'
        except requests.RequestException:
            return 'ERROR'
    elif 'send' in cmd:
        contact = get_contact(cmd.split()[-1])
        if contact:
            play('./audio/msg.mp3')
            msg = get_command()
            if msg != 'ERROR':
                if 'email' in cmd:
                    res = send_email(contact['email'], msg)
                    if res:
                        return 'Email sent: '+msg
                elif 'message' in cmd:
                    res = send_message(contact['phone'], msg)
                    if res:
                        return 'Message sent: '+msg
            return 'ERROR'
        return 'Contact not saved!'
    else:
        return get_ans(cmd)

