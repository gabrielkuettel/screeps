var roleHarvester = require("roles_harvester");
var roleUpgrader = require("roles_upgrader");
var roleBuilder = require("roles_builder");

module.exports.loop = function() {
	console.log("I'm working!!");
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
	for (var name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log("Clearing non-existing creep memory:", name);
		}
	}

	var harvesters = _.filter(
		Game.creeps,
		creep => creep.memory.role == "harvester"
	);
	console.log("Harvesters: " + harvesters.length);

	if (harvesters.length < 3) {
		var newName = "Harvester" + Game.time;
		console.log("Spawning new harvester: " + newName);
		Game.spawns["Home"].spawnCreep([WORK, CARRY, MOVE], newName, {
			memory: { role: "harvester" }
		});
	}

	var builders = _.filter(
		Game.creeps,
		creep => creep.memory.role == "builder"
	);
	console.log("Builders: " + builders.length);

	if (builders.length < 2) {
		var newName = "Builder" + Game.time;
		console.log("Spawning new builder: " + newName);
		Game.spawns["Home"].spawnCreep([WORK, CARRY, MOVE], newName, {
			memory: { role: "builder" }
		});
	}

	var upgraders = _.filter(
		Game.creeps,
		creep => creep.memory.role == "upgrader"
	);
	console.log("Upgraders: " + upgraders.length);

	if (upgraders.length < 2) {
		var newName = "Upgrader" + Game.time;
		console.log("Spawning new upgrader: " + newName);
		Game.spawns["Home"].spawnCreep([WORK, CARRY, MOVE], newName, {
			memory: { role: "upgrader" }
		});
	}

	if (Game.spawns["Home"].spawning) {
		var spawningCreep = Game.creeps[Game.spawns["Home"].spawning.name];
		Game.spawns["Home"].room.visual.text(
			"🛠️" + spawningCreep.memory.role,
			Game.spawns["Home"].pos.x + 1,
			Game.spawns["Home"].pos.y,
			{ align: "left", opacity: 0.8 }
		);
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
