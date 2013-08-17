window.DiscussView = Backbone.View.extend({

    tagName:'div',
    className:'row',

    initialize:function () {
    },

    render:function () {

    	var template = _.template( window['DiscussView_Tpl'], {} );
    	$(this.el).html(template);

    	return this;
    }
});