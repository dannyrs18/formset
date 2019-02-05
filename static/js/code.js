;(function ($){
    $.fn.mensaje = function(opts){
        var options = $.extend( {}, $.fn.mensaje.defaults, opts );
        var totalForms = $('#id_' + options.prefix + '-TOTAL_FORMS');
        var minForms = $('#id_' + options.prefix + '-MIN_NUM_FORMS');
        var maxForms = $('#id_' + options.prefix + '-MAX_NUM_FORMS');
        var parentClass = totalForms.parent();

        // $(maxForms).after('<input type="hidden" name="'+options.prefix+'-COUNT_SHOW_FORM" value="'+3+'" id="id_'+options.prefix+'-COUNT_SHOW_FORM">')
        // var countShowForm = $('#id_' + options.prefix + '-COUNT_SHOW_FORM');

        // function sumCount(){
        //     countShowForm.val(parseInt(countShowForm.val())+1)
        // }

        // function restCount(){
        //     countShowForm.val(parseInt(countShowForm.val())-1)
        // }

        function IdentifyElement(){ // Identificar si es table o algun otro elemento
            return !$('table[id="'+parentClass.attr('id')+'"').length
        }

        function addMinForms(){ // Si tiene un minimo de forms agregar automaticamente los necesarios
            if(totalForms.val() < minForms.val()){
                // Add forms
            }
        }

        function createButtonAdd(){ // Crear Boton Agregar
            $("#"+parentClass.attr('id')).append("<div class='buttonContent'></div>")
            $("#"+parentClass.attr('id')+"> .form:last").clone(true, true).append(".buttonContent")
            $("#"+parentClass.attr('id')+" .buttonContent").html('<input type="button" value="'+options.nameButton+'" id="buttonAdd'+options.prefix+'"/>')
        }

        function showAddButton() { // Visualizar boton
            if (parseInt(totalForms.val())<parseInt(maxForms.val())){
                $("#buttonAdd"+options.prefix).show();
            } else {
                $("#buttonAdd"+options.prefix).hide();
            }
        }

        function showDeleteButton(){
            if(parseInt(minForms.val())){
                // Si existe un minimo de formas
            }else{
                if(parseInt($("#id_"+options.prefix+"-COUNT_SHOW_FORM").val()) <= 1){
                    $("#"+parentClass.attr('id')+" input[type='button'][name$='-DELETE']").hide()
                }else{
                    $("#"+parentClass.attr('id')+" input[type='button'][name$='-DELETE']").show()
                }
            }
        } 

        function createForms(){
            totalForms.val(parseInt(totalForms.val())+1);
            var regex = /\-{1}([0-9]{1,3})\-{1}/
            $("#"+parentClass.attr('id')+"> .form:not([style]):last").clone(true).insertAfter($("#"+parentClass.attr('id')+"> .form:last")) // clona el ultimo form
            $("#"+parentClass.attr('id')+"> .form:last [class='errorlist']").remove() // Elimina errores que genero el ultimo form si al enviar el formulario se genero alguno
            $("#"+parentClass.attr('id')+"> .form:last [id^='id_"+options.prefix+"']").each(function(){
                $(this).attr('id', $(this).attr('id').replace(regex, "-"+(parseInt(totalForms.val())-1)+"-"));
            }); // cambia el valor del id
            $("#"+parentClass.attr('id')+"> .form:last [for^='id_"+options.prefix+"']").each(function(){
                $(this).attr('for', $(this).attr('for').replace(regex, "-"+(parseInt(totalForms.val())-1)+"-"));
            }); // cambio el valor de los for
            $("#"+parentClass.attr('id')+"> .form:last [name^='"+options.prefix+"']").each(function(){
                $(this).attr('name', $(this).attr('name').replace(regex, "-"+(parseInt(totalForms.val())-1)+"-"));
            }); // cambia el valor de los name
            $("#"+parentClass.attr('id')+"> .form:last [name$='-DELETE'][type='button']").each(function(){
                $(this).attr('name', $(this).attr('name').replace(regex, "-"+(parseInt(totalForms.val())-1)+"-"));
            }); // cambia el valor de los name del boton ya que es especial al id del checkbox oculto
            $("#"+parentClass.attr('id')+"> .form:last [name^='"+options.prefix+"'][type!='button']").each(function(){
                if($(this).val()){
                    $(this).val('')
                }
            }); // Formatear valores ingresados del elemento a clonar
            // sumCount();
        }

        function addButtonDelete(){
            $("#"+parentClass.attr('id')+" input[id$='-DELETE']").each(function(){
                $(this).parent().append("<input type='button' value='"+options.nameButtonDelete+"' name='"+$(this).attr('id')+"'>")                 
                $(this).hide()
            })
            $("[for$='-DELETE']").remove()
        }

        function deleteForms(form){
            form.parent().hide();
            $("#"+parentClass.attr('id')+" input[type='checkbox'][id='"+form.attr('name')+"']").prop('checked', true)
            // restCount();
            // showDeleteButton();
        }

        addButtonDelete();
        createButtonAdd();
        showAddButton();
        showDeleteButton();
        $("#buttonAdd"+options.prefix).on('click', function(){
            createForms();
            showAddButton();
            showDeleteButton();
        })
        $("#"+parentClass.attr('id')+" > .form > input[value='"+options.nameButtonDelete+"']").each(function(){
            $(this).click(function(){deleteForms($(this))})
        })
        $("#"+parentClass.attr('id')+" input[type='checkbox'][checked]").each(function(){$(this).parent().hide()})
    }
    $.fn.mensaje.defaults = {
        prefix: 'form',
        nameButton: 'Add',
        nameButtonDelete: 'Delete'
    }
})(jQuery); 