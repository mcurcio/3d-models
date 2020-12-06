const OUTER_WIDTH = 67.9; // 63.9;
const OUTER_HEIGHT = 133.89; // 129.89;
const OUTER_DEPTH = 3;
const OUTER_WALL = 4;
const OUTER_WALL_DEPTH = 3;
const INNER_WIDTH = 60; // 62.17;
const INNER_HEIGHT = 125; // 128.5;
const INNER_DEPTH = 0.5;

const BRACKET_WIDTH = 40;
const BRACKET_HEIGHT = 112;
const BRACKET_DEPTH = 3;
const BRACKET_WALL = 5;
const BRACKET_WALL_OFFSET = 2;

const HOLE_THREAD = 3.5 / 2;
const HOLE_HEAD = 5 / 2;
const HOLE_HEAD_DEPTH = 2;

const HOLES = [
	[0, OUTER_HEIGHT / 2 - 13.37], // top plate
	[0, OUTER_HEIGHT / 2 - 38], // top plate
	[0, 0 - (OUTER_HEIGHT / 2) + 13.37], // bottom plate
	[0, 0 - (OUTER_HEIGHT / 2) + 38], // bottom plate
	[0 - (BRACKET_WIDTH / 2) + 8, BRACKET_HEIGHT / 2 - 15], // top left bracket
	[BRACKET_WIDTH / 2 - 8, BRACKET_HEIGHT / 2 - 15], // top right bracket
	[0, 0 - (BRACKET_HEIGHT / 2) + 15], // bottom bracket
];

const PLATE_DEPTH = OUTER_DEPTH + INNER_DEPTH;

function plate() {
    return union(
        cube({
            size: [OUTER_WIDTH, OUTER_HEIGHT, OUTER_DEPTH],
            center: [true, true, false]
        }),
        cube({
            size: [INNER_WIDTH, INNER_HEIGHT, INNER_DEPTH],
            center: [true, true, false]
        }).translate([0, 0, OUTER_DEPTH])
    )
}

function outerWall() {
    return difference(
        cube({
            size: [OUTER_WIDTH, OUTER_HEIGHT, OUTER_WALL_DEPTH],
            center: [true, true, false]
        }),
        cube({
            size: [OUTER_WIDTH - OUTER_WALL, OUTER_HEIGHT - OUTER_WALL, OUTER_WALL_DEPTH],
            center: [true, true, false]
        })
    ).translate([0, 0, OUTER_DEPTH]).setColor([255, 0, 0]);
}

function bracket() {
    const inner = cube({
        size: [BRACKET_WIDTH + BRACKET_WALL_OFFSET, BRACKET_HEIGHT + BRACKET_WALL_OFFSET, PLATE_DEPTH + BRACKET_DEPTH],
        center: [true, true, false]
    }).setColor([0, 255, 0]);
    
    const outer = cube({
        size: [BRACKET_WIDTH + BRACKET_WALL + BRACKET_WALL_OFFSET, BRACKET_HEIGHT + BRACKET_WALL + BRACKET_WALL_OFFSET, PLATE_DEPTH + BRACKET_DEPTH],
        center: [true, true, false]
    }).setColor([0, 255, 0]);
    
    const bottomHole = cube({
        size: [BRACKET_WIDTH / 2, BRACKET_HEIGHT, PLATE_DEPTH + BRACKET_DEPTH],
        center: [true, true, false]
    }).translate([0, -BRACKET_WALL]).setColor([0, 0, 255]);
    
    return difference(outer, inner, bottomHole);
}

function hole(x, y, r=HOLE_THREAD) {
    return cylinder({
        h: OUTER_DEPTH + INNER_DEPTH,
        r
    }).translate([x, y]);
}

function holes() {
    return union.apply(union, HOLES.map(h => hole(h[0], h[1])));
}

function main() {
    return difference(
        union(plate(), outerWall()),
        holes(),
        hole(0, 0, 15), hole(0, BRACKET_HEIGHT/8, 10), hole(0, 0-(BRACKET_HEIGHT/8), 10)
    );
}
