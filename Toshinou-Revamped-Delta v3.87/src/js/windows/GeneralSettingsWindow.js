class GeneralSettingsWindow {
	createWindow() {
		this.botSettingsWindow = WindowFactory.createWindow({
			width: 320,
			text: chrome.i18n.getMessage("general")
		});

		let controls = [
			{
				name: 'palladium',
				labelText: chrome.i18n.getMessage("palladiumbot"),
				appendTo: this.botSettingsWindow,
				event: function () {
					window.settings.palladium = this.checked;
				}
			},
			{
				name: 'piratebot',
				labelText: chrome.i18n.getMessage("piratebot"),
				appendTo: this.botSettingsWindow,
				event: function () {
					window.settings.piratebot = this.checked;
				}
			},
			{
				name: 'piratebotsag',
				labelText: chrome.i18n.getMessage("piratebotsag"),
				appendTo: this.botSettingsWindow,
				event: function () {
					window.settings.piratebotsag = this.checked;
				}
			},
			{
				name: 'cubibot',
				labelText: chrome.i18n.getMessage("cubibot"),
				appendTo: this.botSettingsWindow,
				event: function () {
					window.settings.cubibot = this.checked;
				}
			},
			{
				name: 'ggbot',
				labelText: chrome.i18n.getMessage("ggbot"),
				appendTo: this.botSettingsWindow,
				event: function () {
					window.settings.ggbot = this.checked;
				}
			},
			{
				name: 'sentinelMode',
				labelText: chrome.i18n.getMessage("sentinelmode"),
				appendTo: this.botSettingsWindow,
				event: function () {
					window.settings.sentinelMode = this.checked;
				}
			},
			{
				name: 'gatestonpc',
				labelText: chrome.i18n.getMessage("gatestonpc"),
				appendTo: this.botSettingsWindow,
				event: function () {
					window.settings.gatestonpc = this.checked;
				}
			},
			{
				name: 'npcCircleRadius',
				labelText: chrome.i18n.getMessage("circleradius"),
				type: 'range',
				appendTo: this.botSettingsWindow,
				labelBefore: true,
				attrs: {
					min: 300,
					max: 1000,
					step: 1,
					value: 500,
				},
				event: function (ev) {
					window.settings.npcCircleRadius = this.value;
					$('span:last-child', this.label).text(' (' + this.value + 'px)');
				}
			}
			];

		controls.forEach((control) => {
			this[control.name] = ControlFactory.createControl(control);
		});

		let reloadSettings = jQuery('<div class="reloadSettings"><button class="btn_reload reload btn">'+chrome.i18n.getMessage("loadSettings")+'</button></div>');
		this.botSettingsWindow.append(reloadSettings);
	}
}