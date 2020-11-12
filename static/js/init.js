$(document).ready(function () {
	console.log("Gillian Sanchez, 1003184");

	//function to get the evidences that have been checked
	function update() {
		var checkboxValues = [];
        $('input[type="checkbox"]:checked').each(function(index, elem) {
            checkboxValues.push($(elem).val());
        });
        
        //get possible ghost types
        sendArrayToPy(checkboxValues);
        
	}

	function sendArrayToPy(arr) {
		$.ajax({
			url: '/process',
			type: 'POST',
			contentType: 'application/json',
			dataType : 'json',
			data : JSON.stringify(arr),
			success: function(data){
				document.getElementById("possible").innerHTML = data.possible;
				document.getElementById("impossible").innerHTML = data.impossible;
			},

		});
	}


	//"event listeners"
	$("#EMF5").click(update);
	$("#SpiritBox").click(update);
	$("#Fingerprints").click(update);
	$("#GhostOrb").click(update);
	$("#GhostWriting").click(update);
	$("#Freezing").click(update);

});