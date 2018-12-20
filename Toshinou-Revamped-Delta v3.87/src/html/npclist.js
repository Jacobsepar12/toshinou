let knownNpcList = [ "-=[ Streuner ]=-", "-=[ Aider Streuner ]=-",
		"-=[ Recruit Streuner ]=-", "-=[ Lordakia ]=-", "-=[ Devolarium ]=-",
		"-=[ Mordon ]=-", "-=[ Sibelon ]=-", "-=[ Saimon ]=-",
		"-=[ Lordakium ]=-", "-=[ Sibelonit ]=-", "-=[ Kristallin ]=-",
		"-=[ Kristallon ]=-", "-=[ StreuneR ]=-", "-=[ Protegit ]=-",
		"-=[ Cubikon ]=-", "-=[ Interceptor ]=-", "-=[ Barracuda ]=-",
		"-=[ Saboteur ]=-", "-=[ Annihilator ]=-", "-=[ Battleray ]=-",
		"-=[ Deadly Battleray ]=-", "..::{ Boss Streuner }::..",
		"..::{ Boss Lordakia }::..", "..::{ Boss Mordon }::..",
		"..::{ Boss Saimon }::..", "..::{ Boss Devolarium }::..",
		"..::{ Boss Sibelonit }::..", "..::{ Boss Sibelon }::..",
		"..::{ Boss Lordakium }::...", "..::{ Boss Kristallin }::..",
		"..::{ Boss Kristallon }::..", "..::{ Boss StreuneR }::..",
		"( UberStreuner )", "( UberLordakia )", "( UberMordon )",
		"( UberSaimon )", "( UberDevolarium )", "( UberSibelonit )",
		"( UberSibelon )", "( UberLordakium )", "( UberKristallin )",
		"( UberKristallon )", "( UberStreuneR )", "( Uber Interceptor )",
		"( Uber Barracuda )", "( Uber Saboteur )", "( Uber Annihilator )",
		"( Uber Battleray )", "-=[ Referee-Bot ]=-", "<=< Icy >=>",
		"<=< Ice Meteoroid >=>", "<=< Super Ice Meteoroid >=>",
		"-=[ Skoll ]=-", "<=< Skoll's Icy >=>", "-=[ Santa -1100101 ]=-",
		"<=< Gygerthrall >=>", "<=< Blighted Gygerthrall >=>",
		"-=[ Blighted Kristallon ]=-", "<=< Plagued Gygerthrall >=>",
		"-=[ Plagued Kristallin ]=-", "-=[ Plague Rocket ]=-", "-={ demaNeR Escort }=-",
		"-={ Demaner Corsair }=-", "-={ demaNeR Freighter }=-",
		"-=[ Hitac 2.0 ]=-", "-=[ Hitac-Minion ]=-", "* Lordakium Spore *", " \ Attend IX //", "\\\\Purpose XXI //", " \ Impulse II //"];
let knownCirceList = [ "450", "500", "500", "450", "536", "500", "530", "500",
		"610", "575", "575", "600", "600", "525", "525", "500", "500", "500",
		"500", "500", "500", "450", "450", "520", "500", "575", "575", "570",
		"625", "575", "615", "600", "500", "500", "580", "500", "500", "575",
		"600", "600", "580", "625", "580", "500", "500", "500", "500", "500",
		"500", "500", "500", "500", "500", "500", "500", "500", "500", "500",
		"500", "500", "500", "500", "500", "500", "500", "500", "500", "500",
		"500", "500", "500", "500" ];

for (i = 0; i < knownNpcList.length; i++) { 
	document.write('<tr><td><input style="width: 100%" type="text" id="name'+i+'" value="'+knownNpcList[i]+'" readonly></input></td>');
	document.write('<td><input type="number" id="range'+i+'" min="300" max="900" value="'+knownCirceList[i]+'"></td>');
	document.write('<td><select id="ammo'+i+'"><option value="1">X1</option><option value="2">X2</option><option value="3">X3</option><option value="4">X4</option><option value="11">X1 + SAB</option><option value="21">X2 + SAB</option><option value="31">X3 + SAB</option><option value="41">X4 + SAB</option><option value="45">X4 + RSB</option></select></td>');
	document.write('<td><select id="priority'+i+'"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="0">No attack</option></select></td>');
	document.write('</tr>');
}