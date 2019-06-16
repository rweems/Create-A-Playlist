from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, PlaylistViewSet, SongViewSet
from . import views

router = routers.SimpleRouter()
router.register('users', UserViewSet)
router.register('playlists', PlaylistViewSet)
router.register('songs', SongViewSet)
# router.register('data',views.getSong)


urlpatterns = [
    path('',include(router.urls)),
    # path('data',views.getSong)
]