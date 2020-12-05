const OUTER_WIDTH = 63.9;
const OUTER_HEIGHT = 129.89;
const OUTER_DEPTH = 3;
const INNER_WIDTH = 62.17;
const INNER_HEIGHT = 128.5;
const INNER_DEPTH = 0.5;

const BRACKET_WIDTH = 40;
const BRACKET_HEIGHT = 112;

const HOLE_THREAD = 3.5;
const HOLE_HEAD = 5;
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

function hole(x, y) {
    return cylinder({
        h: OUTER_DEPTH + INNER_DEPTH,
        r: HOLE_THREAD
    }).translate([x, y]);
}

function holes() {
    return union.apply(union, HOLES.map(h => hole(h[0], h[1])));
}

function main() {
    return difference(
        plate(),
        holes()
    );
}
