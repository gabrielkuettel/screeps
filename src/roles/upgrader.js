var roleUpgrader = {
	/** @param {Creep} creep **/
	run: function(creep) {
		//termination
		if (creep.memory.terminate) {
			creep.say("💀");
			const closestSpawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
			if (closestSpawn.recycleCreep(creep) === ERR_NOT_IN_RANGE) {
				creep.memory.terminate = true;
				creep.moveTo(closestSpawn, {
					visualizePathStyle: { stroke: "#FF0000" }
				});
			}
			return;
		}

		if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.upgrading = false;
		}
		if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
			creep.memory.upgrading = true;
		}

		if (creep.memory.upgrading) {
			creep.say("⚡ upgrade");
			if (
				creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE
			) {
				creep.say("🚶🏼 Omw");
				creep.moveTo(creep.room.controller, {
					visualizePathStyle: { stroke: "#ffffff" }
				});
			}
		} else {
			creep.say("🔄 harvest");
			var sources = creep.room.find(FIND_SOURCES);
			if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
				creep.say("🚶🏼 Omw");
				creep.moveTo(sources[1], {
					visualizePathStyle: { stroke: "#ffaa00" }
				});
			}
		}
	}
};

module.exports = roleUpgrader;
