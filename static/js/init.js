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
				/*for the text representation
				document.getElementById("possible").innerHTML = data.possible;
				document.getElementById("impossible").innerHTML = data.impossible;
				*/
				//set remaining evidences for each type
				setEvidence(data.evidence);

				var can = (data.possible).split(", ");
				var cant = (data.impossible).split(", ");
				
				//iterate through possible ghost types and set background to gold
				can.forEach(function(item, index) {
					if (item !== "None")
						document.getElementById(item).style.backgroundColor = "#EDF332";
				});

				//iterate through not possible ghost types and set background to red
				cant.forEach(function(item, index) {
					if (item !== "None")
						document.getElementById(item).style.backgroundColor = '#F34F32';
				});

			},

		});
	}

	function setEvidence(arr) {
		document.getElementById("SpiritE").innerHTML = arr[0];
		document.getElementById("WraithE").innerHTML = arr[1];
		document.getElementById("PhantomE").innerHTML = arr[2];

		document.getElementById("PoltergeistE").innerHTML = arr[3];
		document.getElementById("BansheeE").innerHTML = arr[4];
		document.getElementById("JinnE").innerHTML = arr[5];

		document.getElementById("MareE").innerHTML = arr[6];
		document.getElementById("RevenantE").innerHTML = arr[7];
		document.getElementById("ShadeE").innerHTML = arr[8];

		document.getElementById("DemonE").innerHTML = arr[9];
		document.getElementById("YureiE").innerHTML = arr[10];
		document.getElementById("OniE").innerHTML = arr[11];
	}


	//"event listeners"
	$("#EMF5").click(update);
	$("#SpiritBox").click(update);
	$("#Fingerprints").click(update);
	$("#GhostOrb").click(update);
	$("#GhostWriting").click(update);
	$("#Freezing").click(update);

});