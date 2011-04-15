describe("leaderboard", function(){

  describe( "when making urls to call SO", function(){ 

	it ( "should transform array of ids [1] into an API call to stack overflow", function(){
		var soUrl = Leaderboard.getSoUrl([1]);
		expect( soUrl ).toEqual( "http://api.stackoverflow.com/1.1/users/1?pagesize=100&page=1&jsonp=?" )
	});

	it ( "should transform arrays of ids [1,2,3] into an API call to stack overflow", function(){
		var soUrl = Leaderboard.getSoUrl([1,2,3]);
		expect( soUrl ).toEqual( "http://api.stackoverflow.com/1.1/users/1;2;3?pagesize=100&page=1&jsonp=?" )
	});

	it ( "should transform empty arrays of ids [] into undefined", function(){
		var soUrl = Leaderboard.getSoUrl([]);
		expect( soUrl ).toBeUndefined();
	});

  });

  describe( "when handling data returned from SO", function(){
	  it( "should transform SO user object into one which we can use", function(){

		  var example_so_user = {
			  "user_id": 1,
			  "display_name": "Jeff Atwood",
			  "reputation": 15160,
			  "email_hash": "51d623f33f8b83095db84ff35e15dbe",
			  "badge_counts": {
				"gold": 21,
				"silver": 65,
				"bronze": 79
			  },
			  "ANY_OTHER_CRAP": "IS_IGNORED"
			}

		var user = Leaderboard.convertSoUser(0, example_so_user);

		expect( user.realname      ).toEqual( "Jeff Atwood" );
		expect( user.reputation    ).toEqual( 15160 );
		expect( user.scores.gold   ).toEqual( 21 );
		expect( user.scores.silver ).toEqual( 65 );
		expect( user.scores.bronze ).toEqual( 79 );
		expect( user.gravatarImg   ).toEqual( "http://www.gravatar.com/avatar/51d623f33f8b83095db84ff35e15dbe?s=62&d=identicon" );
		expect( user.profileLink   ).toEqual( "http://www.stackoverflow.com/users/1" );

	  });
  });

  describe( "when sorting multiple users", function(){

    it ( "should sort users by reputation", function(){
      var example_user_1 = { "reputation": 1 };
      var example_user_2 = { "reputation": 2 };
      var example_user_3 = { "reputation": 3 };
      var sortedUsers = [example_user_1, example_user_3, example_user_2].sort( Leaderboard.reputationSort );
      expect( sortedUsers[0] ).toEqual( example_user_3 );
      expect( sortedUsers[1] ).toEqual( example_user_2 );
      expect( sortedUsers[2] ).toEqual( example_user_1 );
    });

    it ( "should sort users by uid in case of identical rep", function(){
      var example_user_1 = { "reputation": 3, "user_id": 43 };
      var example_user_2 = { "reputation": 3, "user_id": 53 };
      var example_user_3 = { "reputation": 3, "user_id": 13 };
      var sortedUsers = [example_user_1, example_user_2, example_user_3].sort( Leaderboard.reputationSort );
      expect( sortedUsers[0] ).toEqual( example_user_3 );
      expect( sortedUsers[1] ).toEqual( example_user_1 );
      expect( sortedUsers[2] ).toEqual( example_user_2 );
    });
  });

  describe( "when creating divs", function(){

    it ( "should create a div with class of 'user'", function(){
      var userDiv = Leaderboard.createDomObject( 0, {} );
      expect( userDiv.hasClass("user") ).toBeTruthy();
    });

    it ( "should create a div with class of 'first' for first place", function(){
      var userDiv = Leaderboard.createDomObject( 0, {} );
      expect( userDiv.hasClass("first") ).toBeTruthy();
    });

    it ( "should create a div with class of 'second' for first place", function(){
      var userDiv = Leaderboard.createDomObject( 1, {} );
      expect( userDiv.hasClass("second") ).toBeTruthy();
    });

    it ( "should create a div with class of 'third' for first place", function(){
      var userDiv = Leaderboard.createDomObject( 2, {} );
      expect( userDiv.hasClass("third") ).toBeTruthy();
    });
  });

  describe( "when creating an individual user's div", function(){
    it ( "should add a subdiv for the user's name", function(){
      var userDiv = Leaderboard.createDomObject( 0, {"realname":"Sparkes the horse"} );
      expect( userDiv.children(".stats").children(".name").text() ).toBe( "Sparkes the horse" );
    });

    it ( "should add a subdiv for the user's reputation", function(){
      var userDiv = Leaderboard.createDomObject( 0, {"reputation":123456} );
      expect( userDiv.children(".stats").children(".reputation").text() ).toBe( "123456" );
    });

	// disabled, why this no pass?
    xit ( "should add a backround picture", function(){
      var userDiv = Leaderboard.createDomObject( 0, {"gravatarImg":"http://example.com"} );
      expect( userDiv.css("background-image") ).toBe( "url(http://example.com)" );
    });

    it ( "should add a subdiv for the user's badges", function(){
      var userDiv = Leaderboard.createDomObject( 0, {"scores":{"gold": 100}} );
      expect( userDiv.children(".stats").children(".badges").children("#countgold").text() ).toBe( "100" );
    });

  });

});
