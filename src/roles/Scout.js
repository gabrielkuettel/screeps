const Creep = require("roles_Base");

// inherits
// this.creep, this.state
// this.recycle(), this.logger(), this.setState()

class Scout extends Creep {
	constructor(creep, newState = null) {
		super(creep);
		this.newState = newState;
	}

	run() {
		this.controller();
		this.setState(this.newState);
	}

	controller() {
		const { terminate, log, scouting, talk } = this.state;

		if (log) {
			this.logger(["scouting", "log"]);
		}

		if (talk) {
			this.talk();
		}

		if (terminate === true) {
			return this.recycle();
		}

		this.setState({ scouting: true });

		if (scouting) {
			this.scout();
		}
	}

	scout() {
		this.setState({ action: "⚜️" });
		// const scoutLocation = this.creep.pos.findClosestByPath(FIND_MY_SPAWNS);
		// if (scoutLocation) {
		// 	this.creep.moveTo(scoutLocation);
		// }
	}
}

module.exports = Scout;
