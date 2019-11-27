class Creep {
	constructor(creep) {
		this.creep = creep;
		this.state = creep.memory;
		this.state.freeCapacity = this.creep.store.getFreeCapacity();
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
