const category = document.getElementById('category');
const commands = document.getElementById('commands');
const blueprint = document.getElementById('blueprint');
const pve_blueprint = document.getElementById('pve-blueprint');
const pvp_blueprint = document.getElementById('pvp-blueprint');
const points = document.getElementById('points');
const respawn = document.getElementById('allow-respawn');
const maps = document.getElementById('maps');

const custom_maps = {
	ffa: ['Каньон основателей', 'Мост', 'Кладбище кораблей', 'Кольцо пепла', 'Кратер', 'Наукоград', 'Крепость', 'и прочие подходящие для ксзс карты'],
	vs: ['Каньон основателей', 'Мост', 'Кладбище кораблей', 'Кольцо пепла', 'ТЭЦ', 'Наукоград', 'и прочие подходящие для vs карты']
};
const special_maps = {
	massacre: ['Заброшеный город','Плацдарм Опустошителей','Химический завод'],
	football: ['Центральный стадион'],
	race: ['Скалистая трасса','Скалистая трасса(inverted)','Индустриальная трасса','Индустриальная трасса(inverted)'],
	battle_royale: ['Кровавые скалы']
};
const pve_maps = {
	long: ['Восточный ретранслятор','Мертвое шоссы','Чертовы рудники'],
	short: ['Гнев Хана','Каньон основателей','Кладбище кораблей', 'Мост', 'Рок-Сити', 'Старый город', 'ТЭЦ', 'Химический завод']
};
const pvp_maps = {
	assault: ['Кольцо Пепла','Кратер','Крепость','Рок-Сити','Сектор ЕХ','Синто-Сити','Сломанная стрела','Старый город'],
	capture: ['Кладбище кораблей','Мост','Наукоград','Песчаная долина','Песчаный залив','Станция Котроль-17','ТЭЦ','Фабрика'],
	control: ['Безымянная башня','Кладбище кораблей','Плацдарм опустошителей','Рок-Сити','Крепость','Химический завод']
};

function updateMaps(){
	while (maps.firstChild) {
        maps.removeChild(maps.firstChild);
    }
	let newmaps = [];
	switch(category.value){
		case 'custom':
			if(commands.value == 'free_for_all'){
				newmaps = custom_maps['ffa'];
			}else{
				newmaps = custom_maps['vs'];
			}
			break;
		case 'pvp':
			switch(document.getElementById('pvp-gamemode').value){
				case 'assault':
				case 'assault3':
					newmaps = pvp_maps['assault'];
					break;
				case 'capture':
				case 'capture3':
					newmaps = pvp_maps['capture'];
					break;
				case 'control':
					newmaps = pvp_maps['control'];
					break;
			}
			break;
		case 'pve':
			switch(document.getElementById('pve-gamemode').value){
				case 'run':
				case 'chase':
				case 'convoy':
				case 'steal_convoy':
					newmaps = pve_maps['long'];
					break;
				default:
					newmaps = pve_maps['short'];
					break;
			}
			break;
		case 'special':
			newmaps = special_maps[document.getElementById('special-gamemode').value];
			break;
	}
	for(var m of newmaps){
		var op = document.createElement('option');
		op.value = m;
		op.text = m;
		maps.appendChild(op);
	}
}

updateMaps();
category.addEventListener('change', (event) => {
	document.getElementById('custom').style.display = 'none';
	document.getElementById('pvp').style.display = 'none';
	document.getElementById('pve').style.display = 'none';
	document.getElementById('special').style.display = 'none';
	document.getElementById(category.value).style.display = 'block';
	updateMaps();
});
commands.addEventListener('change', (event) => {
	vs = commands.value != 'free_for_all';
	document.getElementById('need-vs').style.display = vs?'block':'none';
	document.getElementById('need-ffa').style.display = vs?'none':'block';
	document.getElementById('need-death').style.display = (commands.value == 'free_for_all' && points.value == 'death')?'block':'none';
	updateMaps();
});
blueprint.addEventListener('change', (event) => {
	hangar = blueprint.value == 'hangar';
	document.getElementById('need-hangar').style.display = hangar?'block':'none';
});
pve_blueprint.addEventListener('change', (event) => {
	hangar = pve_blueprint.value == 'hangar';
	document.getElementById('pve-need-hangar').style.display = hangar?'block':'none';
});
pvp_blueprint.addEventListener('change', (event) => {
	hangar = pvp_blueprint.value == 'hangar';
	document.getElementById('pvp-need-hangar').style.display = hangar?'block':'none';
});
points.addEventListener('change', (event) => {
	death = points.value == 'death';
	document.getElementById('need-points').style.display = death?'none':'block';
	document.getElementById('need-death').style.display = (commands.value == 'free_for_all'&&points.value == 'death')?'block':'none';
	
});
respawn.addEventListener('change', (event) => {
	document.getElementById('need-respawn').style.display = respawn.checked?'block':'none';
});