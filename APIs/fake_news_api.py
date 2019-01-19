import requests
from passwords import SUMMARIZE_BOT_KEY

API_URL = "https://www.summarizebot.com/api/checkfake?apiKey=" + SUMMARIZE_BOT_KEY + \
          "&size=20&keywords=10&fragments=15" \
          "&url="

def determine_fakeness(url):
    # You can change 'summarize' to different endpoints: sentiment, keywords, etc.
    response = requests.get(API_URL + url)
    json_res = response.json()
    return json_res

if __name__ == "__main__":
    fakeness = determine_fakeness("https://politics.theonion.com/john-kelly-resigns-in-last-ditch-effort-to-save-his-and-1830989628")
    print(fakeness)
