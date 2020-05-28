function handlePrivateToggle() {
	handleToggle("privatetoggle", '.private', true);
}

function handleGameplayToggle(){
	handleToggle("gameplaytoggle", '.gameplay', true);
}

function handleSystemToggle(){
	handleToggle("systoggle", '.system', true);
}

function handleToggle(checkBoxId, clazz, enabledState){
	var checkBox = document.getElementById(checkBoxId);
	var elements = document.querySelectorAll(clazz);
	for(var i=0; i<elements.length; i++){
		if (checkBox.checked == enabledState){
			elements[i].style.display = "table-row";
		} else {
			elements[i].style.display = "none";
		}
	}
}