$(document).ready(function() { 

    //Capture all clicks on menu items
    $('#main-menu a').on('click', function(){
        //clenas content container
        $('#main-content').html('<p class="text-center"><i class="fa fa-5x fa-spinner fa-spin"></i></p>');

        //gets the function name by the data attribute and executes it
        var get_data = $(this).data('get');
        self[get_data]();
    });

});

//show a list of products
function pedidos() {
    //gets products and appends to content container
    $.getJSON('/static/database/produtos.json', function(data) {
        //clenas content container
        $('#main-content').html("");

        $.each(data, function(key, val) {
            //get and render template
            $.get('/static/templates/pedidos.mst', function(template) {
            var rendered = Mustache.render(template, {code: key, 
                                                      title: val.title, 
                                                      description: val.description, 
                                                      image: val.image});
            $('#main-content').append(rendered);
            });
        });
    });
}

function enderecos() {
    console.log('enderecos');
}

function perfil() {
    console.log('perfil');
}