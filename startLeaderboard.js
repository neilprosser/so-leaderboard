$(document).ready(function() {

console.log("go");

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

    $.ajax({
		url: soUrl,
		dataType: "jsonp",
		success: Leaderboard.parseSoResponse,
		error: function(error) {
			console.log(error);
		}
	});
});
