function loadArchive() {
	var files = document.getElementById('files').files;
	if (!files.length) {
		return;
	}
	var file = files[0];
	var reader = new FileReader();
	reader.onloadend = function(evt) {
		if (evt.target.readyState == FileReader.DONE) { // DONE == 2
			var items = $.parseJSON(evt.target.result);
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
			if (items.debug != null) {
				$("#debug").prop('checked', items.debug);
			}
			if (items.actionsMode) {
				$("#actionsMode").val(items.actionsMode);
			}
			if (items.enableRefresh != null)
				$("#enableRefresh").prop('checked', items.enableRefresh);
			if (items.refreshToReconnect != null)
				$("#refreshToReconnect").prop('checked', items.refreshToReconnect);
			if (items.refreshTime)
				$("#refreshTime").val(items.refreshTime);
			if (items.speedFormat != null) {
				let sel = `#speedFormat_${items.speedFormat}`;
				$(sel).prop('checked', items.speedFormat);
			}
			if (items.windowsToTabs != null) {
				$("#windowsToTabs").prop('checked', items.windowsToTabs);
			}
			if (items.autoChangeConfig != null) {
				$("#autoChangeConfig").prop('checked', items.autoChangeConfig);
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
			if (items.changeFormation != null) {
				$("#changeFormation").prop('checked', items.changeFormation);
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
			if (items.useHability != null) {
				$("#useHability").prop('checked', items.useHability);
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
			if (items.bonusBox != null) {
				$("#bonusBox").prop('checked', items.bonusBox);
			}
			if (items.materials != null) {
				$("#materials").prop('checked', items.materials);
			}
			if (items.cargoBox != null) {
				$("#cargoBox").prop('checked', items.cargoBox);
			}
			if (items.greenOrGoldBooty != null) {
				$("#greenOrGoldBooty").prop('checked', items.greenOrGoldBooty);
			}
			if (items.redBooty != null) {
				$("#redBooty").prop('checked', items.redBooty);
			}
			if (items.blueBooty != null) {
				$("#blueBooty").prop('checked', items.blueBooty);
			}
			if (items.masqueBooty != null) {
				$("#masqueBooty").prop('checked', items.masqueBooty);
			}
			if (items.collectBoxWhenCircle != null) {
				$("#collectBoxWhenCircle").prop('checked', items.collectBoxWhenCircle);
			}
			if (items.workmap) {
				$("#workmap").val(items.workmap);
			}
			if (items.changeAmmunition != null) {
				$("#changeAmmunition").prop('checked', items.changeAmmunition);
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
			if (items.fleeFromEnemy != null) {
				$("#fleeFromEnemy").prop('checked', items.fleeFromEnemy);
			}
			if (items.jumpFromEnemy != null) {
				$("#jumpFromEnemy").prop('checked', items.jumpFromEnemy);
			}
			if (items.onlyEscapeWhenEnemyAttack != null) {
				$("#onlyEscapeWhenEnemyAttack").prop('checked', items.onlyEscapeWhenEnemyAttack);
			}
			if (items.dodgeTheCbs != null) {
				$("#dodgeTheCbs").prop('checked', items.dodgeTheCbs);
			}
			if (items.moveRandomly != null) {
				$("#moveRandomly").prop('checked', items.moveRandomly);
			}
			if (items.killNpcs != null) {
				$("#killNpcs").prop('checked', items.killNpcs);
			}
			if (items.avoidAttackedNpcs != null) {
				$("#avoidAttackedNpcs").prop('checked', items.avoidAttackedNpcs);
			}
			if (items.circleNpc != null) {
				$("#circleNpc").prop('checked', items.circleNpc);
			}
			if (items.dontCircleWhenHpBelow25Percent != null) {
				$("#dontCircleWhenHpBelow25Percent").prop('checked', items.dontCircleWhenHpBelow25Percent);
			}
			if (items.autoPlay) {
				$("#autoPlay").val(items.autoPlay);
			}
			if (items.respondPlayerAttacks != null) {
				$("#respondPlayerAttacks").prop('checked', items.respondPlayerAttacks);
			}
			if (items.playerAmmo) {
				$("#playerAmmo").val(items.playerAmmo);
			}
			if (items.useCBSZoneSegure != null) {
				$("#useCBSZoneSegure").prop('checked', items.useCBSZoneSegure);
			}
			if (items.randomBreaks != null) {
				$("#randomBreaks").prop('checked', items.randomBreaks);
			}
			if (items.stopWhenCargoIsFull != null) {
				$("#stopWhenCargoIsFull").prop('checked', items.stopWhenCargoIsFull);
			}
			if (items.repairWhenHpIsLowerThanPercent) {
				$("#repairWhenHpIsLowerThanPercent").val(items.repairWhenHpIsLowerThanPercent);
			}
			if (items.attackEnemyPlayers != null) {
				$("#attackEnemyPlayers").prop('checked', items.attackEnemyPlayers);
			}
			if (items.enablePet != null) {
				$("#enablePet").prop('checked', items.enablePet);
			}
			if (items.petReviveLimit) {
				$("#petReviveLimit").val(items.petReviveLimit);
			}
			if (items.petModule) {
				$("#petModule").val(items.petModule);
			}
			if (items.defendSentinel != null) {
				$("#defendSentinel").prop('checked', items.defendSentinel);
			}
			if (items.followRange) {
				$("#followRange").val(items.followRange);
			}
			if (items.changeToHonorFormation != null) {
				$("#changeToHonorFormation").prop('checked', items.changeToHonorFormation);
			}
			if (items.alpha != null) {
				$("#alpha").prop('checked', items.alpha);
			}
			if (items.beta != null) {
				$("#beta").prop('checked', items.beta);
			}
			if (items.gamma != null) {
				$("#gamma").prop('checked', items.gamma);
			}
			if (items.delta != null) {
				$("#delta").prop('checked', items.delta);
			}
			if (items.epsilon != null) {
				$("#epsilon").prop('checked', items.epsilon);
			}
			if (items.zeta != null) {
				$("#zeta").prop('checked', items.zeta);
			}
			if (items.kappa != null) {
				$("#kappa").prop('checked', items.kappa);
			}
			if (items.lambda != null) {
				$("#lambda").prop('checked', items.lambda);
			}
			if (items.kronos != null) {
				$("#kronos").prop('checked', items.kronos);
			}
			if (items.hades != null) {
				$("#hades").prop('checked', items.hades);
			}
			if (items.kuiper != null) {
				$("#kuiper").prop('checked', items.kuiper);
			}
			if (items.attackBattleray != null) {
				$("#attackBattleray").prop('checked', items.attackBattleray);
			}
			if (items.onlyAnswerAttacks != null) {
				$("#onlyAnswerAttacks").prop('checked', items.onlyAnswerAttacks);
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
					$("#name" + i).val(knownNpcList[i]["name"]);
					$("#range" + i).val(knownNpcList[i]["range"]);
					$("#ammo" + i).val(knownNpcList[i]["ammo"]);
					$("#priority" + i).val(knownNpcList[i]["priority"]);
				}
			}
		}
	};
	reader.readAsText(file);
}

document.querySelector('.loadFile').addEventListener('click', function(evt) {
	loadArchive();
}, false);
  