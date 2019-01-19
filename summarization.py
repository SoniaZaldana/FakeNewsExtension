import requests

url = "https://api.meaningcloud.com/summarization-1.0"

payload = "key=YOUR_KEY_VALUE&txt=YOUR_TXT_VALUE&url=YOUR_URL_VALUE&doc=YOUR_DOC_VALUE&sentences=YOUR_SENTENCES_VALUE"
headers = {'content-type': 'application/x-www-form-urlencoded'}

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)