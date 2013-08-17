window.DiscussionListView = Backbone.View.extend({

    tagName:'ul',

    className:'nav discussion-list-view no-bottom-margin',

    initialize:function () {
        var self = this;
        this.model.bind("reset", this.render, this);
        this.model.bind("add", function (discussion) {
            $(self.el).append(new DiscussionListItemView({model:discussion}).render().el);
        });
    },

    render:function () {
        $(this.el).empty();
        _.each(this.model.models, function (discussion) {
            $(this.el).append(new DiscussionListItemView({model:discussion}).render().el);
        }, this);
        return this;
    }
});

window.DiscussionListItemView = Backbone.View.extend({

    tagName:"li",
    className: 'horizontal-politician',

    initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function () {

    	var template = _.template(window['DiscussionListItemView_Tpl'], this.model.toJSON() );
    	$(this.el).html(template);
    	
        return this;

    }

});