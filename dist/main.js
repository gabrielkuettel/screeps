const CreateCreeps = require("controllers_CreateCreeps");
const ManageCreeps = require("controllers_ManageCreeps");

const Performance = require("performance_Performance");

module.exports.loop = function() {
	const performance = new Performance();

	const createHarvesters = new CreateCreeps({
		role: "harvester",
		limit: 3,
		abilities: [WORK, WORK, WORK, WORK, MOVE, MOVE, CARRY]
	});
	const createUpgraders = new CreateCreeps({ role: "upgrader", limit: 3 });
	const createBuilders = new CreateCreeps({
		role: "builder",
		limit: 0
		// abilities: [WORK, CARRY, MOVE, MOVE, MOVE, MOVE]
	});
	const createScouts = new CreateCreeps({ role: "scout", limit: 0 });
	const createRepairer = new CreateCreeps({ role: "repairer", limit: 5 });
	const createHauler = new CreateCreeps({
		role: "hauler",
		limit: 2,
		abilities: [
			CARRY,
			CARRY,
			CARRY,
			CARRY,
			CARRY,
			MOVE,
			MOVE,
			MOVE,
			MOVE,
			MOVE,
			MOVE
		]
	});

	createHarvesters.spawn({ log: false });
	createUpgraders.spawn({ log: false });
	createBuilders.spawn({ log: false });
	createScouts.spawn({ log: false });
	createRepairer.spawn({ log: false });
	createHauler.spawn({ log: false });

	const manageCreeps = new ManageCreeps();
	manageCreeps.init();

	console.log(`
      Time: ${Game.time} 
      Average: ${performance.monitor(10)} / ${Game.cpu.limit}
      Tick: ${Game.cpu.getUsed().toFixed(2)}
   `);
};
