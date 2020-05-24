const fileSelector = document.getElementById('file-selector');
const output = document.getElementById('output');

fileSelector.addEventListener('change', (event) => {
	output.innerHTML = '';
	for (const file of event.target.files) {
		readTextLog(file);
	}
});

function readTextLog(file){
	var reader = new FileReader();
	reader.onload = function(){
		var lines = reader.result.split("\n");
		for( const line of lines){
			const tr = document.createElement('tr');
			
			if(!line.includes("|")) continue;
			var pieces = line.split("| "); //indexOf
			var time = pieces[0].split(" ")[0];
			var content = pieces[1];
			var	user = " ";
			if(!line.includes("| <")){ //no channel, print everything
				channel = "none";
				fillLine(tr, time, channel, user, content);
				output.appendChild(tr);
				continue;
			}
			var channel = content.split(">")[0].replace(/ /g,"").replace("<",""); //indexOf
			console.log(channel);
			if(channel == "SYSTEM"){ //system channel
				content = content.split(">")[1];
			}else{ //some chat - we have an author
				user = content.split(">[")[1].split("]")[0]; //indexOf
				content = content.split("] ")[1];
			}
			fillLine(tr, time, channel, user, content);
			output.appendChild(tr);
			continue;
		}
    };
	reader.readAsText(file);
}

function fillLine(tr, time, channel, user, content){
	const td1 = document.createElement('td');
	td1.textContent = time;
	tr.appendChild(td1);
	const td2 = document.createElement('td');
	td2.textContent = channel;
	tr.appendChild(td2);
	const td3 = document.createElement('td');
	td3.textContent = user;
	tr.appendChild(td3);
	const td4 = document.createElement('td');
	td4.textContent = content;
	tr.appendChild(td4);
}