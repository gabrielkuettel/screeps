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
			creep.say("⚡");
			if (
				creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE
			) {
				// creep.say("🚶🏼 Omw");
				creep.moveTo(creep.room.controller, {
					visualizePathStyle: { stroke: "#ffffff" }
				});
			}
		} else {
			// this.setState({ action: "🧺" });
			const target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
			if (target && creep.pickup(target) === ERR_NOT_IN_RANGE) {
				creep.moveTo(target);
			}
		}
	}
};

module.exports = roleUpgrader;
