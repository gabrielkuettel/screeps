const Creep = require("roles_Creep");

// inherits
// this.creep, this.state
// this.recycle(), this.logger(), this.setState()

class Repairer extends Creep {
	constructor(creep, newState = null) {
		super(creep);
		this.newState = newState;
	}

	run() {
		this.controller();
		this.setState(this.newState);
	}

	controller() {
		const { terminate, log, repairing, freeCapacity, talk } = this.state;

		if (log) {
			this.logger([
				"log",
				"terminate",
				"freeCapacity",
				"repairing",
				"action"
			]);
		}

		if (talk) {
			this.talk();
		}

		if (terminate === true) {
			return this.recycle();
		}

		if (freeCapacity > 0) {
			this.setState({ repairing: false });
		} else if (freeCapacity === 0) {
			this.setState({ repairing: true });
		}

		if (repairing) {
			return this.repair();
		}

		if (!repairing) {
			return this.harvest();
		}
	}

	repair() {
		this.setState({ action: "🔧" });
		const damagedStructure = this.creep.pos.findClosestByPath(
			FIND_STRUCTURES,
			{
				filter: structure => {
					return structure.hits < structure.hitsMax;
				}
			}
		);

		if (damagedStructure) {
			if (this.creep.repair(damagedStructure) === ERR_NOT_IN_RANGE) {
				this.creep.moveTo(damagedStructure);
			}
		}
	}
}

module.exports = Repairer;
