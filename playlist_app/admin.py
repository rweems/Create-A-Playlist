from django.contrib import admin
from .models import User, Playlist, Song
# Register your models here.

admin.site.register([User, Playlist, Song])
