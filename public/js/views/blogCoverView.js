window.BlogCoverView = Backbone.View.extend({

    tagName:'div',

    className:'row',

    initialize:function () {
        var self = this;
        this.model.bind("reset", this.render, this);
        this.model.bind("add", function (article) {
            $(self.el).append(new ArticleListItemView({model:article}).render().el);
        });
    },

    render:function () {

    	var template = _.template( window['BlogCoverView_Tpl'], {} );
    	var thisElement = $(this.el);
    	$(this.el).html(template);

    	//Adiciona no #articles o ArticleListView
    	$('#articles', this.el).html(new ArticleListView({model:this.model}).render().el);

    	//Adiciona no #side-bar o BlogSidebarView
		$('#side-bar', this.el).html(new BlogSidebarView({model:this.model}).render().el);

    	return this;
    }
});