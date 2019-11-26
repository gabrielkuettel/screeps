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

		if (this.count() < this.limit) {
			const newName = `${this.role}-${Game.time}`;
			const status = spawnLocation.spawnCreep(this.abilities, newName, {
				memory: { role: this.role }
			});
			console.log(`Spawn queue: ${this.role}. Status: ${status}`);
		}

		if (this.count() > this.limit) {
			const excessCreeps = this.ref().slice(0, this.limit);
			excessCreeps.forEach(creep => creep.suicide());
		}

		return console.log(
			`We have ${this.count()} / ${this.limit} ${this.role}(s)`
		);
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
