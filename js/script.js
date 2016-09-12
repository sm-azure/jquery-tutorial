
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $img = $('#back-img');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
    $("#back-img").remove();


    // load streetview
    var api = "https://maps.googleapis.com/maps/api/streetview?size=600x300&key=AIzaSyAwZSFRzZwZrt6LwAK5ydiBcxv_P8MnYCA&location="
    var location = $("#street").val() + " , " + $("#city").val();
    var location_api = api + location;
    console.log(location_api);

    $greeting.text('So you want to live at' + location + '?');

    img = "<img id=\"back-img\" class=\"bgimg\" src=" + location_api + "/>"
    $body.append(img);
    // YOUR CODE GOES HERE!

    var HTMLArticle = "<li class=\"article\"></li>"


    //NYT article-list
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=3aaccdd59c0b4dc8833e3ac8f9605275&sort=newest&q=";
    url += location;

    $.getJSON( url, function( data ) {
      $nytHeaderElem.text('New York Times Articles about ' + location);
      for(article in data.response.docs){
        $nytElem.append(HTMLArticle);
        var link = "<a href=\"" + data.response.docs[article].web_url + "\">"+ data.response.docs[article].headline.main + "</a>";
        var summary = "<p>" + data.response.docs[article].snippet + "</p>"
        $(".article:last").append(link);
        $(".article:last").append(summary);
        console.log(link);
      }
    }).fail(function(){
      $nytHeaderElem.text("New York Times Articles Could not Be Found");
    });

    //Wikipedia

    $.ajax({
      url: 'http://en.wikipedia.org/w/api.php',
      data: { action: 'query', list: 'search', prop: 'extlinks', srsearch: location, format: 'json' },
      dataType: 'jsonp',
      success: function (x) {
        for (article in x.query.search){
          var title = x.query.search[article].title;
          var HTMLWiki= "<ul id=\"wikipedia-links\"><a href=\"" + "https://en.wikipedia.org/wiki/" + title + "\">" + title + "</a></ul>";
          $wikiElem.append(HTMLWiki);
        }
    }
});

//https://www.mediawiki.org/w/api.php?action=query&generator=search&gsrsearch=meaning&prop=extlinks
//https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=meaning&prop=extlinks

    return false;
};

$('#form-container').submit(loadData);
