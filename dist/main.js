const CreateCreeps = require("controllers_CreateCreeps");
const ManageCreeps = require("controllers_ManageCreeps");

const Performance = require("performance_Performance");

module.exports.loop = function() {
	const performance = new Performance();

	const createHarvesters = new CreateCreeps({
		role: "harvester",
		limit: 1,
		// abilities: [WORK, WORK, WORK, WORK, MOVE, MOVE, CARRY]
		abilities: [WORK, MOVE, CARRY]
	});
	const createUpgraders = new CreateCreeps({
		role: "upgrader",
		limit: 1,
		abilities: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE]
	});
	const createBuilders = new CreateCreeps({
		role: "builder",
		limit: 1,
		abilities: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
	});
	const createScouts = new CreateCreeps({ role: "scout", limit: 0 });
	const createRepairer = new CreateCreeps({
		role: "repairer",
		limit: 1,
		abilities: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
	});
	const createHauler = new CreateCreeps({
		role: "hauler",
		limit: 1,
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

	console.log(createHarvesters.spawn());
	console.log(createUpgraders.spawn());
	console.log(createBuilders.spawn());
	console.log(createScouts.spawn());
	console.log(createRepairer.spawn());
	console.log(createHauler.spawn());

	const manageCreeps = new ManageCreeps();
	manageCreeps.init();

	console.log(`
      Time: ${Game.time} 
      Average: ${performance.monitor(100)} / ${Game.cpu.limit}
      Tick: ${Game.cpu.getUsed().toFixed(2)}
   `);
};
