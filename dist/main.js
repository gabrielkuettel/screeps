const CreateCreeps = require("controllers_CreateCreeps");
const ManageCreeps = require("controllers_ManageCreeps");

const Performance = require("performance_Performance");

module.exports.loop = function() {
	const performance = new Performance();

	const createHarvesters = new CreateCreeps({
		role: "harvester",
		limit: 5,
		abilities: [WORK, WORK, WORK, CARRY, MOVE]
	});
	const createUpgraders = new CreateCreeps({ role: "upgrader", limit: 4 });
	const createBuilders = new CreateCreeps({
		role: "builder",
		limit: 0,
		abilities: [WORK, CARRY, MOVE, MOVE, MOVE, MOVE]
	});
	const createScouts = new CreateCreeps({ role: "scout", limit: 1 });
	const createRepairer = new CreateCreeps({ role: "repairer", limit: 10 });

	createHarvesters.spawn({ log: true });
	createUpgraders.spawn({ log: true });
	createBuilders.spawn({ log: true });
	createScouts.spawn({ log: true });
	createRepairer.spawn({ log: true });

	const manageCreeps = new ManageCreeps();
	manageCreeps.init();

	console.log(`
      Time: ${Game.time} 
      Average: ${performance.monitor(10)} / ${Game.cpu.limit}
      Tick: ${Game.cpu.getUsed().toFixed(2)}
   `);
};
