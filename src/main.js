const createCreeps = require("controllers_CreateCreeps");
const roleHarvester = require("roles_harvester");
const roleUpgrader = require("roles_upgrader");
const roleBuilder = require("roles_builder");
const Performance = require("performance_Performance");

module.exports.loop = function() {
	const performance = new Performance();

	for (var name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log("Clearing non-existing creep memory:", name);
		}
	}

	const createHarvesters = new createCreeps({ role: "harvester", limit: 2 });
	const createUpgraders = new createCreeps({ role: "upgrader", limit: 3 });
	const createBuilders = new createCreeps({ role: "builder", limit: 3 });

	console.log(`
      ${createHarvesters.spawn()}
      ${createUpgraders.spawn()}
      ${createBuilders.spawn()} 
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
	console.log(`
      Time: ${Game.time} 
      Average: ${performance.monitor().toFixed(2)} / ${Game.cpu.limit}
      Tick: ${Game.cpu.getUsed().toFixed(2)}
   `);
};
