import eel
import Snowboy.snowboydecoder as snowboydecoder
from threading import Thread
from time import sleep
from reminders import start_schedule
from utils import *
from brain import get_response


eel.init('web')
detector = snowboydecoder.HotwordDetector("smart mirror.pmdl", sensitivity=0.5, audio_gain=1)


@eel.expose
def assistant_routine():
    """
    Triggered when hotward detected.
    Driver routine for assistant.
    :return:
        None
    """
    eel.updateAssistant(0)
    cmd = get_command()
    ans = get_response(cmd)
    log(cmd, ans)
    if ans == 'ERROR':
        eel.updateAssistant(1, 'Sorry, something went wrong!', ' ')
        return
    t = Thread(target=speak, args=[ans], daemon=True)
    t.start()
    sleep(3)
    eel.updateAssistant(1, cmd, ans)
   
   
def init_eel():
    """
    Initialization of electron window
    :return:
        None
    """
    eel.start('index.html', size=(768, 1366)) #Changed by Avinash adjusted for vertically Adjust If Im Wrrong


def init_snowboy():
    """
    Initialization of Hotword Detector
    :return:
        None
    """
    detector.start(assistant_routine)
    
# starts here     
thread_eel = Thread(target=init_eel)
thread_snowboy = Thread(target=init_snowboy)

thread_eel.start()
thread_snowboy.start()
start_schedule()

