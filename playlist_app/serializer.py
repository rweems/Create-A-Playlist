from rest_framework import serializers
from .models import User, Playlist, Song


class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('id','name','email','age')


class PlaylistSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Playlist
        fields = ('id','playlistName','user')


class SongSerializer(serializers.HyperlinkedModelSerializer):
    playlist = PlaylistSerializer(read_only=True, many=True)

    class Meta:
        model = Song
        fields = ('id','playlist','title','artist')