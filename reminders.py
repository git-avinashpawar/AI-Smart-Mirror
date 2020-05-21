from database import get_reminders
import eel
import schedule
from time import sleep

eel.init('web')


def update_reminders():
    """
    Called by scheduler every 10 seconds, to update reminders 
    :return:
        None
    """
    reminders = get_reminders()
    eel.updateReminders(' ', 1)
    for reminder in reminders:
        eel.updateReminders(reminder, 0)


schedule.every(10).seconds.do(update_reminders)


def start_schedule():
    while True:
        schedule.run_pending()
        sleep(1)
