import os
import re
import random
import requests
import urllib.request

def random_string(length):
    # A function that returns a random string of a given length.
    # Get a list of all possible characters.
    chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    # Return a random string.
    return ''.join([random.choice(chars) for i in range(length)])

# A function that scans text files in current directory for a presense of a cdn.discordapp.com link, downloads the file and replaces the link with a downloaded file name.
def download_files():
    # Get a list of all files in the current directory.
    files = os.listdir()
    # Iterate over the list of files.
    for file in files:
        # Check if the file is a text file.
        if file.endswith('.ts'):
            # Open the file with utf-8.
            with open(file, mode="r", encoding="utf-8") as f:
                # Read the file.
                text = f.read()
                # Find all links to cdn.discordapp.com.
                links = re.findall(r'https://cdn.discordapp.com/attachments/[0-9]+/[0-9]+/[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+', text)
                # Iterate over the list of links.
                for link in links:
                    # Get the file name.
                    file_name = random_string(5) + '.' + link.split('.')[-1]
                    # Download the file using requests library.
                    response = requests.get(link)
                    # Save the downloaded file.
                    with open(file_name, 'wb') as downloaded_file:
                        downloaded_file.write(response.content)
                    # Replace the link with the file name.
                    text = text.replace('/img/' + link, 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/' + file_name)
            # Open the file.
            with open(file, mode="w", encoding="utf-8") as f:
                # Write the file.
                f.write(text)

download_files()