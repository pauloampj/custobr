window.Router = Backbone.Router.extend({

	routes: {
		""					: "home",
		"custo"				: "cost",
		"politicos/:id"		: "politicianDetails",
		"politicos"			: "politicianList",
		"manifestos/:id"	: "discussionDetails",
		"manifestos"		: "discussionList",
		"manifestar"		: "discuss",
		"blog/:id"			: "articleDetails",
		"blog"				: "blog",
		"estatisticas"		: "statistics"
	},

	initialize: function () {
		
		initGritterParams();
		/*
		this.headerView = new HeaderView();
		$('.header').html(this.headerView.render().el);

		// Close the search dropdown on click anywhere in the UI
		$('body').click(function () {
			$('.dropdown').removeClass("open");
		});
		*/
	},

	home: function () {
		// Since the home view never changes, we instantiate it and render it only once
		if (!this.homeView) {
			this.homeView = new HomeView();
			this.homeView.render();
		} else {
			this.homeView.delegateEvents(); // delegate events when the view is recycled
		}
		$("#content").html(this.homeView.el);
		setMenuHighlight('home');
		blogSlide();
		gallerySorting();
		tooltipAndPopOver();
		galleryHover();
		postHover();
		imgfeedHover();
		cssFix();
		callprettyPhoto();
		backToTopCtrl();
		
	},
	
	cost: function () {
		// Since the home view never changes, we instantiate it and render it only once
		if (!this.costView) {
			this.costView = new CostView();
			this.costView.render();
		} else {
			this.costView.delegateEvents(); // delegate events when the view is recycled
		}
		$("#content").html(this.costView.el);
		setMenuHighlight('cost');
	},

	politicianDetails: function (id) {
		var politician = new Politician({id: id});
		politician.fetch({
			url: 'http://api.custobr.com/1.0/politicians/get/' + id,
			success: function (data) {
				// Note that we could also 'recycle' the same instance of EmployeeFullView
				// instead of creating new instances
				$('#content').html(new PoliticianView({model: data}).render().el);
			}
		});
		setMenuHighlight('politician');
	},
	
	politicianList: function () {
		var politicianCollection = new PoliticianCollection();
		politicianCollection.fetch({
			url: 'http://api.custobr.com/1.0/politicians/getList',
			success: function (data) {
				// Note that we could also 'recycle' the same instance of EmployeeFullView
				// instead of creating new instances
				$('#content').html(new PoliticianListView({model: data}).render().el);
				
				galleryHover();
				postHover();
				imgfeedHover();
				callprettyPhoto();
				cssFix();
				
			}
		});
		
		setMenuHighlight('politician');
		
	},
	
	discuss: function () {

		window.__discuss = {politicians: [], data: {}, files: [], locations: [], authenticated: false};
		$("#content").html(new DiscussView().render().el);
		var e = $("#wizard-demo").wizard({
			buttons: {
				nextText: "Próximo",
				backText: "Voltar"
			}
		});

		e.cards.politician.on('loaded', function(){

			templateLoader.load(["PoliticianSearchResultListView","PoliticianSearchResultListItemView"], function () {
			
				addFileUploadDependencies();				
				bindPoliticianSearchEvent($('#politician-searcher'), $('#politician-result-container'));
				
			});

		});
		
		e.cards.discuss.on('loaded', function(){
			
			var mapOptions = {
					center: new google.maps.LatLng(-15.12731072510895, -54.38786234999998),
					zoom: 4,
					mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			window.discussMap = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
			google.maps.event.addListener(discussMap, 'click', function(event) {
				placeMarker(discussMap, event.latLng);
			});
			
			bindUploadHandler();

		});
		
		e.cards.you.on('loaded', function(){

			verifyUserAuth();

			if(__authenticated){
				
				processSuccessfulAuthentication(__authContexts.discuss);
				
			}else{

				appendLogginResources(__authContexts.discuss);
				
			}

		});

		e.on("submit", function(wizard) {

			var discuss = wizard.cards.discuss.el;

			discuss.find('[data-field]').each(function(){

				__discuss.data[$(this).attr('data-field')] = encodeURIComponent($(this).val());
				
			});
			
		    $.ajax({
		        url: __api_url + "discuss/add",
		        type: "POST",
		        data: __discuss,
		        success: function() {
		            wizard.submitSuccess(); /from sel	/ displays the success card
		            wizard.hideButtons(); // hides the next and back buttons
		            wizard.updateProgressBar(0); // sets the progress meter to 0
		        },
		        error: function() {
		            wizard.submitError(); // display the error card
		            wizard.hideButtons(); // hides the next and back buttons
		        }
		    });
		});

		
		e.show();
		setMenuHighlight('discussion');

	},
	
	discussionDetails: function (id) {
		var discussion = new Discussion({id: id});
		discussion.fetch({
			url: 'http://api.custobr.com/1.0/discussions/get/' + id,
			success: function (data) {
				// Note that we could also 'recycle' the same instance of EmployeeFullView
				// instead of creating new instances
				$('#content').html(new DiscussionView({model: data}).render().el);
			}
		});
		setMenuHighlight('discussion');
	},
	
	discussionList: function () {
		var discussionCollection = new DiscussionCollection();
		discussionCollection.fetch({
			url: 'http://api.custobr.com/1.0/discussions/getList',
			success: function (data) {
				// Note that we could also 'recycle' the same instance of EmployeeFullView
				// instead of creating new instances
				$('#content').html(new DiscussionCoverView({model: data}).render().el);
			}
		});
		setMenuHighlight('discussion');
	},
	
	articleDetails: function (id) {
		var article = new Article({id: id});
		article.fetch({
			url: 'http://api.custobr.com/1.0/articles/get/' + id,
			success: function (data) {
				// Note that we could also 'recycle' the same instance of EmployeeFullView
				// instead of creating new instances
				$('#content').html(new ArticleView({model: data}).render().el);
			}
		});
		setMenuHighlight('article');
	},
	
	blog: function () {
		var articleCollection = new ArticleCollection();
		articleCollection.fetch({
			url: 'http://api.custobr.com/1.0/articles/getList',
			success: function (data) {
				// Note that we could also 'recycle' the same instance of EmployeeFullView
				// instead of creating new instances
				$('#content').html(new BlogCoverView({model: data}).render().el);
			}
		});
		setMenuHighlight('article');
	},
	
	statistics: function () {
		// Since the home view never changes, we instantiate it and render it only once
		if (!this.statisticsView) {
			this.statisticsView = new StatisticsView();
			this.statisticsView.render();
		} else {
			this.statisticsView.delegateEvents(); // delegate events when the view is recycled
		}
		$("#content").html(this.statisticsView.el);
		setMenuHighlight('statistics');
	}

});

templateLoader.load([
                     "HomeView",
                     "CostView",
                     "PoliticianView",
                     "PoliticianSummaryView",
                     "PoliticianRelationListView",
                     "PoliticianRelationListItemView",
                     "PoliticianListView",
                     "PoliticianListItemView",
                     "DiscussView",
                     "DiscussionCoverView",
                     "DiscussionListView",
                     "DiscussionListItemView",
                     "DiscussionView",
                     "DiscussionSummaryView",
                     "DiscussionSidebarView",
                     "DiscussionRelationListView",
                     "DiscussionRelationListItemView",
                     "ArticleView",
                     "ArticleSummaryView",
                     "ArticleListView",
                     "ArticleListItemView",
                     "BlogCoverView",
                     "BlogSidebarView",
                     "TagListView",
                     "TagListItemView",
                     "ArticleSidebarListView",
                     "ArticleSidebarListItemView",
                     "StatisticsView"
                     ],
                     function () {
	app = new Router();
	Backbone.history.start();
});
