import speech_recognition as sr
from playsound import playsound as play
from gtts import gTTS


def speak(text):
    """
    This function speaks out the text passed
    :param
        text --> str
    :return
        None
    """
    tts = gTTS(text)
    file = './audio/tts.mp3'
    tts.save(file)
    play(file)


def get_command():
    """
    This function listens command and returns text command
    :param
        None
    :return
        None
    """
    r = sr.Recognizer()
    with sr.Microphone() as source:
        r.pause_threshold = 1
        r.adjust_for_ambient_noise(source, duration=1)
        play('./audio/chime.wav')
        audio = r.listen(source)
        play('./audio/chime.wav')
    try:
        command = r.recognize_google(audio).lower()
    except sr.UnknownValueError:
        command = 'ERROR'
        play('./audio/error.mp3')
    return command
    

def log(cmd, res):
    """
    This function keeps track of all user commands and responses by mirror,
    saves them in a text file.
    :param
        cmd --> str (command)
        res --> str (response)
    :return
        None
    """
    with open('log.txt', 'a') as file:
        file.write('User: {}\n'.format(cmd))
        file.write('Mirror: {}\n'.format(res))
        file.write('-'*40 + '\n')
