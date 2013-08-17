__politicians_api = 'http://api.custobr.com/1.0/politicians';

window.Politician = Backbone.Model.extend({

    urlRoot:__politicians_api,

    initialize:function () {
        this.relations = new PoliticianCollection();
        this.relations.url = __politicians_api + '/getRelations/' + this.id;
    }

});

window.PoliticianCollection = Backbone.Collection.extend({

    model: Politician,

    url: __politicians_api,

    findByName:function (key) {
        var url = (key == '') ? __politicians_api : __politicians_api + "/search/" + key;
        console.log('findByName: ' + key);
        var self = this;
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                console.log("search success: " + data.length);
                self.reset(data);
            }
        });
    }

});
