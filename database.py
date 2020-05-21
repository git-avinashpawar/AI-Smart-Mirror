from firebase import firebase

fb = firebase.FirebaseApplication("xxx database url xxx", None)


def get_reminders():
    """
    Fetches saved reminders from firebase database
    :return: reminders --> list
    """
    reminders = []
    data = fb.get('/reminders', None)
    for _, value in data.items():
        reminders.append(value['reminder'])
    return reminders


def get_contact(name):
    """
    Fetches saved contact from firebase database with matching name
    :param
        name --> str
    :return:
        contact --> dict
    """
    return fb.get('/contacts', name)
