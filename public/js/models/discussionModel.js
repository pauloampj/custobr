__api = 'http://api.custobr.com/1.0/politicians';

window.Discussion = Backbone.Model.extend({

    urlRoot:__api,

    initialize:function () {
        this.reports = new PoliticianCollection();
        this.reports.url = __api + '/' + this.id + '/reports';
    }

});

window.DiscussionCollection = Backbone.Collection.extend({

    model: Discussion,

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