
$(document).ready(function() {
	var idsParam = $(document).getUrlParam("ids");
	if (!idsParam) {
		$("#leaderboard").html("You need to put some user IDs in the URL. For example: <a href='?ids=1,2,3'>index.html?ids=1,2,3</a>");
		return;
	}
	var idsString = idsParam.replace(/,/g, ";");
	getReputation(idsString);
});

function getReputation(userIdsString) {
	$.ajax({
		url: "http://api.stackoverflow.com/1.1/users/" + userIdsString + "?pagesize=100&page=1&jsonp=?",
		dataType: "jsonp",
		success: function(resultObject) {
			if (resultObject.total == 0) return;
			var users = {};
			for (u in resultObject.users) {
				var user = resultObject.users[u];
				users[user.user_id] = user;
			}
			renderUsers(users);
		},
		error: function(error) {
			console.log(error);
		}
	});
}
function renderUsers(users) {

	userObjects = [];

	for (userId in users) {
		userObjects.push(users[userId]);
	}

	userObjects.sort( function (u1, u2){return u2.reputation - u1.reputation;} );

	$.each(userObjects, function(i,u){
		var userDiv = $("<div>").addClass("user");

		if (i === 0) {
			userDiv.addClass("first");
		} else if ( i === 1 ) {
			userDiv.addClass("second");
		} else if ( i === 2 ) {
			userDiv.addClass("third");
		}

		var statsDiv = $("<div>").addClass("stats");

		userDiv.css("background-image","url('http://www.gravatar.com/avatar/" + u.email_hash + "?s=62&d=identicon')");
		
		var nameDiv = $("<div>").addClass("name");

		var profileLink = $("<a>").attr("href", "http://stackoverflow.com/users/" + u.user_id).html(u.display_name).appendTo(nameDiv);

		nameDiv.appendTo(statsDiv);

		var reputationDiv = $("<div>").addClass("reputation").html(u.reputation).appendTo(statsDiv);

		var badgeDiv = $("<div>").addClass("badges");

		$.each( ["gold","silver","bronze"], function (i, f) {
			if (u.badge_counts[f] > 0) {
				$("<span>").append($("<span>").addClass("badge" + f).html("&#9679;")).append($("<span>").addClass("badgecount").html(u.badge_counts[f])).appendTo(badgeDiv);
			}
		} );

		badgeDiv.appendTo(statsDiv);

		statsDiv.appendTo(userDiv);
		
		userDiv.appendTo($("#leaderboard"));
	});

}
