__api = 'http://api.custobr.com/1.0/tags';

window.Tag = Backbone.Model.extend({

    urlRoot:__api,

    initialize:function () {
        this.relations = new TagCollection();
        this.relations.url = __api + '/' + this.id + '/relations';
    }

});

window.TagCollection = Backbone.Collection.extend({

    model: Tag,

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