from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    age = models.PositiveIntegerField()

    def __str__(self):
        return self.name


class Playlist(models.Model):
    playlistName = models.CharField(max_length=100) 
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='playlists')

    def __str__(self):
        return self.playlistName

class Song(models.Model):
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='songs')
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE, related_name='songs')