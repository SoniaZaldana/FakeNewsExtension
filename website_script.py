# A script to find the website corresponding to each media outlet
# Using googlesearch script found online
import csv
import time
try:
    from googlesearch import search
except ImportError:
    print("No module named 'google' found")


def main():
    read_file = open("BiasData.csv")
    csv_file = csv.reader(read_file)

    for row in csv_file:
        constraints = "-youtube -facebook -twitter " \
                                     "-wikipedia -linkedin -soundcloud " \
                                     "-pinterest -instagram -amazon -reddit -quora"
        for url in search(row[0] + " " + constraints, start=0, stop=1):
            print(url)
            write_file = open("website_data.csv", 'a')
            with write_file:
                writer = csv.writer(write_file)
                writer.writerow([url])


if __name__ == '__main__':
    main()

