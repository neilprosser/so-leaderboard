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

});
