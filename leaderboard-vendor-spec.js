describe("stackoverflow", function(){

  describe( "when calling SO API", function(){
	  it( "should return obejcts in the form we expect", function(){

    $.ajax({
		url: "http://api.stackoverflow.com/2.2/users/268618?site=stackoverflow&pagesize=100&page=1&order=desc&sort=reputation&jsonp=?",
		dataType: "jsonp",
        async: false,
		success: function( resp ){

			expect ( resp.users ).toBeDefined();
			expect ( resp.users.length ).toEqual(1);

			// we use 268618 as he doesn't have many medals
			var user268618 = resp.users[0];

			expect ( user268618 ).toBeDefined();
			expect ( user268618.user_id ).toBeDefined();
			expect ( user268618.reputation ).toBeDefined();
			expect ( user268618.email_hash ).toBeDefined();
			expect ( user268618.badge_counts ).toBeDefined();
			expect ( user268618.badge_counts.gold ).toBeDefined();
			expect ( user268618.badge_counts.silver ).toBeDefined();
			expect ( user268618.badge_counts.bronze ).toBeDefined();
                        expect ( user268618.profile_image ).toBeDefined();

		},
	});


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
                          profile_image: "https://www.gravatar.com/avatar/df2385041c2449f404071930e98c9c28?s=128&d=identicon&r=PG",
			  "ANY_OTHER_CRAP": "IS_IGNORED"
			}

		var user = Leaderboard.convertSoUser(0, example_so_user);

		expect( user.realname      ).toEqual( "Jeff Atwood" );
		expect( user.reputation    ).toEqual( 15160 );
		expect( user.scores.gold   ).toEqual( 21 );
		expect( user.scores.silver ).toEqual( 65 );
		expect( user.scores.bronze ).toEqual( 79 );
                expect( user.profileImage  ).toEqual( "https://www.gravatar.com/avatar/df2385041c2449f404071930e98c9c28?s=128&d=identicon&r=PG" );

	  });
  });

});
