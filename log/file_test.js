const fileSelector = document.getElementById('file-selector');
const output = document.getElementById('output');

fileSelector.addEventListener('change', (event) => {
	output.innerHTML = '';
	for (const file of event.target.files) {
		const li = document.createElement('li');
        const name = file.name ? file.name : 'NOT SUPPORTED';
        const type = file.type ? file.type : 'NOT SUPPORTED';
        const size = file.size ? file.size : 'NOT SUPPORTED';
		const content = readLog(file, li);
        output.appendChild(li);
	}
});

function readLog(file, li){
	var reader = new FileReader();
	reader.onload = function(){
		var lines = reader.result.split("\n");
		for( const line of lines){
			const pbreak = document.createElement('p');
			pbreak.textContent = line;
			li.appendChild(pbreak);
		}
    };
	reader.readAsText(file);
}