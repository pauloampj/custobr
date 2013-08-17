__api = 'http://api.custobr.com/1.0/articles';

window.Article = Backbone.Model.extend({

    urlRoot:__api,

    initialize:function () {
        this.relations = new ArticleCollection();
        this.relations.url = __api + '/' + this.id + '/relations';
    }

});

window.ArticleCollection = Backbone.Collection.extend({

    model: Article,

    url: __api,

    findByName:function (key) {
        var url = (key == '') ? __api : __api + "/search/" + key;
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