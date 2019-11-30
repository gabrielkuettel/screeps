const CreateCreeps = require("controllers_CreateCreeps");
const ManageCreeps = require("controllers_ManageCreeps");

const Performance = require("performance_Performance");

module.exports.loop = function() {
	// for (let creep in Game.creeps) {
	// 	console.log(Game.creeps[creep].name, Game.creeps[creep].ticksToLive);
	// }

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
		abilities: [WORK, CARRY, MOVE]
	});
	const createUpgraders = new CreateCreeps({
		role: "upgrader",
		limit: 4,
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
		limit: 6,
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
	const createGravediggers = new CreateCreeps({
		role: "gravedigger",
		limit: 1,
		// abilities: [WORK, WORK, WORK, WORK, MOVE, MOVE, CARRY]
		abilities: [WORK, MOVE, CARRY]
	});

	// const scouts = console.log(createScouts.spawn());
	const gravediggers = createGravediggers.spawn();
	const builders = createBuilders.spawn();
	const repairers = createRepairer.spawn();
	const upgraders = createUpgraders.spawn();
	const harvesters = createHarvesters.spawn();
	const haulers = createHauler.spawn();
	const harvestersSecondary = createHarvestersSecondary.spawn();

	console.log(gravediggers);
	console.log(builders);
	console.log(repairers);
	console.log(upgraders);
	console.log(harvesters);
	console.log(haulers);
	console.log(harvestersSecondary);

	const manageCreeps = new ManageCreeps();
	manageCreeps.init();

	console.log(`Tick: ${Game.cpu.getUsed().toFixed(2)}`);
	// console.log(`
	//    Time: ${Game.time}
	//    Average: ${performance.monitor(100)} / ${Game.cpu.limit}
	//    Tick: ${Game.cpu.getUsed().toFixed(2)}
	// `);
};
