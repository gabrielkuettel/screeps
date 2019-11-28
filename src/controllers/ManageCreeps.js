const roleBuilder = require("roles_builder");
const Harvester = require("roles_Harvester");
const Scout = require("roles_Scout");
const Repairer = require("roles_Repairer");
const Hauler = require("roles_Hauler");
const Upgrader = require("roles_Upgrader");

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
			creep.memory.working = true;
			if (creep.memory.role == "harvester") {
				const harvester = new Harvester(creep, { log: false, talk: true });
				harvester.run();
			}
			// if (creep.memory.role == "upgrader") {
			// 	roleUpgrader.run(creep);
			// }
			if (creep.memory.role == "builder") {
				roleBuilder.run(creep);
			}
			if (creep.memory.role == "scout") {
				const scout = new Scout(creep, { log: false, talk: true });
				scout.run();
			}
			if (creep.memory.role == "repairer") {
				const repairer = new Repairer(creep, { log: false, talk: true });
				repairer.run();
			}
			if (creep.memory.role == "hauler") {
				const hauler = new Hauler(creep, { log: true, talk: true });
				hauler.run();
			}

			if (creep.memory.role == "upgrader") {
				const upgrader = new Upgrader(creep, { log: false, talk: false });
				upgrader.run();
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
