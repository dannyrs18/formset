# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime
from django.shortcuts import render, redirect
from forms import ArticuloFormset

# Create your views here.

def inicio(request):
    info = [
    {
        'titulo': 'Primer titulo',
        'fecha_publicacion': datetime.date.today(),
    },
    {
        'titulo': 'Primer titulo',
        'fecha_publicacion': datetime.date.today(),
    },
    ]
    formset = ArticuloFormset(prefix="form")
    formset2 = ArticuloFormset(prefix="form2")
    if request.method == 'POST':
        formset = ArticuloFormset(request.POST, prefix="form")
        formset2 = ArticuloFormset(request.POST, prefix="form2")
        estado = formset.is_valid() and formset.is_valid()
        print request.POST
        if estado:
            print estado
        else:
            print formset.non_form_errors()
            print estado
        redirect('/app/inicio')
    context = {
        'formset': formset,
        'formset2': formset2,
    }
    return render(request, 'inicio.html', context)