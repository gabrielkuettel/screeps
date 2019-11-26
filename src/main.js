const CreateCreeps = require("controllers_CreateCreeps");
const ManageCreeps = require("controllers_ManageCreeps");
const roleHarvester = require("roles_harvester");
const roleUpgrader = require("roles_upgrader");
const roleBuilder = require("roles_builder");

const Performance = require("performance_Performance");

module.exports.loop = function() {
	const performance = new Performance();

	const createHarvesters = new CreateCreeps({ role: "harvester", limit: 3 });
	const createUpgraders = new CreateCreeps({ role: "upgrader", limit: 3 });
	const createBuilders = new CreateCreeps({ role: "builder", limit: 5 });

	console.log(createHarvesters.spawn());
	console.log(createUpgraders.spawn());
	console.log(createBuilders.spawn());

	const manageCreeps = new ManageCreeps();
	manageCreeps.init();

	// var tower = Game.getObjectById("TOWER_ID");
	// if (tower) {
	// 	var closestDamagedStructure = tower.pos.findClosestByRange(
	// 		FIND_STRUCTURES,
	// 		{
	// 			filter: structure => structure.hits < structure.hitsMax
	// 		}
	// 	);
	// 	if (closestDamagedStructure) {
	// 		tower.repair(closestDamagedStructure);
	// 	}

	// 	var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	// 	if (closestHostile) {
	// 		tower.attack(closestHostile);
	// 	}
	// }
	console.log(`
      Time: ${Game.time} 
      Average: ${performance.monitor(10).toFixed(2)} / ${Game.cpu.limit}
      Tick: ${Game.cpu.getUsed().toFixed(2)}
   `);
};
