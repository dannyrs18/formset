# -*- coding: utf-8 -*-

from django import forms
from django.forms import formset_factory
from models import Articulo

class ArticuloForm(forms.ModelForm):

    class Meta:
        model = Articulo
        fields = '__all__'

ArticuloFormset = formset_factory(ArticuloForm, can_delete=True)