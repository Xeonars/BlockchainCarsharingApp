const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const config = {
    language: 'Solidity',
    sources: {
        'contract.sol': {
            content: fs.readFileSync(
                path.resolve(__dirname, 'contracts', 'contract.sol'),
                'utf8',
            ),
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

function compileSources() {
    try {
        const input = JSON.stringify(config);
        return JSON.parse(solc.compile(input));
    } catch (e) {
        console.log(e);
    }
}

function writeOutput(compiled) {
    fs.ensureDirSync(buildPath);

    for (let contractName in compiled.contracts['contract.sol']) {
        fs.outputJsonSync(
            path.resolve(buildPath, contractName + '.json'),
            compiled.contracts['contract.sol'][contractName],
            { spaces: 4 },
        );
    }
}

const compiled = compileSources();
writeOutput(compiled, buildPath);
