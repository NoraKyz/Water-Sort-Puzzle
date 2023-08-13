import fs from 'fs';
import { Solver } from '../solver/solve.js';
import { Util } from '../../helpers/utils.js'

function generateRandomColors(numberOfColors) {
    const colors = [];
    const isPicked = {};
    while(colors.length < numberOfColors) {
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

    while(stacks.length < numberOfTube - numberOfEmptyTube) {
        const stack = [];

        while(stack.length < 4) {   
            const randomColor = Util.randomInt(0, colors.length-1);
            if (cnt[randomColor] < 4) {
                stack.push(colors[randomColor]);
                cnt[randomColor]++;
            }
        }

        let check = 1;
        for(let i = 1; i < stack.length; i++) {
            if (stack[i] === stack[0]) {
                check++;
            }
        }

        ///console.log(check < 4);

        if(check < 4) {
            stacks.push(stack);
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

function generateLevels(numberOfLevels, numberOfTube, numberOfEmptyTube) {
    const levels = [];
    let id = 0;
    while(levels.length < numberOfLevels) {
        const level = generateRandomLevel(numberOfTube, numberOfEmptyTube);
        const isSolvable = Solver.solve(new Solver(level.stacks));
        if(isSolvable) {
            levels.push({
                id: id,
                ...level
            });
        }
        id++;
    }
    return levels;
}

const numberOfLevels = 80; // Số lượng level cần sinh
const numberOfTube = 9; // Số lượng ống thủy tinh
const numberOfEmptyTube = 2; // Số lượng ống thủy tinh trống

const levels = generateLevels(numberOfLevels, numberOfTube, numberOfEmptyTube);

//Ghi dữ liệu vào file JSON
const jsonFilePath = 'F:/Dev/Source Code/Fork/water-sort-puzzle/src/iec/level/levels.json';
fs.writeFileSync(jsonFilePath, JSON.stringify(levels, null, 2));

console.log(`Levels generated and saved to ${jsonFilePath}`);
