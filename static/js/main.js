$(document).ready(function() { 
    render_page('pedidos');

    //Capture all clicks on menu items
    $('#main-menu a').on('click', function(){
        //clenas content container
        $('#main-content').html('<p class="text-center"><i class="fa fa-5x fa-spinner fa-spin"></i></p>');

        //gets the function name by the data attribute and executes it
        var get_data = $(this).data('get');
        render_page(get_data);
    });

});

function page_attributes(page, key, val) {
    switch(page) {
        case 'pedidos': 
            return {code: key, 
                    title: val.title, 
                    description: val.description, 
                    image: val.image}
            break;
        case 'enderecos': 
            return {title: key, 
                    street: val.street,
                    number: val.number,
                    district: val.district,
                    city: val.street,
                    state: val.state,
                    zip_code: val.zip_code}
            break;
        case 'perfil': 
            return {code: key, 
                    name: val.name, 
                    phone: val.phone, 
                    sexo: val.sexo,
                    email: val.email,
                    doc: val.doc}
            break;
    }
}

function render_page(page) {
    //gets products and appends to content container
    $.getJSON('/static/database/' + page + '.json', function(data) {
        //clenas content container
        $('#main-content').html("");

        $.each(data, function(key, val) {
            //get and render template
            $.get('/static/templates/' + page + '.mst', function(template) {
                var rendered = Mustache.render(template, page_attributes(page, key, val));
                $('#main-content').append(rendered);
            });
        });
    });
}