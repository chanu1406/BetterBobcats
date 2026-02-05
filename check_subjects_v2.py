import requests
import json

API = 'https://reg-prod.ec.ucmerced.edu/StudentRegistrationSsb/ssb'
try:
    res = requests.get(f'{API}/classSearch/get_subject', params={'searchTerm':'','term':'202510','offset':'1','max':'999'})
    res.raise_for_status()
    subjects = res.json()
    print(f'Found {len(subjects)} subjects')
    print([s['code'] for s in subjects[:10]])
except Exception as e:
    print(f"Error: {e}")
