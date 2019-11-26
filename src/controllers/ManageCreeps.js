const roleHarvester = require("roles_harvester");
const roleUpgrader = require("roles_upgrader");
const roleBuilder = require("roles_builder");

class ManageCreeps {
	constructor() {
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
			if (creep.memory.role == "harvester") {
				roleHarvester.run(creep);
			}
			if (creep.memory.role == "upgrader") {
				roleUpgrader.run(creep);
			}
			if (creep.memory.role == "builder") {
				roleBuilder.run(creep);
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
