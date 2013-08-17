window.BlogSidebarView = Backbone.View.extend({

    tagName:'div',

    className:'span4 sidebar',

    initialize:function () {
        var self = this;
        this.model.bind("reset", this.render, this);
        this.model.bind("add", function (article) {
            $(self.el).append(new ArticleListItemView({model:article}).render().el);
        });
    },

    render:function () {
        
    	var template = _.template( window['BlogSidebarView_Tpl'], {} );
    	var thisElement = $(this.el);
    	$(this.el).html(template);

    	//Adiciona no #tags o TagListView
    	var tagCollection = new TagCollection();
    	tagCollection.fetch({
			url: 'http://api.custobr.com/1.0/tags/getList',
			success: function (data) {
				$('#tags', thisElement).html(new TagListView({model:data}).render().el);
			}
		});

    	//Adiciona no #articles o ArticleSidebarListView
    	$('#articles', this.el).html(new ArticleSidebarListView({model:this.model}).render().el);

    	return this;
    	
    }
});

////////////////////////////////////////////// TAGS //////////////////////////////////////////
window.TagListView = Backbone.View.extend({

    tagName:'ul',

    className:'post-category-list',

    initialize:function () {
        var self = this;
        this.model.bind("reset", this.render, this);
        this.model.bind("add", function (tag) {
            $(self.el).append(new TagListItemView({model:tag}).render().el);
        });
    },

    render:function () {
        $(this.el).empty();
        _.each(this.model.models, function (tag) {
            $(this.el).append(new TagListItemView({model:tag}).render().el);
        }, this);
        return this;
    }
});

window.TagListItemView = Backbone.View.extend({

    tagName:"li",

    initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function () {
    	
    	var template = _.template(window['TagListItemView_Tpl'], this.model.toJSON() );
    	$(this.el).html(template);
    	
        return this;
        
    }

});
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////// ARTICLES ////////////////////////////////////////
window.ArticleSidebarListView = Backbone.View.extend({

    tagName:'ul',

    className:'popular-posts',

    initialize:function () {
        var self = this;
        this.model.bind("reset", this.render, this);
        this.model.bind("add", function (article) {
            $(self.el).append(new ArticleSidebarListItemView({model:article}).render().el);
        });
    },

    render:function () {
        $(this.el).empty();
        _.each(this.model.models, function (article) {
            $(this.el).append(new ArticleSidebarListItemView({model:article}).render().el);
        }, this);
        return this;
    }
});

window.ArticleSidebarListItemView = Backbone.View.extend({

    tagName:"li",

    initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function () {
    	
    	var template = _.template(window['ArticleSidebarListItemView_Tpl'], this.model.toJSON() );
    	$(this.el).html(template);
    	
        return this;
        
    }

});
//////////////////////////////////////////////////////////////////////////////////////////////