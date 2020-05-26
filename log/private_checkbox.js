
function handlePrivateToggle() {
	var checkBox = document.getElementById("privatetoggle");
	var elements = document.querySelectorAll('.private');
	for(var i=0; i<elements.length; i++){
		if (checkBox.checked == true){
			elements[i].style.display = "table-row";
		} else {
			elements[i].style.display = "none";
		}
	}
	
}