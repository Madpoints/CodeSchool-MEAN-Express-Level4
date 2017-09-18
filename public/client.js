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
        $('.city-list').append(list);
    }
    
    $('form').on('submit', function(event) {
       event.preventDefault();
       var name = $("#city").val();
       var location = $("#state").val();
       
       if(name.length < 4) {
           alert("City name must be at least 4 letters long.");
           return false;
       }
       if(location.length < 2) {
           alert("State must be at least 2 letters long.");
           return false;
       }
       
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
    $('.city-list').on('click', 'a[data-block]', function(event) {
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