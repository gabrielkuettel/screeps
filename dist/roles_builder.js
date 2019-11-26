var roleBuilder = {
	/** @param {Creep} creep **/
	run: function(creep) {
		let { building } = creep.memory;

		if (building && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.building = false;
			creep.say("🔄 harvest");
		}

		if (!building && creep.store.getFreeCapacity() == 0) {
			creep.memory.building = true;
			creep.say("🚧 build");
		}

		if (building) {
			let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if (targets.length) {
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {
						visualizePathStyle: { stroke: "#ffffff" }
					});
					creep.say("Omw");
				}
			}
		} else {
			let sources = creep.room.find(FIND_SOURCES);
			if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0], {
					visualizePathStyle: { stroke: "#ffaa00" }
				});
			}
		}
	}
};

module.exports = roleBuilder;
