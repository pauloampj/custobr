window.ArticleListView = Backbone.View.extend({

    tagName:'div',

    className:'span8 blog',

    initialize:function () {
        var self = this;
        this.model.bind("reset", this.render, this);
        this.model.bind("add", function (article) {
            $(self.el).append(new ArticleListItemView({model:article}).render().el);
        });
    },

    render:function () {
        $(this.el).empty();
        _.each(this.model.models, function (article) {
            $(this.el).append(new ArticleListItemView({model:article}).render().el);
        }, this);
        return this;
    }
});

window.ArticleListItemView = Backbone.View.extend({

    tagName:"article",

    initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function () {
    	
    	var template = _.template(window['ArticleListItemView_Tpl'], this.model.toJSON() );
    	$(this.el).html(template);
    	
        return this;
        
    }

});