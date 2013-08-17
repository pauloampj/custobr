window.PoliticianRelationListView = Backbone.View.extend({

    tagName:'ul',

    className:'gallery-post-grid holder',

    initialize:function () {
        var self = this;
        this.model.bind("reset", this.render, this);
        this.model.bind("add", function (politician) {
            $(self.el).append(new PoliticianRelationListItemView({model:politician}).render().el);
        });
    },

    render:function () {
        $(this.el).empty();
        _.each(this.model.models, function (politician) {
            $(this.el).append(new PoliticianRelationListItemView({model:politician}).render().el);
        }, this);
        return this;
    }
});

window.PoliticianRelationListItemView = Backbone.View.extend({

    tagName:"li",
    className:'span3 gallery-item horizontal-politician',

    initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function () {

        var template = _.template(window['PoliticianRelationListItemView_Tpl'], this.model.toJSON() );
    	$(this.el).html(template);
    	
        return this;
        
    }

});
