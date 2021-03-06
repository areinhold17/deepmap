(function(){
    webService = new WebService();
})();

function WebService(){
    this.host = "http://localhost:8182/";
    this.JSON = ".json";
}

WebService.prototype.postSearch = function(search, callback){
    var url = webService.buildURL("holocaust/search",webService.JSON);
    webService.post(url,search, callback);
};

WebService.prototype.postEnamexSearch = function(word, lat, long, textSelection, callback){
    var url = webService.buildURL("holocaust/search/enamex",webService.JSON);
    var enamex = {'word':word,'lat':lat,'lon':long,'textSelection':textSelection};
    webService.post(url,enamex, callback);
};

// WebService.prototype.getStations = function(callback){
//     var url = webService.buildURL("crosthwaite/stations",webService.JSON);
//     webService.get(url,callback);
// };

WebService.prototype.getTextMeta = function( callback){
    var url = webService.buildURL("holocaust/textmeta", webService.JSON);
    webService.get(url,callback);
};

WebService.prototype.getText = function(textUID, callback){
    var url = webService.buildURL("holocaust/"+textUID+"/text", webService.JSON);
    webService.get(url,callback);
};

WebService.prototype.postLocationSearch = function(search, callback){
    var url = webService.buildURL("holocaust/search/location",webService.JSON);
    webService.post(url,search, callback);
};

// WebService.prototype.getStationText = function(stationUID, callback){
//     var url = webService.buildURL("crosthwaite/station/"+stationUID+"/text",webService.JSON);
//     webService.get(url,callback);
// };

// WebService.prototype.getStationTextDetail = function(textUID, start, end , callback){
//     var url = webService.buildURL("crosthwaite/text/"+textUID+"/"+start+"/"+end+"/text",webService.JSON);
//     webService.get(url,callback);
// };

WebService.prototype.getFeatures = function(callback){
    var url = webService.buildURL("feature/feature", webService.JSON);
    webService.get(url,callback);
};

WebService.prototype.postFeatureSearch = function(word, lat, long, textSelection, callback){
    var url = webService.buildURL("feature/search",webService.JSON);
    var enamex = {'word':word,'lat':lat,'lon':long,'textSelection':textSelection};
    webService.post(url,enamex, callback);
};

WebService.prototype.getIcon = function(source){
    var url = webService.buildURL("holocaust/media/icon/"+source,".png");
    return url;
};

WebService.prototype.buildURL = function(path, ext){
    var url = webService.host + path + ext;
    return url;
};

WebService.prototype.get = function(url, callback){
    $.get(url, function(response) {
        //console.log(response);
        var jsonResults = JSON.parse(response);
        callback(jsonResults);
    }).fail(function(){
        console.log("Error with GET for: " + url);
    });
};

WebService.prototype.post = function(url, post, callback)
{
    var jsonPost = JSON.stringify(post);
    //console.log(url,jsonPost);
    $.post(url,jsonPost,function(response)
    {
        //console.log(response);
        var jsonResults = JSON.parse(response);
        callback(jsonResults);
    }).fail(function(){
        console.log("Error with POST for: " + url);
    });
};