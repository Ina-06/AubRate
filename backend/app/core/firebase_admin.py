import os
import firebase_admin
from firebase_admin import credentials, auth

def init_firebase_admin() -> None:
    """
    Initialize Firebase Admin SDL once.
    Uses the service account JSON path from env var.
    """

    if firebase_admin._apps:
        return
    service_account_path = os.environ["FIREBASE_SERVICE_ACCOUNT_PATH"]
    cred = credentials.Certificate(service_account_path)
    firebase_admin.initialize_app(cred)

def get_firebase_auth():
    """
    Returns the Firebase Admin Auth module for creating/disabling users, veryfying tokens, etc.
    """
    return auth