window.StatisticsView = Backbone.View.extend({

    initialize:function () {
        console.log('Initializing Statistics View');
//        this.template = _.template(directory.utils.templateLoader.get('home'));
//        this.template = templates['Home'];
    },

    events:{

    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }

});