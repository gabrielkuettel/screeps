var roleBuilder = {
	/** @param {Creep} creep **/
	run: function(creep) {
		let { building } = creep.memory;

		if (building && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.building = false;
		}

		if (!building && creep.store.getFreeCapacity() == 0) {
			creep.memory.building = true;
		}

		if (building) {
			creep.say("🚧 build");
			let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if (targets.length) {
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.say(`🚶🏼${targets[0].pos.x}, ${targets[0].pos.y}`);
					creep.moveTo(targets[0], {
						visualizePathStyle: { stroke: "#ffffff" }
					});
				}
			}
		} else {
			creep.say("🔄 harvest");
			let sources = creep.room.find(FIND_SOURCES);
			if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.say(`🚶🏼${sources[0].pos.x}, ${sources[0].pos.y}`);
				creep.moveTo(sources[0], {
					visualizePathStyle: { stroke: "#ffaa00" }
				});
			}
		}
	}
};

module.exports = roleBuilder;
