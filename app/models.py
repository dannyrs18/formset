# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Articulo(models.Model):
    titulo = models.CharField(max_length=20)
    contenido = models.TextField()
    fecha_publicacion = models.DateField()