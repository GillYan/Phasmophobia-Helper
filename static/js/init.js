$(document).ready(function () {
	console.log("Gillian Sanchez, 1003184")

	//function to get the evidences that have been checked
	function update() {
		var checkboxValues = [];
        $('input[type="checkbox"]:checked').each(function(index, elem) {
            checkboxValues.push($(elem).val());
        });

        //check if there any checkboxes that are checked so that elements don't keep moving up and down the page
        if (checkboxValues === undefined || checkboxValues.length == 0) {
        	//set to a zero width space
        	document.getElementById("debugOutput").innerHTML = "&nbsp";
        }
        else {
        	document.getElementById("debugOutput").innerHTML = checkboxValues.join(',');
        }
	}


	//"event listeners"
	$("#EMF5").click(update);
	$("#SpiritBox").click(update);
	$("#Fingerprints").click(update);
	$("#GhostOrb").click(update);
	$("#GhostWriting").click(update);
	$("#Freezing").click(update);
});