window.DiscussionSidebarView = Backbone.View.extend({

    tagName:'div',

    className:'span3 sidebar',

    initialize:function () {
        var self = this;
        this.model.bind("reset", this.render, this);
        this.model.bind("add", function (article) {
            $(self.el).append(new ArticleListItemView({model:article}).render().el);
        });
    },

    render:function () {
        
    	var template = _.template( window['DiscussionSidebarView_Tpl'], {} );
    	var thisElement = $(this.el);
    	$(this.el).html(template);

    	return this;
    	
    }
});