var roleHarvester = {
	/** @param {Creep} creep **/
	run: function(creep) {
		const sources = creep.room.find(FIND_SOURCES);
		const targets = creep.room.find(FIND_STRUCTURES, {
			filter: structure => {
				return (
					(structure.structureType == STRUCTURE_EXTENSION ||
						structure.structureType == STRUCTURE_SPAWN ||
						structure.structureType == STRUCTURE_TOWER) &&
					structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
				);
			}
		});

		console.log(`
         sources ${sources.length}
         targets ${targets.length}
      `);

		if (creep.store.getFreeCapacity() > 0) {
			creep.say("⛏️ Mine");
			if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
				creep.say("🚶🏼 Omw");
				creep.moveTo(sources[1], {
					visualizePathStyle: { stroke: "#ffaa00" }
				});
			}
		} else {
			creep.say("➡️ Deliver");
			if (targets.length > 0) {
				if (
					creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
				) {
					creep.moveTo(targets[0], {
						visualizePathStyle: { stroke: "#ffffff" }
					});
				}
			}
		}
	}
};

module.exports = roleHarvester;
