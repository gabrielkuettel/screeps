class Tower {
	constructor(id) {
		this.id = id;
	}

	run() {
		const tower = Game.getObjectById(this.id);
		console.log(tower);
		if (tower) {
			this.controller(tower);
		} else {
			return `No tower found with ID ${this.id}`;
		}
	}

	controller(tower) {
		const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

		const closestDamagedStructure = tower.pos.findClosestByRange(
			FIND_STRUCTURES,
			{
				filter: structure => structure.hits < structure.hitsMax
			}
		);

		if (closestHostile) {
			tower.attack(closestHostile);
		}

		if (closestDamagedStructure) {
			tower.repair(closestDamagedStructure);
		}
	}
}

module.exports = Tower;

// var tower = Game.getObjectById("TOWER_ID");
// if (tower) {
// 	var closestDamagedStructure = tower.pos.findClosestByRange(
// 		FIND_STRUCTURES,
// 		{
// 			filter: structure => structure.hits < structure.hitsMax
// 		}
// 	);
// 	if (closestDamagedStructure) {
// 		tower.repair(closestDamagedStructure);
// 	}

// 	var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
// 	if (closestHostile) {
// 		tower.attack(closestHostile);
// 	}
// }
