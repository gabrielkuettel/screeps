class ManageBuildings {
	constructor() {}

	createRoads() {
		for (let i in Game.spawns) {
			const spawn = Game.spawns[i];
			const room = spawn.room;
			const sources = spawn.room.find(FIND_SOURCES);

			sources.forEach(source => {
				const paths = room.findPath(spawn.pos, source.pos);
				for (let i = 0; i < paths.length - 1; i++) {
					room.createConstructionSite(
						paths[i].x,
						paths[i].y,
						STRUCTURE_ROAD
					);
				}
			});
		}
	}
}

module.exports = ManageBuildings;
