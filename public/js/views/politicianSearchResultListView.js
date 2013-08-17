window.PoliticianSearchResultListView = Backbone.View.extend({

    tagName:'ul',

    className:'gallery-post-grid holder',

    initialize:function () {
        var self = this;
        this.model.bind("reset", this.render, this);
        this.model.bind("add", function (politician) {
            $(self.el).append(new PoliticianSearchResultListItemView({model:politician}).render().el);
        });
    },

    render:function () {
        $(this.el).empty();
        _.each(this.model.models, function (politician) {
            $(this.el).append(new PoliticianSearchResultListItemView({model:politician}).render().el);
        }, this);
        return this;
    }
});

window.PoliticianSearchResultListItemView = Backbone.View.extend({

    tagName:"li",
    className:'span1 gallery-item politician-selector',

    initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function () {

        var template = _.template(window['PoliticianSearchResultListItemView_Tpl'], this.model.toJSON() );
    	$(this.el)
    	.html(template)
    	.attr('_politician', this.model.toJSON().state)
    	.bind('select', function(){
    		
    		$(this).attr('_selected', 'true').addClass('selected').find('i.checked-bar').addClass('icon-ok');
    		$(this).siblings().trigger('deselect');
    		
    	}).bind('deselect', function(){
    		
    		$(this).attr('_selected', 'false').removeClass('selected').find('i.checked-bar').removeClass('icon-ok');
    		
    	}).click(function(){
    		
    		if($(this).is('[_selected="true"]')){
    			
    			$(this).trigger('deselect');
    			
    		}else{
    			
    			$(this).trigger('select');
    			
    		}
    		
    	});
    	
        return this;
        
    }

});