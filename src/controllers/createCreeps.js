class createCreep {
	constructor({
		role = "harvester",
		limit = "1",
		abilities = [WORK, CARRY, MOVE],
		location = "Home"
	}) {
		this.role = role;
		this.limit = limit;
		this.abilities = abilities;
		this.location = location;
	}

	spawn() {
		if (this.limit < 0) {
			return null;
		}

		const spawnLocation = Game.spawns[this.location];
		const spawnEnergy = spawnLocation.store[RESOURCE_ENERGY];
		const count = this.count();

		if (count < this.limit && spawnEnergy >= 300) {
			const newName = `${this.role}-${Game.time}`;
			return spawnLocation.spawnCreep(this.abilities, newName, {
				memory: { role: this.role }
			});
		}

		if (count > this.limit) {
			const excessCreeps = this.ref().slice(0, this.limit);
			excessCreeps.forEach(creep => creep.suicide());
		}

		return `We have ${count} / ${this.limit} ${this.role}(s)`;
	}

	ref() {
		const creeps = _.filter(
			Game.creeps,
			creep => creep.memory.role === this.role
		);
		return creeps;
	}

	count() {
		return this.ref().length;
	}
}

module.exports = createCreep;
