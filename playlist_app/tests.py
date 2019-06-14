import requests
import json
from decouple import config


url = 'https://api.deezer.com/search'

artist = "ice nine kills",
track = "a grave mistake"

data = requests.get(f'https://api.deezer.com/search?q=artist:"{artist}" track:"{track}"' ).json()
#prints api call json
print(data)

#prints artist name - song title
print(data['data'][0]['artist']['name'] + " - " + data['data'][0]['title'] )

#prints song title
#print(data['data'][0]['title'])