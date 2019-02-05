;(function ($){
    $.fn.mensaje = function(opts){
        var options = $.extend( {}, $.fn.mensaje.defaults, opts ); // variable de opciones
        var totalForms = $('#id_' + options.prefix + '-TOTAL_FORMS'); 
        var minForms = $('#id_' + options.prefix + '-MIN_NUM_FORMS');
        var maxForms = $('#id_' + options.prefix + '-MAX_NUM_FORMS');
        var elemBase = totalForms.parent();

        // maxForms.after('<input type="hidden" name="'+options.prefix+'-TOT-VIS_FORMS" id="id_'+options.prefix+'-TOT-VIS_FORMS">')
        // var totalVisibleForms = $('#id_' + options.prefix + '-TOT-VIS_FORMS');
        // totalVisibleForms.val($("#"+elemBase.attr('id')+" input[type='checkbox'][id$='-DELETE']:not([checked])").length)

        // console.log(totalForms.val());
        // console.log(minForms.val());
        // console.log(maxForms.val());
        // console.log(totalVisibleForms);

        var addBotonEliminar = function(){
            $("#"+elemBase.attr('id')+" input[id$='-DELETE']").each(function(){
                $(this).after("<input type='button' value='"+options.nameButtonDelete+"' name='"+$(this).attr('id')+"'>")
                $(this).hide()
            })
            $("[for$='-DELETE']").remove()
        }

        var addBotonAgregar = function(){
            $("#"+elemBase.attr('id')).append("<div class='buttonContent'></div>")
            $("#"+elemBase.attr('id')+"> .form:last").clone(true, true).append(".buttonContent")
            $("#"+elemBase.attr('id')+" .buttonContent").html('<input type="button" value="'+options.nameButton+'" id="buttonAdd'+options.prefix+'"/>')
        }

        var showBotonEliminar = function(){
            if (parseInt(minForms.val())){
                if (totalVisibleForms.val() <= parseInt(minForms.val())){
                    $("#"+elemBase.attr('id')+" input[type='button'][name$='-DELETE']").hide()
                }
            }else if (totalVisibleForms.val() < 2){
                $("#"+elemBase.attr('id')+" input[type='button'][name$='-DELETE']").hide()
            }else {
                $("#"+elemBase.attr('id')+" input[type='button'][name$='-DELETE']:not([checked])").show()
            }
        }

        var deleteForms = function(forms){
            forms.closest('.form').hide();
            $("input[type='checkbox'][id="+forms.attr('name')+"]").prop('checked', true);
            console.log($("input[type='checkbox'][id="+forms.attr('name')+"]").is(':checked'));
            // totalVisibleForms.val(parseInt(totalVisibleForms.val()) - 1)
            // showBotonEliminar();
        }

        var addForms = function(){
            totalForms.val(parseInt(totalForms.val())+1);
            var regex = /\-{1}([0-9]{1,3})\-{1}/
            $("#"+elemBase.attr('id')+"> .form:not([style]):last").clone(true).insertAfter($("#"+elemBase.attr('id')+"> .form:last")) // clona el ultimo form
            $("#"+elemBase.attr('id')+"> .form:last [class='errorlist']").remove() // Elimina errores que genero el ultimo form si al enviar el formulario se genero alguno
            $("#"+elemBase.attr('id')+"> .form:last [id^='id_"+options.prefix+"']").each(function(){
                $(this).attr('id', $(this).attr('id').replace(regex, "-"+(parseInt(totalForms.val())-1)+"-"));
            }); // cambia el valor del id
            $("#"+elemBase.attr('id')+"> .form:last [for^='id_"+options.prefix+"']").each(function(){
                $(this).attr('for', $(this).attr('for').replace(regex, "-"+(parseInt(totalForms.val())-1)+"-"));
            }); // cambio el valor de los for
            $("#"+elemBase.attr('id')+"> .form:last [name^='"+options.prefix+"']").each(function(){
                $(this).attr('name', $(this).attr('name').replace(regex, "-"+(parseInt(totalForms.val())-1)+"-"));
            }); // cambia el valor de los name
            $("#"+elemBase.attr('id')+"> .form:last [name$='-DELETE'][type='button']").each(function(){
                $(this).attr('name', $(this).attr('name').replace(regex, "-"+(parseInt(totalForms.val())-1)+"-"));
            }); // cambia el valor de los name del boton ya que es especial al id del checkbox oculto
            $("#"+elemBase.attr('id')+"> .form:last [name^='"+options.prefix+"'][type!='button']").each(function(){
                if($(this).val()){
                    $(this).val('')
                }
            }); // Formatear valores ingresados del elemento a clonar
            // totalVisibleForms.val(parseInt(totalVisibleForms.val()) + 1)
        }

        var ocultarInicioForms = function(){
            $("input[type='checkbox'][checked][id$='-DELETE']").closest('.form').hide()
        }

        // ocultarInicioForms();
        addBotonEliminar();
        // addBotonAgregar();
        // showBotonEliminar();
        // $("#buttonAdd"+options.prefix).on('click', function(){
        //     addForms();
        //     // showBotonEliminar();
        // })
        $("#"+elemBase.attr('id')+" > .form input[name$='-DELETE'][type='button']").each(function(){
            $(this).click(function(){deleteForms($(this))})
        })
    }

    $.fn.mensaje.defaults = {
        prefix: 'form',
        nameButton: 'Add',
        nameButtonDelete: 'Delete'
    }
})(jQuery); 