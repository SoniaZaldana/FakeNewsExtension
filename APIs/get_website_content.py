import requests

r=requests.get("https://www.bbc.com/news/world-us-canada-46928440",
               headers={"Content-Type": "application/json",
                       "x-api-key": "bajpVjk1LsymV1FT6mmiqINB4UGRULDhdiR2f2ze"})

print(r.content)