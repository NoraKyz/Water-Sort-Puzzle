import fs from 'fs';
import { Solver } from '../solver/solve.js';
import { Util } from '../../helpers/utils.js'

function generateRandomColors(numberOfColors) {
    const colors = [];
    const isPicked = {};
    while (colors.length < numberOfColors) {
        const randomColor = Util.randomInt(1, 12);
        if (!isPicked[randomColor]) {
            colors.push(randomColor);
            isPicked[randomColor] = true;
        }
    }
    return colors;
}

function generateRandomLevel(numberOfTube, numberOfEmptyTube) {
    const cnt = [];
    const stacks = [];
    const colors = generateRandomColors(numberOfTube - numberOfEmptyTube);

    for (let i = 0; i < numberOfTube - numberOfEmptyTube; i++) {
        cnt.push(0);
    }

    while (stacks.length < numberOfTube - numberOfEmptyTube) {
        const stack = [];

        while (stack.length < 4) {
            const randomIndexColor = Util.randomInt(0, colors.length - 1);
            if (cnt[randomIndexColor] < 4) {
                stack.push(colors[randomIndexColor]);
                cnt[randomIndexColor]++;
            }
        }

        let check = false;
        for (let i = 1; i < 4; i++) {
            if (stack[0] !== stack[i]) {
                check = true;
                break;
            }
        }

        if (check) {
            stacks.push(stack);
        } else {
            return null;
        }
    }

    for (let i = 0; i < numberOfEmptyTube; i++) {
        stacks.push([]);
    }

    return {
        stacks,
        tubeNumber: numberOfTube,
        autoCompleted: false,
        enableHint: true
    };
}

function generateLevels(numberOfLevels) {
    const levels = [];
    let id = 10;
    while (id <= numberOfLevels) {
        let level;

        if (id < 30) {
            if (id % 3 === 0) {
                level = generateRandomLevel(7, 2);
            } else {
                level = generateRandomLevel(9, 2);
            }
        } else if (id < 100) {
            if (id % 3 === 2) {
                level = generateRandomLevel(9, 2);
            } else {
                level = generateRandomLevel(11, 2);
            }
        } else {
            if (id % 2 === 1) {
                level = generateRandomLevel(11, 2);
            } else {
                level = generateRandomLevel(14, 2);
            }
        }

        if (level === null) continue;

        const isSolvable = Solver.solve(new Solver(level.stacks));
        if (isSolvable) {
            levels.push({
                id: id,
                ...level
            });
            id++;
        }
    }
    return levels;
}


const numberOfLevels = 500; // Số lượng level cần sinh
const numberOfTube = 5; // Số lượng ống thủy tinh
const numberOfEmptyTube = 2; // Số lượng ống thủy tinh trống

const levels = generateLevels(numberOfLevels, numberOfTube, numberOfEmptyTube);

//Ghi dữ liệu vào file JSON
const jsonFilePath = 'F:/Dev/Source Code/Fork/water-sort-puzzle/src/iec/level/levels.json';
fs.writeFileSync(jsonFilePath, JSON.stringify(levels, null, 2));

console.log(`Levels generated and saved to ${jsonFilePath}`);
