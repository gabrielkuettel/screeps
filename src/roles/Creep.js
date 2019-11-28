class Creep {
	constructor(creep) {
		this.creep = creep;
		this.state = creep.memory;
		this.state.freeCapacity = this.creep.store.getFreeCapacity();
		this.state.usedCapacity = this.creep.store.getUsedCapacity();
	}

	harvest(index = 0) {
		this.setState({ action: "⛏️" });
		const sources = this.creep.room.find(FIND_SOURCES);
		if (this.creep.harvest(sources[index]) == ERR_NOT_IN_RANGE) {
			this.creep.moveTo(sources[index], {
				visualizePathStyle: {
					stroke: "#00babe",
					opacity: 0.9
				}
			});
		}
	}

	haul() {
		this.setState({ action: "🧺" });
		const target = this.creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
		if (target && this.creep.pickup(target) === ERR_NOT_IN_RANGE) {
			this.creep.moveTo(target);
		} else {
			this.setState({ action: undefined });
		}
	}

	pickupFromBase(base, resource) {
		this.setState({ action: "🔋" });
		if (this.creep.withdraw(base, resource) == ERR_NOT_IN_RANGE) {
			return this.creep.moveTo(base);
		}
	}

	deposit(index = 0) {
		this.setState({ action: "➡️" });
		const targets = this.creep.room.find(FIND_STRUCTURES, {
			filter: structure => {
				return (
					(structure.structureType == STRUCTURE_EXTENSION ||
						structure.structureType == STRUCTURE_SPAWN ||
						structure.structureType == STRUCTURE_TOWER) &&
					structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
				);
			}
		});

		if (targets.length > 0) {
			if (
				this.creep.transfer(targets[index], RESOURCE_ENERGY) ==
				ERR_NOT_IN_RANGE
			) {
				this.creep.moveTo(targets[index]);
			}
		} else {
			this.setState({ action: undefined });
			this.creep.moveTo(targets[index]);
		}

		return targets[index];
	}

	drop(resource) {
		this.setState({ action: "💧" });
		if (resource) {
			this.creep.drop(resource);
		} else {
			for (const resourceType in this.creep.carry) {
				this.creep.drop(resourceType);
			}
		}
	}

	recycle() {
		this.setState({ action: "💀" });
		const { name } = this.creep;

		const closestSpawn = this.creep.pos.findClosestByPath(FIND_MY_SPAWNS);
		if (closestSpawn.recycleCreep(this.creep) === ERR_NOT_IN_RANGE) {
			this.creep.moveTo(closestSpawn, {
				visualizePathStyle: { stroke: "#FF0000" }
			});
			return 0;
		}
		return 1;
	}

	talk() {
		const { action = "🤖" } = this.state;
		this.creep.say(action);
	}

	logger(options) {
		console.log(`--- ${this.creep.name} ---`);
		for (let option of options) {
			console.log(`${option}: ${this.state[option]}`);
		}
	}

	setState(object) {
		if (object) {
			for (let property in object) {
				this.state[property] = object[property];
			}
			return this.state;
		}
		return this.state;
	}
}

module.exports = Creep;
