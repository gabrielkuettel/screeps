var roleHarvester = require("roles/role.harvester");
var roleUpgrader = require("roles/role.upgrader");
var roleBuilder = require("roles/role.builder");

module.exports.loop = function() {
	console.log("am I working?");
	var tower = Game.getObjectById("TOWER_ID");
	if (tower) {
		var closestDamagedStructure = tower.pos.findClosestByRange(
			FIND_STRUCTURES,
			{
				filter: structure => structure.hits < structure.hitsMax
			}
		);
		if (closestDamagedStructure) {
			tower.repair(closestDamagedStructure);
		}

		var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if (closestHostile) {
			tower.attack(closestHostile);
		}
	}

	for (var name in Game.creeps) {
		var creep = Game.creeps[name];
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
};
