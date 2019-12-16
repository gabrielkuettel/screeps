const Builder = require("roles_Builder");
const Harvester = require("roles_Harvester");
const HarvesterSecondary = require("roles_HarvesterSecondary");
const Scout = require("roles_Scout");
const Repairer = require("roles_Repairer");
const Hauler = require("roles_Hauler");
const Upgrader = require("roles_Upgrader");
const Gravedigger = require("roles_Gravedigger");

class ManageCreeps {
	constructor(state = {}) {
		this.state = state;
		this.creeps = Game.creeps;
	}

	init() {
		this.clearMemory();
		this.assign();
		return this.creeps;
	}

	assign() {
		for (let id in this.creeps) {
			const creep = this.creeps[id];
			const { role } = creep.memory;

			creep.memory.working = true;

			if (role == "harvester") {
				const harvester = new Harvester(creep, {
					log: false,
					talk: true
				});
				harvester.run();
			}

			if (role === "harvesterSecondary") {
				const harvester = new HarvesterSecondary(creep, {
					log: false,
					talk: true
				});
				harvester.run();
			}

			if (role == "builder") {
				const builder = new Builder(creep, { log: false, talk: true });
				builder.run();
			}

			if (role == "scout") {
				const scout = new Scout(creep, { log: false, talk: true });
				scout.run();
			}

			if (role == "repairer") {
				const repairer = new Repairer(creep, { log: false, talk: true });
				repairer.run();
			}

			if (role == "hauler") {
				const hauler = new Hauler(creep, { log: false, talk: true });
				hauler.run();
			}

			if (role == "upgrader") {
				const upgrader = new Upgrader(creep, { log: false, talk: true });
				upgrader.run();
			}

			if (role == "gravedigger") {
				const gravedigger = new Gravedigger(creep, {
					log: false,
					talk: true
				});
				gravedigger.run();
			}
		}
	}

	clearMemory() {
		for (var name in Memory.creeps) {
			if (!this.creeps[name]) {
				delete Memory.creeps[name];
				console.log("Clearing non-existing creep memory:", name);
			}
		}
	}
}

module.exports = ManageCreeps;
