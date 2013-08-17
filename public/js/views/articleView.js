window.ArticleView = Backbone.View.extend({

    tagName:"div", // Not required since 'div' is the default if no el or tagName specified
    className: 'row',

    initialize:function () {
        
    },
    
    render: function () {
    	
        var template = _.template( window['ArticleView_Tpl'], {} );
    	var thisElement = $(this.el);
    	$(this.el).html(template);

    	//Adiciona no #articles o ArticleListView
    	$('#article-summary', this.el).html(new ArticleSummaryView({model:this.model}).render().el);

    	//Adiciona no #side-bar o BlogSidebarView
		$('#side-bar', this.el).html(new BlogSidebarView({model:this.model}).render().el);

    	return this;
        
    }
});

window.ArticleSummaryView = Backbone.View.extend({

    tagName:"div", // Not required since 'div' is the default if no el or tagName specified
    className: 'span8 blog',
    
    initialize:function () {
        this.model.bind("change", this.render, this);
    },

    render:function () {

    	var template = _.template(window['ArticleSummaryView_Tpl'], this.model.toJSON() );
    	$(this.el).html(template);
    	
        return this;
        
    }

});
