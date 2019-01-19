import requests

# API URL
# You can change 'summarize' to different endpoints: sentiment, keywords, etc.
api_url = "https://www.summarizebot.com/api/checkfake?apiKey=7bc4b0c77ace418290dc797690f87425&" \
          "size=20&keywords=10&fragments=15" \
          "&url=https://politics.theonion.com/john-kelly-resigns-in-last-ditch-effort-to-save-his-and-1830989628"
r = requests.get(api_url)
json_res = r.json()
print(json_res)
