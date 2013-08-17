window.DiscussionView = Backbone.View.extend({

    tagName:"div", // Not required since 'div' is the default if no el or tagName specified
    className: 'row',

    initialize:function () {
        
    },
    
    render: function () {
    	
    	var template = _.template( window['DiscussionView_Tpl'], this.model.toJSON() );
    	$(this.el).html(template);
    	
    	//O sumário do debate vai aqui...
    	$('#details', this.el).html(new DiscussionSummaryView({model:this.model}).render().el);
    	
    	//Depois carrego os debates relacionados ao mesmo político
    	//this.model.relationships.fetch...
    	
    	//Depois carrego a lista lateral dos debates relacionados...
    	$('#relations', this.el).append(new DiscussionRelationListView({model:this.model}).render().el);
    	
        return this;
        
    }
});

window.DiscussionSummaryView = Backbone.View.extend({

    tagName:"div", // Not required since 'div' is the default if no el or tagName specified
    
    initialize:function () {
//        this.template = templates['EmployeeSummary'];
        this.model.bind("change", this.render, this);
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});
