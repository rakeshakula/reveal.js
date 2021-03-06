(function(){

  function insertSVG() {
    var images = $("img[data-svg]");
    var image;
    for( var i = 0, len = images.length; i < len; i++ ) {
      image = images[i];
      if( image.getAttribute( 'data-svg' ).length ) {
        var parent = $(image).parent();
        var file = $(image).attr("data-svg");

        var filename = file.split('/').pop()
        var fileNoExt = filename.substr(0, filename.lastIndexOf('.'));

        // fetch the svg
        var filePath = "slides/" + window.presentation + "/" + file;
        //$.get(filePath, function(data, status, jqXhr) {
        $.ajax({
          url: filePath,
          async: false,

          //Make Sketch IDs local to this file
          dataFilter: function(response){
            return response
              .replace(/((path|mask)-[0-9]*)/g, fileNoExt+"-$1")
              .replace(/(#)((path|mask)-[0-9]*)/g, "$1"+fileNoExt+"-$2");
          }
        })
        .done(function(data) {
          var fragmentIds = [];
          if ($(image).attr("fragment-ids") && $(image).attr("fragment-ids").length) {
            fragmentIds = $(image).attr("fragment-ids").split(",");
          }

          $(parent).html($(data).find("svg"));
          $(parent).addClass("svg");
          // set fragments
          for (var j = 0; j < fragmentIds.length; j++) {
            fragId = "#" + fragmentIds[j].trim();
            $(parent).find(fragId).addClass("fragment");
            $(parent).find(fragId).attr("data-fragment-index", j);
          }
        });

      }
    }
  }

  insertSVG();

})();
