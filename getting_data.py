import csv
from urllib.parse import urlparse
import re
bias_dictionary = {
    "Left": "These media sources are moderately to strongly biased toward liberal causes through story selection and/or political affiliation.  "
            "They may utilize strong loaded words (wording that attempts to influence an audience by using appeal to emotion or stereotypes), "
            "publish misleading reports and omit reporting of information that may damage liberal causes. "
            "Some sources in this category may be untrustworthy. ",
    "Left-Center": "These media sources have a slight to moderate liberal bias.  "
                   "They often publish factual information that utilizes loaded words (wording that attempts to "
                   "influence an audience by using appeal to emotion or stereotypes) to favor liberal causes.  ",
    "These sources are generally trustworthy for information, but may require further investigation."
    "Least": "These sources have minimal bias and use very few loaded words (wording that attempts to influence an audience by using appeal to emotion or stereotypes).  " \
             "The reporting is factual and usually sourced.  " \
             "These are the most credible media sources.",
    "Right-Center": "These media sources are slightly to moderately conservative in bias. "
                    "They often publish factual information that utilizes loaded words (wording that attempts to influence an audience by using appeal to emotion or stereotypes) to favor conservative causes."
                    " These sources are generally trustworthy for information, but may require further investigation.",
    "Right": "These media sources are moderately to strongly biased toward conservative causes through story selection and/or political affiliation. They may utilize strong loaded words (wording that attempts to influence an audience by using appeal to emotion or stereotypes), publish misleading reports and omit reporting of information that may damage conservative causes. Some sources in this category may be untrustworthy.",
    "Pro-Science": "These sources consist of legitimate science or are evidence based through the use of credible scientific sourcing.  Legitimate science follows the scientific method, is unbiased and does not use emotional words.  These sources also respect the consensus of experts in the given scientific field and strive to publish peer reviewed science. Some sources in this category may have a slight political bias, but adhere to scientific principles.",
    "Conspiracy": "Sources in the Conspiracy-Pseudoscience category may publish unverifiable information that is not always supported by evidence. These sources may be untrustworthy for credible/verifiable information, therefore fact checking and further investigation is recommended on a per article basis when obtaining information from these sources.",
    "Fake": "A questionable source exhibits one or more of the following: extreme bias, consistent promotion of propaganda/conspiracies, poor or no sourcing to credible information, a complete lack of transparency and/or is fake news. Fake News is the deliberate attempt to publish hoaxes and/or disinformation for the purpose of profit or influence (Learn More). Sources listed in the Questionable Category may be very untrustworthy and should be fact checked on a per article basis.",
    "Satire": "These sources exclusively use humor, irony, exaggeration, or ridicule to expose and criticize people’s stupidity or vices, particularly in the context of contemporary politics and other topical issues. Primarily these sources are clear that they are satire and do not attempt to deceive."

}

def main():

    file = open("original_bias_data.csv")

    csv_file = csv.reader(file)

    def find_bias(entry):
        source = find_source(entry)
        for row in csv_file:
            if row[0] == source:
                return row[1]
        else:
            return "Not classified"

    def findReporting(entry):
        for row in csv_file:
            if row[0] == entry:
                return assing_values_reporting(row[2])
            else:
                return "Not classified"

    def assing_values_reporting(reporting):
        if reporting == "Very High":
            return 2
        elif reporting == "High":
            return 1
        elif reporting == "Mixed":
            return 0
        elif reporting == "Low":
            return -1
        else:
            return -2

    def explain_bias(bias):
        if bias in bias_dictionary:
            return bias_dictionary[bias]
        else:
            return ""

    # Precondition: We are given a list from possible URLs and we have a function findSource that finds the source from
    # a given URL

    def get_opposing_view(url_list, given_bias):

        dict_left = {}
        dict_right = {}

        x = 0
        while x < len(url_list):
            source = find_source(url_list[x])
            bias = find_bias(source)
            reporting = findReporting(source)
            if bias == "Left" or bias == "Left-Center":
                dict_left[source] = reporting
            elif bias == "Right" or bias == "Right-Center":
                dict_right[source] = reporting
            x = x + 1

        if given_bias == "Left" or given_bias == "Left-Center":
            return sorted(dict_right.values())[-1]
        elif given_bias == "Right" or given_bias == "Right-Center":
            return sorted(dict_left.values())[-1]

    def find_source(url):
        parse_object = urlparse(url)
        host = parse_object.netloc
        return re.sub(r'www.', "", host)

    print(find_source("https://stackoverflow.com/questions/449775/how-can-i-split-a-url-string-up-into-separate-parts-in-python"))

    urls = ["https://www.cnn.com/2019/01/19/health/australopithecus-sediba-human-history-scli-intl/index.html",
            "https://www.nytimes.com/2019/01/18/business/media/att-youtube-advertising.html",
            "https://www.bbc.com/news/world-us-canada-46935595",
            "https://www.washingtonpost.com/powerpost/trump-to-make-new-offer-to-democrats-as-government-shutdown-drags-on/2019/01/19/2cde029e-1bf3-11e9-9ebf-c5fed1b7a081_story.html?utm_term=.7c7b1810e509"]

    print(get_opposing_view(urls, find_bias("https://www.cnn.com/2019/01/19/politics/house-democrats-border-security-funding-trump/index.html")))


if __name__ == '__main__':
    main()