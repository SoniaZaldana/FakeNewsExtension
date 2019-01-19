import requests
from bs4 import BeautifulSoup

r = requests.get("https://www.bbc.com/news/world-us-canada-46928440",
                 headers={"Content-Type": "application/json",
                          "x-api-key": "bajpVjk1LsymV1FT6mmiqINB4UGRULDhdiR2f2ze"})
url = "https://www.reuters.com/article/us-myanmar-journalists/myanmar-court-rejects-appeal-by-jailed-reuters-reporters-idUSKCN1P50HL"
r = requests.get("http://boilerpipe-web.appspot.com/extract?url=" + url+"?output=text")

soup = BeautifulSoup(r.content)
print(soup.get_text())
