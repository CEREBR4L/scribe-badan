$('document').ready(function(){
    $('#btn-get').click(function(){
            console.log('posted a get request, i think');
        $.get('https://data-io-cerebr4l.c9users.io/story', 'getStory', function(txt,s,j){
            $('#pre-story').text(txt);
        }, 'text');
    });
})