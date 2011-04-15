var Leaderboard = (function(){

	var convertSoUserFunction = function (soUser) {

      ourUser = {};

      ourUser.name = soUser.display_name;
      ourUser.reputation = soUser.reputation;
      ourUser.scores = soUser.badge_counts;

      ourUser.gravatarImg = "http://www.gravatar.com/avatar/" + soUser.email_hash + "?s=62&d=identicon";
      ourUser.profileLink = "http://www.stackoverflow.com/users/" + soUser.user_id;

      return ourUser;

    };

  return {

    convertSoUser: convertSoUserFunction,

	getSoUrl: function( ids ){

      if ( ids === undefined ) return undefined;
      if ( ids.length === 0  ) return undefined;

	  return "http://api.stackoverflow.com/1.1/users/"+ ids.join(";") +"?pagesize=100&page=1&jsonp=?"

	},

	parseSoResponse: function( response ){
		if (response.total == 0){
			console.log("no results in so response :(");
			return;
		}

console.log(response);

		console.log( response.users.map( convertSoUserFunction ) );

    }
  }
}());

$(document).ready(function() {
	var idsParam = $(document).getUrlParam("ids");
	if (idsParam == undefined){
		console.log("no ids param");
		return;
	}


	var soUrl = Leaderboard.getSoUrl( idsParam.split(",") );
	if (soUrl == undefined){
		console.log("no users :(");
		return;
	}

console.log(soUrl);

    $.ajax({
		url: soUrl,
		dataType: "jsonp",
		success: Leaderboard.parseSoResponse,
		error: function(error) {
			console.log(error);
		}
	});
});
