window.PoliticianView = Backbone.View.extend({

    tagName:"div", // Not required since 'div' is the default if no el or tagName specified
    className: 'row',

    initialize:function () {
        
    },
    
    render: function () {
    	
    	var template = _.template( window['PoliticianView_Tpl'], this.model.toJSON() );
    	var thisElement = $(this.el);
    	$(this.el).html(template);
    	
    	//O sumário do político vai aqui...
    	$('#details', this.el).html(new PoliticianSummaryView({model:this.model}).render().el);

    	//Depois carrego o model dos políticos relacionados (ou por região, ou partido, etc)
    	this.model.relations.fetch({
            success:function (data) {
		$('#relations', thisElement).append(new PoliticianRelationListView({model:data}).render().el);
            }
        });
    	
        return this;
        
    }
});

window.PoliticianSummaryView = Backbone.View.extend({

    tagName:"div",
    className: 'row',
    
    initialize:function () {
        this.model.bind("change", this.render, this);
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});
