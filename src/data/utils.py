import os
import re
import random
import requests
import urllib.request

def random_string(length):
    chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    return ''.join([random.choice(chars) for i in range(length)])

# A function that scans text files in current directory for a presense of a cdn.discordapp.com link, downloads the file and replaces the link with a downloaded file name.
def download_files():
    files = os.listdir()
    for file in files:
        if file.endswith('.ts'):
            with open(file, mode="r", encoding="utf-8") as f:
                text = f.read()
                links = re.findall(r'https://cdn.discordapp.com/attachments/[0-9]+/[0-9]+/[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+', text)
                for link in links:
                    file_name = random_string(5) + '.' + link.split('.')[-1]
                    response = requests.get(link)
                    with open('./img/' + file_name, 'wb') as downloaded_file:
                        downloaded_file.write(response.content)
                    text = text.replace(link, 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/' + file_name)
            with open(file, mode="w", encoding="utf-8") as f:
                f.write(text)

download_files()