from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, PlaylistViewSet, SongViewSet

router = routers.SimpleRouter()
router.register('users', UserViewSet)
router.register('playlists', PlaylistViewSet)
router.register('songs', SongViewSet)

urlpatterns = router.urls