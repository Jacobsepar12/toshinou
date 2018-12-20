/*
Created by Freshek on 31.10.2017
 */

function saveOptions(e) {
	e.preventDefault();
	var elements = getElements();
	chrome.storage.local.set(elements);
}

function downloadProfile(e) {
	e.preventDefault();
	var elements = getElements();
	download("profile.json", JSON.stringify(elements));
}

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

function getElements() {
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

	var npcList = []; 
	for (i = 0; i < knownNpcList.length; i++) { 
		var npcdata = {
				name:        $("#name"+i).val(),
				range:        $("#range"+i).val(),
				ammo:        $("#ammo"+i).val(),
				priority:        $("#priority"+i).val() 
		}
		npcList.push(npcdata);
	}
	
    var blackList = [];
    $('.blackList li').each(function(){
    	blackList.push($(this).text());
    });
    
    var whiteList = [];
    $('.whiteList li').each(function(){
    	whiteList.push($(this).text());
    });

	var elements = {
			headerColor:        $("#headerColor").val(),
			headerOpacity:      $("#headerOpacity").val(),
			windowColor:        $("#windowColor").val(),
			windowOpacity:      $("#windowOpacity").val(),
			timerTick:          $("#timerTick").val(),
			debug:				$("#debug").prop('checked'),
			actionsMode:		$("#actionsMode").val(),
			enableRefresh:      $("#enableRefresh").prop('checked'),
			refreshToReconnect: $("#refreshToReconnect").prop('checked'),
			refreshTime:        $("#refreshTime").val(),
			speedFormat:        $('input[name="speedFormat"]:checked').val(),
			windowsToTabs:      $("#windowsToTabs").prop('checked'),
			autoChangeConfig:   $("#autoChangeConfig").prop('checked'),
			attackConfig:       $("#attackConfig").val(),
			escapeConfig:       $("#escapeConfig").val(),
			changeFormation:    $("#changeFormation").prop('checked'),
			flyingFormation:    $("#flyingFormation").val(),
			attackFormation:    $("#attackFormation").val(),
			escapeFormation:    $("#escapeFormation").val(),
			flyingConfig:       $("#flyingConfig").val(),
			useHability:        $("#useHability").prop('checked'),
			habilitySlot:       $("#habilitySlot").val(),
			habilitySlotTwo:    $("#habilitySlotTwo").val(),
			habilitySlotThree:  $("#habilitySlotThree").val(),
			habilitySlotFour:   $("#habilitySlotFour").val(),
			cyborgHp:			$("#cyborgHp").val(),
			venomHp:			$("#venomHp").val(),
			diminisherSHD:		$("#diminisherSHD").val(),
			habilityHpRepair:	$("#habilityHpRepair").val(),
			habilityShieldRepair:	$("#habilityShieldRepair").val(),
			reviveType:         $("#reviveType").val(),
			reviveLimit:        $("#reviveLimit").val(),
			bonusBox:           $("#bonusBox").prop('checked'),
			materials:          $("#materials").prop('checked'),
			cargoBox:           $("#cargoBox").prop('checked'),
			greenOrGoldBooty:   $("#greenOrGoldBooty").prop('checked'),
			redBooty:           $("#redBooty").prop('checked'),
			blueBooty:          $("#blueBooty").prop('checked'),
			masqueBooty:        $("#masqueBooty").prop('checked'),
			collectBoxWhenCircle: $("#collectBoxWhenCircle").prop('checked'),
			workmap:            $("#workmap").val(),
			changeAmmunition:   $("#changeAmmunition").prop('checked'),
			x1Slot:             $("#x1Slot").val(),
			x2Slot:             $("#x2Slot").val(),
			x3Slot:             $("#x3Slot").val(),
			x4Slot:             $("#x4Slot").val(),
			sabSlot:            $("#sabSlot").val(),
			rsbSlot:            $("#rsbSlot").val(),
			stopafterxminutes:  $("#stopafterxminutes").val(),
			waitafterRepair:    $("#waitafterRepair").val(),
			waitBeforeRepair:	$("#waitBeforeRepair").val(),
			fleeFromEnemy:      $("#fleeFromEnemy").prop('checked'),
			jumpFromEnemy:      $("#jumpFromEnemy").prop('checked'),
			onlyEscapeWhenEnemyAttack:  $("#onlyEscapeWhenEnemyAttack").prop('checked'),
			dodgeTheCbs:        $("#dodgeTheCbs").prop('checked'),
			moveRandomly:       $("#moveRandomly").prop('checked'),
			killNpcs:			$("#killNpcs").prop('checked'),
			avoidAttackedNpcs:  $("#avoidAttackedNpcs").prop('checked'),
			circleNpc:          $("#circleNpc").prop('checked'),
			dontCircleWhenHpBelow25Percent:  $("#dontCircleWhenHpBelow25Percent").prop('checked'),
			autoPlay:           $("#autoPlay").val(),
			respondPlayerAttacks:  $("#respondPlayerAttacks").prop('checked'),
			playerAmmo:         $("#playerAmmo").val(),
			useCBSZoneSegure:   $("#useCBSZoneSegure").prop('checked'),
			randomBreaks:		$("#randomBreaks").prop('checked'),
			stopWhenCargoIsFull:	$("#stopWhenCargoIsFull").prop('checked'),
			repairWhenHpIsLowerThanPercent:	$("#repairWhenHpIsLowerThanPercent").val(),
			attackEnemyPlayers:	$("#attackEnemyPlayers").prop('checked'),
			enablePet:			$("#enablePet").prop('checked'),
			petReviveLimit:		$("#petReviveLimit").val(),
			petModule:			$("#petModule").val(),
			sentinelid:         $("#sentinelid").val(),
			defendSentinel:     $("#defendSentinel").prop('checked'),
			followRange:		$("#followRange").val(),
			changeToHonorFormation:	$("#changeToHonorFormation").prop('checked'),
			alpha:              $("#alpha").prop('checked'),
			beta:               $("#beta").prop('checked'),
			gamma:              $("#gamma").prop('checked'),
			delta:              $("#delta").prop('checked'),
			epsilon:            $("#epsilon").prop('checked'),
			zeta:               $("#zeta").prop('checked'),
			kappa:              $("#kappa").prop('checked'),
			lambda:             $("#lambda").prop('checked'),
			kronos:             $("#kronos").prop('checked'),
			hades:              $("#hades").prop('checked'),
			kuiper:             $("#kuiper").prop('checked'),
			attackBattleray:	$("#attackBattleray").prop('checked'),
			onlyAnswerAttacks:	$("#onlyAnswerAttacks").prop('checked'),
			npcList:            npcList,
			whiteList:			whiteList,
			blackList:			blackList
	};
	
	return elements;
}

