const fileSelector = document.getElementById('file-selector');
const output = document.getElementById('output');

fileSelector.addEventListener('change', (event) => {
	//output.innerHTML = '';
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
			var index = 0;
			if(line.includes("--- Date")){
				const td = document.createElement('td');
				td.colSpan=4;
				td.classList.add('logStart');
				index = line.indexOf(" ");
				td.textContent = line.slice(index);
				tr.appendChild(td);
				output.appendChild(tr);
				continue;
			}
			if(!line.includes("|")) continue;
			index = line.indexOf("| ");
			var pieces = new Array(line.slice(0,index), line.slice(index+2));
			var time = pieces[0].split(" ")[0];
			var content = pieces[1];
			var	user = " ";
			var channel = " ";
			if(!line.includes("| <")){ //no channel, print everything
				fillLine(tr, time, channel, user, content);
				tr.classList.add("nochannel");
				output.appendChild(tr);
				continue;
			}
			channel = content.split(">")[0].replace("<","").trim();
			if(channel == "SYSTEM"||channel=="GAMEPLAY"){ //system channel
				index = content.indexOf(">");
				content = content.slice(index+1);
			}else{ //some chat - we have an author
				index = content.indexOf(">[");
				user = content.slice(index+2).split("]")[0];
				index = content.indexOf("] ");
				content = content.slice(index+1);
			}
			if(channel.includes("PRIVATE")){
				tr.classList.add("private");
			}
			if(channel.includes("SYSTEM")){
				tr.classList.add("system");
			}
			if(channel.includes("GAMEPLAY")){
				tr.classList.add("gameplay");
			}
			if(channel.startsWith("custom_game")){
				tr.classList.add("custom_game");
			}
			if(channel.startsWith("team")){
				tr.classList.add("team");
			}
			if(channel.startsWith("clan")){
				tr.classList.add("clan");
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