var Leaderboard = (function(){
	// Pure code methods

    var d = console.log

    var leaderboard = {};

	leaderboard.convertSoUser = function ( idx, soUser) {
      ourUser = {};

      ourUser.realname   = soUser.display_name;
      ourUser.reputation = soUser.reputation;
      ourUser.scores     = soUser.badge_counts;

      ourUser.gravatarImg = "http://www.gravatar.com/avatar/" + soUser.email_hash + "?s=62&d=identicon";
      ourUser.profileLink = "http://www.stackoverflow.com/users/" + soUser.user_id;
      return ourUser;
    };

    leaderboard.getSoUrl = function( ids ){
      if ( ids === undefined ) return undefined;
      if ( ids.length === 0  ) return undefined;
	  return "http://api.stackoverflow.com/1.1/users/"+ ids.join(";") +"?pagesize=100&page=1&jsonp=?"
	};

    leaderboard.reputationSort = function( u1, u2 ){
		var repDiff = u2.reputation - u1.reputation;

		if ( repDiff === 0 ){
			return u1.user_id - u2.user_id;
		} else {
            return repDiff;
        }
    }

    leaderboard.parseSoResponse = function( response ){
		if (response.total == 0){
			console.log("no results in so response :(");
			return;
		}
	
        $( response.users )
				.map(  leaderboard.convertSoUser )
				.sort( leaderboard.reputationSort )
				.map(  leaderboard.createDomObject )
				.each( function( _, u ){ u.appendTo($("#leaderboard")) } );
    }

    return leaderboard;

}());

Leaderboard = (function(leaderboard){
	// DOM methods

    leaderboard.createDomObject = function( position, soUser ){
      var div = $("<div>").addClass("user");

      $.each( ["first", "second", "third"], function( idx, cls ){
        if ( position === idx ){
          div.addClass( cls );
        }
      });

      div.css("background-image", "url('" + soUser.gravatarImg + "')");

      var statsDiv = $("<div>").addClass("stats");

      statsDiv.append( createNameDiv   ( soUser ) );
      statsDiv.append( createRepDiv    ( soUser ) );
      statsDiv.append( createBadgesDiv ( soUser ) );

	  statsDiv.appendTo( div );
	
      return div;
    };

	var createNameDiv = function( soUser ){
      var nameDiv = $("<div>").addClass("name");
	  nameDiv.text( soUser.realname );
      return nameDiv;
    }

	var createRepDiv = function( soUser ){
      var repDiv = $("<div>").addClass("reputation");
	  repDiv.text( soUser.reputation );
      return repDiv;
    }
    
	var createBadgesDiv = function( soUser ){
      var badgeDiv = $("<div>").addClass("badges");

      if ( soUser.scores ){

        $.each( soUser.scores, function( idx, score ){
          console.log(idx);
          console.log(score);
          if ( score > 0 ){
           var thisBadgeDiv = $("<span>").addClass("badge"+idx);
		   thisBadgeDiv.html("&#9679;");
           var thisCountDiv = $("<span>").attr("id", "count"+idx).html(score);
           badgeDiv.append( thisBadgeDiv );
           badgeDiv.append( thisCountDiv );
          }
        });

      }	  

      return badgeDiv;
    }

	return leaderboard;
}(Leaderboard));


