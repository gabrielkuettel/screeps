const createCreeps = require("controllers_createCreeps");
const roleHarvester = require("roles_harvester");
const roleUpgrader = require("roles_upgrader");
const roleBuilder = require("roles_builder");

module.exports.loop = function() {
	for (var name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log("Clearing non-existing creep memory:", name);
		}
	}

	const harvesters = new createCreeps({ role: "harvester", limit: 2 });
	const upgraders = new createCreeps({ role: "upgrader", limit: 1 });
	const builders = new createCreeps({ role: "builder", limit: 2 });

	console.log(`
      ${harvesters.spawn()}
      ${upgraders.spawn()}
      ${builders.spawn()} 
   `);

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
	console.log(`----- CPU LIMIT: ${Game.cpu.getUsed()} / ${Game.cpu.limit}`);
};
