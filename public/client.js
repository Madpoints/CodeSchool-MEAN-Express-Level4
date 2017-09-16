/*global $*/

$(function() {
    $.get('/cities', appendToList);
    
    function appendToList(cities) {
        var list = [];
        var content, city;
        for (var i in cities) {
            city = cities[i];
            content = '<a href="/cities/'+city+'">'+city+'</a> '+
            '<a href="#" data-block="'+city+'"><img src="del.png"></a>';
            list.push($('<li>', { html: content }));
        }
        $('.block-list').append(list);
    }
    
    $('form').on('submit', function(event) {
       event.preventDefault();
       var form = $(this);
       var cityData = form.serialize();
       
       $.ajax({
           type: 'POST', url: '/cities', data: cityData
       }).done(function(cityName) {
           appendToList([cityName]);
           form.trigger('reset');
       });
    });
    
    // DELETEs block on confirmation from user
    $('.block-list').on('click', 'a[data-block]', function(event) {
        if (!confirm('Are you sure?')) {
            return false;
        }
        
        var target = $(event.currentTarget);
        
        $.ajax({
            type: 'DELETE', url: '/cities/' + target.data('city')
        }).done(function() {
            target.parents('li').remove();    
        });
    });
});