function restore() {
	$('[data-resource]').each(function() {
		var el = $(this);
		var resourceName = el.data('resource');
		var resourceText = chrome.i18n.getMessage(resourceName);
		if(resourceText){
			el.text(resourceText);
		}
	});

	var items = ["headerColor", "headerOpacity", "windowColor", "windowOpacity", "timerTick", "windowsToTabs", "debug", "actionsMode",
		"enableRefresh","refreshToReconnect", "refreshTime",
		"speedFormat", "autoChangeConfig", "attackConfig", "flyingConfig", "escapeConfig",
		"useHability","habilitySlot", "habilitySlotTwo", "habilitySlotThree", "habilitySlotFour", "cyborgHp", "venomHp", "diminisherSHD", "habilityHpRepair", "habilityShieldRepair",
		"changeFormation","flyingFormation", "escapeFormation",
		"attackFormation","reviveType", "reviveLimit",
		"bonusBox", "materials", "cargoBox", "greenOrGoldBooty",
		"redBooty", "blueBooty", "masqueBooty", "collectBoxWhenCircle", 
		"workmap", "changeAmmunition", "x1Slot", "x2Slot", "x3Slot", "x4Slot", "sabSlot", "rsbSlot",
		"stopafterxminutes", "waitafterRepair", "waitBeforeRepair","fleeFromEnemy", "jumpFromEnemy", "onlyEscapeWhenEnemyAttack", "autoPlay",
		"dodgeTheCbs", "moveRandomly", "killNpcs", "avoidAttackedNpcs", "circleNpc", "dontCircleWhenHpBelow25Percent", "respondPlayerAttacks", "playerAmmo", "useCBSZoneSegure", "randomBreaks", 
		"stopWhenCargoIsFull", "repairWhenHpIsLowerThanPercent", "attackEnemyPlayers", "enablePet", "petReviveLimit", "petModule",
		"sentinelid", "defendSentinel", "followRange",
		"changeToHonorFormation", "alpha", "beta", "gamma", "delta", "epsilon", "zeta", "kappa", "lambda", "kronos", "hades", "kuiper",
		"attackBattleray", "onlyAnswerAttacks",
		"whiteList", "blackList", "npcList"];

	var onGet = items => {
		if (items.headerColor)
			$("#headerColor").val(items.headerColor);
		if (items.headerOpacity)
			$("#headerOpacity").val(items.headerOpacity);
		if (items.windowColor)
			$("#windowColor").val(items.windowColor);
		if (items.windowOpacity)
			$("#windowOpacity").val(items.windowOpacity);
		if (items.timerTick)
			$("#timerTick").val(items.timerTick);
		if (items.enableRefresh)
			$("#enableRefresh").prop('checked', true);
		if(items.refreshToReconnect)
			$("#refreshToReconnect").prop('checked', true);
		if (items.refreshTime)
			$("#refreshTime").val(items.refreshTime);
		if (items.debug) {
			$("#debug").prop('checked', true);
		}
		if (items.actionsMode) {
			$("#actionsMode").val(items.actionsMode);
		}
		if (items.speedFormat) {
			let sel = `#speedFormat_${items.speedFormat}`;
			$(sel).prop('checked', true);
		}
		if (items.windowsToTabs) {
			$("#windowsToTabs").prop('checked', true);
		}
		if (items.autoChangeConfig) {
			$("#autoChangeConfig").prop('checked', true);
		}
		if (items.attackConfig) {
			$("#attackConfig").val(items.attackConfig);
		}
		if (items.flyingConfig) {
			$("#flyingConfig").val(items.flyingConfig);
		}
		if (items.escapeConfig) {
			$("#escapeConfig").val(items.escapeConfig);
		}
		if (items.changeFormation) {
			$("#changeFormation").prop('checked', true);
		}
		if (items.attackFormation) {
			$("#attackFormation").val(items.attackFormation);
		}
		if (items.flyingFormation) {
			$("#flyingFormation").val(items.flyingFormation);
		}
		if (items.escapeFormation) {
			$("#escapeFormation").val(items.escapeFormation);
		}
		if (items.useHability) {
			$("#useHability").prop('checked', true);
		}
		if (items.habilitySlot) {
			$("#habilitySlot").val(items.habilitySlot);
		}
		if (items.habilitySlotTwo) {
			$("#habilitySlotTwo").val(items.habilitySlotTwo);
		}
		if (items.habilitySlotThree) {
			$("#habilitySlotThree").val(items.habilitySlotThree);
		}
		if (items.habilitySlotFour) {
			$("#habilitySlotFour").val(items.habilitySlotFour);
		}
		if (items.cyborgHp) {
			$("#cyborgHp").val(items.cyborgHp);
		}
		if (items.venomHp) {
			$("#venomHp").val(items.venomHp);
		}
		if (items.diminisherSHD) {
			$("#diminisherSHD").val(items.diminisherSHD);
		}
		if (items.habilityHpRepair) {
			$("#habilityHpRepair").val(items.habilityHpRepair);
		}
		if (items.habilityShieldRepair) {
			$("#habilityShieldRepair").val(items.habilityShieldRepair);
		}
		if (items.workmap) {
			$("#workmap").val(items.workmap);
		}
		if (items.reviveType) {
			$("#reviveType").val(items.reviveType);
		}
		if (items.reviveLimit) {
			$("#reviveLimit").val(items.reviveLimit);
		}
		if (items.bonusBox) {
			$("#bonusBox").prop('checked', true);
		}
		if (items.materials) {
			$("#materials").prop('checked', true);
		}
		if (items.cargoBox) {
			$("#cargoBox").prop('checked', true);
		}
		if (items.greenOrGoldBooty) {
			$("#greenOrGoldBooty").prop('checked', true);
		}
		if (items.redBooty) {
			$("#redBooty").prop('checked', true);
		}
		if (items.blueBooty) {
			$("#blueBooty").prop('checked', true);
		}
		if (items.masqueBooty) {
			$("#masqueBooty").prop('checked', true);
		}
		if (items.collectBoxWhenCircle) {
			$("#collectBoxWhenCircle").prop('checked', true);
		}
		if (items.workmap) {
			$("#workmap").val(items.workmap);
		}
		if (items.changeAmmunition) {
			$("#changeAmmunition").prop('checked', true);
		}
		if (items.x1Slot) {
			$("#x1Slot").val(items.x1Slot);
		}
		if (items.x2Slot) {
			$("#x2Slot").val(items.x2Slot);
		}
		if (items.x3Slot) {
			$("#x3Slot").val(items.x3Slot);
		}
		if (items.x4Slot) {
			$("#x4Slot").val(items.x4Slot);
		}
		if (items.sabSlot) {
			$("#sabSlot").val(items.sabSlot);
		}
		if (items.rsbSlot) {
			$("#rsbSlot").val(items.rsbSlot);
		}
		if (items.stopafterxminutes) {
			$("#stopafterxminutes").val(items.stopafterxminutes);
		}
		if (items.waitafterRepair) {
			$("#waitafterRepair").val(items.waitafterRepair);
		}
		if (items.waitBeforeRepair) {
			$("#waitBeforeRepair").val(items.waitBeforeRepair);
		}
		if (items.fleeFromEnemy) {
			$("#fleeFromEnemy").prop('checked', true);
		}
		if (items.jumpFromEnemy) {
			$("#jumpFromEnemy").prop('checked', true);
		}
		if (items.onlyEscapeWhenEnemyAttack) {
			$("#onlyEscapeWhenEnemyAttack").prop('checked', true);
		}
		if (items.dodgeTheCbs) {
			$("#dodgeTheCbs").prop('checked', true);
		}
		if (items.moveRandomly) {
			$("#moveRandomly").prop('checked', true);
		}
		if (items.killNpcs) {
			$("#killNpcs").prop('checked', true);
		}
		if (items.avoidAttackedNpcs) {
			$("#avoidAttackedNpcs").prop('checked', true);
		}
		if (items.circleNpc) {
			$("#circleNpc").prop('checked', true);
		}
		if (items.dontCircleWhenHpBelow25Percent) {
			$("#dontCircleWhenHpBelow25Percent").prop('checked', true);
		}
		if (items.autoPlay) {
			$("#autoPlay").val(items.autoPlay);
		}
		if (items.respondPlayerAttacks) {
			$("#respondPlayerAttacks").prop('checked', true);
		}
		if (items.playerAmmo) {
			$("#playerAmmo").val(items.playerAmmo);
		}
		if (items.useCBSZoneSegure) {
			$("#useCBSZoneSegure").prop('checked', true);
		}
		if (items.randomBreaks) {
			$("#randomBreaks").prop('checked', true);
		}
		if (items.stopWhenCargoIsFull) {
			$("#stopWhenCargoIsFull").prop('checked', true);
		}
		if (items.repairWhenHpIsLowerThanPercent) {
			$("#repairWhenHpIsLowerThanPercent").val(items.repairWhenHpIsLowerThanPercent);
		}
		if (items.attackEnemyPlayers) {
			$("#attackEnemyPlayers").prop('checked', true);
		}
		if (items.enablePet) {
			$("#enablePet").prop('checked', true);
		}
		if (items.petReviveLimit) {
			$("#petReviveLimit").val(items.petReviveLimit);
		}
		if (items.petModule) {
			$("#petModule").val(items.petModule);
		}
		if (items.sentinelid) {
			$("#sentinelid").val(items.sentinelid);
		}
		if (items.defendSentinel) {
			$("#defendSentinel").prop('checked', true);
		}
		if (items.followRange) {
			$("#followRange").val(items.followRange);
		}
		if (items.changeToHonorFormation) {
			$("#changeToHonorFormation").prop('checked', true);
		}
		if (items.alpha) {
			$("#alpha").prop('checked', true);
		}
		if (items.beta) {
			$("#beta").prop('checked', true);
		}
		if (items.gamma) {
			$("#gamma").prop('checked', true);
		}
		if (items.delta) {
			$("#delta").prop('checked', true);
		}
		if (items.epsilon) {
			$("#epsilon").prop('checked', true);
		}
		if (items.zeta) {
			$("#zeta").prop('checked', true);
		}
		if (items.kappa) {
			$("#kappa").prop('checked', true);
		}
		if (items.lambda) {
			$("#lambda").prop('checked', true);
		}
		if (items.kronos) {
			$("#kronos").prop('checked', true);
		}
		if (items.hades) {
			$("#hades").prop('checked', true);
		}
		if (items.kuiper) {
			$("#kuiper").prop('checked', true);
		}
		if (items.attackBattleray) {
			$("#attackBattleray").prop('checked', true);
		}
		if (items.onlyAnswerAttacks) {
			$("#onlyAnswerAttacks").prop('checked', true);
		}
		if (items.whiteList) {
			var listWhite = items.whiteList;
			for (i = 0; i < listWhite.length; i++) {
				$("#whiteList").append("<li id="+listWhite[i]+" value="+listWhite[i]+">"+listWhite[i]+"</li>");
			}
		}
		if (items.blackList) {
			var listBlack = items.blackList;
			for (i = 0; i < listBlack.length; i++) {
				$("#blackList").append("<li id="+listBlack[i]+" value="+listBlack[i]+">"+listBlack[i]+"</li>");
			}
		}
		if (items.npcList) {
			var knownNpcList = items.npcList;
			for (i = 0; i < knownNpcList.length; i++) {
				$("#name"+i).val(knownNpcList[i]["name"]);
				$("#range"+i).val(knownNpcList[i]["range"]);
				$("#ammo"+i).val(knownNpcList[i]["ammo"]);
				$("#priority"+i).val(knownNpcList[i]["priority"]);
			}
		}
	};

	chrome.storage.local.get(items, onGet);
}

$('.donwloadprofile').on("click", downloadProfile);
$("form").on("submit", saveOptions);
$(document).ready(restore);

$(document).ready(function(){
	$('#addWhite').click(function(){
	    $("#whiteList").append("<li id="+$('#candidate').val()+" value="+$('#candidate').val()+">"+$('#candidate').val()+"</li>");
	    $("#candidate").val("");
	});
	$('#addBlack').click(function(){
	    $("#blackList").append("<li id="+$('#candidate').val()+" value="+$('#candidate').val()+">"+$('#candidate').val()+"</li>");
	    $("#candidate").val("");
	});
	$(document).on('click', 'li', function (e) {
	    $(this).remove();
	});
});