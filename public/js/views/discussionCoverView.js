window.DiscussionCoverView = Backbone.View.extend({

    tagName:'div',

    className:'row',

    initialize:function () {
        var self = this;
        this.model.bind("reset", this.render, this);
        this.model.bind("add", function (article) {
            $(self.el).append(new DiscussionListItemView({model:discussion}).render().el);
        });
    },

    render:function () {

    	var template = _.template( window['DiscussionCoverView_Tpl'], {} );
    	var thisElement = $(this.el);
    	$(this.el).html(template);

    	$('#complaints', this.el).html(new DiscussionListView({model:this.model}).render().el);
		$('#suggestions', this.el).html(new DiscussionListView({model:this.model}).render().el);
		$('#praises', this.el).html(new DiscussionListView({model:this.model}).render().el);
		$('#side-bar', this.el).html(new DiscussionSidebarView({model:this.model}).render().el);

    	return this;
    }
});