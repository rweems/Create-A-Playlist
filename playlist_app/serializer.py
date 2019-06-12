from rest_framework import serializers
from .models import User, Playlist, Song


class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('id','name','email','age')


class PlaylistSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset = User.objects.all())

    class Meta:
        model = Playlist
        fields = ('id','playlistName','user')


class SongSerializer(serializers.HyperlinkedModelSerializer):
    playlist = serializers.PrimaryKeyRelatedField(queryset = Playlist.objects.all())

    class Meta:
        model = Song
        fields = ('id','playlist','title','artist')