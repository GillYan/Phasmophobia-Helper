$(document).ready(function () {
	var inputText;

	console.log("Gillian Sanchez, 1003184")

	function update() {
		var checkboxValues = [];
        $('input[type="checkbox"]:checked').each(function(index, elem) {
            checkboxValues.push($(elem).val());
        });
        $('#debugOutput').html(checkboxValues.join(','));
	}


	$("#EMF5").click(update);
	$("#SpiritBox").click(update);
	$("#Fingerprints").click(update);
	$("#GhostOrb").click(update);
	$("#GhostWriting").click(update);
	$("#Freezing").click(update);
});