class Performance {
	constructor() {}

	monitor(limit = 100) {
		if (!Memory.performance) {
			Memory.performance = [];
		} else {
			const usedCpu = Game.cpu.getUsed();

			if (Memory.performance.length >= limit) {
				Memory.performance = Memory.performance.slice(-(limit - 1));
				Memory.performance.push(usedCpu);
			} else {
				Memory.performance.push(usedCpu);
			}

			const sum = Memory.performance.reduce((a, b) => a + b);
			const average = (sum / Memory.performance.length).toFixed(2);
			return average;
		}
	}
}

module.exports = Performance;
