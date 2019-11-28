const CreateCreeps = require("controllers_CreateCreeps");
const ManageCreeps = require("controllers_ManageCreeps");

const Performance = require("performance_Performance");

module.exports.loop = function() {
	const performance = new Performance();

	const createHarvesters = new CreateCreeps({
		role: "harvester",
		limit: 3,
		// abilities: [WORK, WORK, WORK, WORK, MOVE, MOVE, CARRY]
		abilities: [WORK, MOVE, CARRY]
	});
	const createHarvestersSecondary = new CreateCreeps({
		role: "harvesterSecondary",
		limit: 4,
		// abilities: [WORK, WORK, WORK, WORK, MOVE, MOVE, CARRY]
		abilities: [WORK, MOVE, CARRY]
	});
	const createUpgraders = new CreateCreeps({
		role: "upgrader",
		limit: 2,
		abilities: [WORK, MOVE, CARRY]
		// abilities: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE]
	});
	const createBuilders = new CreateCreeps({
		role: "builder",
		limit: 2,
		abilities: [WORK, MOVE, CARRY]
		// abilities: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
	});
	const createScouts = new CreateCreeps({ role: "scout", limit: 0 });
	const createRepairer = new CreateCreeps({
		role: "repairer",
		limit: 1,
		abilities: [WORK, MOVE, CARRY]
		// abilities: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
	});
	const createHauler = new CreateCreeps({
		role: "hauler",
		limit: 8,
		abilities: [WORK, MOVE, CARRY]
		// abilities: [
		// 	CARRY,
		// 	CARRY,
		// 	CARRY,
		// 	CARRY,
		// 	CARRY,
		// 	MOVE,
		// 	MOVE,
		// 	MOVE,
		// 	MOVE,
		// 	MOVE,
		// 	MOVE
		// ]
	});

	console.log(createUpgraders.spawn());
	console.log(createBuilders.spawn());
	console.log(createScouts.spawn());
	console.log(createRepairer.spawn());
	console.log(createHauler.spawn());
	console.log(createHarvesters.spawn());
	console.log(createHarvestersSecondary.spawn());

	const manageCreeps = new ManageCreeps();
	manageCreeps.init();

	console.log(`
      Time: ${Game.time} 
      Average: ${performance.monitor(100)} / ${Game.cpu.limit}
      Tick: ${Game.cpu.getUsed().toFixed(2)}
   `);
};
