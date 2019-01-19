import requests
from bs4 import BeautifulSoup

# r = requests.get("https://www.bbc.com/news/world-us-canada-46928440",
#                  headers={"Content-Type": "application/json",
#                           "x-api-key": "bajpVjk1LsymV1FT6mmiqINB4UGRULDhdiR2f2ze"})

def get_content_from_website(url):
    r = requests.get("http://boilerpipe-web.appspot.com/extract?url=" + url+"?output=text" + "?extractor=DefaultExtractor")

    soup = BeautifulSoup(r.content)
    website_text = ""
    all_text_tags = soup.find_all(class_='x-boilerpipe-mark1')
    for tag_with_text in all_text_tags:
        website_text += tag_with_text.text + " "
    return website_text

if __name__ == "__main__":
    website_text  = get_content_from_website("https://www.bloomberg.com/news/articles/2019-01-19/canadian-oil-surge-fails-to-lift-producers-out-of-the-doldrums?srnd=premium-canada")
    text_file = open('/media/nick/Nicu Personal/Programming/UoTtHacks/test_text.txt', 'a')
    text_file.write(website_text)
    text_file.close()
    # html_file = open('/media/nick/Nicu Personal/Programming/UoTtHacks/html_text.html', 'a')
    # htmlText = soup.prettify()
    # html_file.write(str(htmlText))
    # html_file.close();