from django.shortcuts import render
from .models import User, Playlist, Song
from .serializer import UserSerializer, PlaylistSerializer, SongSerializer
from rest_framework import viewsets
import requests
from django.http import HttpResponse
# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer


class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer


def getSong(self, request, artist,track):
    data = requests.get(f'https://api.deezer.com/search?q=artist:"{artist}"track:"{track}"' ).json()

    print(data)
    return HttpResponse(data, content_type='application/json')

    

