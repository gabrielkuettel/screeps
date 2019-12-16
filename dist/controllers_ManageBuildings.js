class ManageBuildings {
	constructor() {}

	createRoads() {
		for (let i in Game.spawns) {
			const spawn = Game.spawns[i];
			const room = spawn.room;
			const sources = spawn.room.find(FIND_SOURCES);

			sources.forEach(source => {
				const paths = room.findPath(spawn.pos, source.pos);
				paths.forEach(path => {
					room.createConstructionSite(path.x, path.y, STRUCTURE_ROAD);
				});
			});
			// console.log(sources);
		}
	}
}

module.exports = ManageBuildings;
