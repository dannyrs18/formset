# -*- coding: utf-8 -*-

from django import forms
from django.forms import formset_factory
from django.forms import BaseFormSet

class ArticuloForm(forms.Form):
    titulo = forms.CharField()
    fecha_publicacion = forms.DateField()

ArticuloFormset = formset_factory(ArticuloForm, can_delete=True, extra=7)