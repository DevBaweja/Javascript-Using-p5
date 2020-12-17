class Node {
    constructor(id, energy, toBase, toNode) {
        this.id = id;
        this.energy = energy;
        this.toBase = toBase;
        this.toNode = toNode;
    }
}

class Chromosome {
    constructor() {
        this.fitness = 0;
        this.cummulativeHeadEnergy = 0;
        this.cummulativeHeadToBase = 0;
        this.cummulativeNodeToHead = 0;
        this.numberOfNodes = numberOfNodes;
    }

    getBinary = (probability = 0.95) => {
        const p = Math.random();
        if (p > probability) return 1;
        else return 0;
    };

    generateChromosome = () => {
        let chromosome = {};
        for (let index = 0; index < this.numberOfNodes; index++) chromosome[index] = this.getBinary();
        this.chromosome = chromosome;
        this.generateValidHeads();
    };

    generateValidHeads = () => {
        let validHeads = [];
        for (let index = 0; index < this.numberOfNodes; index++) if (this.isHead(index)) validHeads.push(index);
        this.validHeads = validHeads;
    };

    isHead = nodeId => this.chromosome[nodeId] == 1;

    generateNextChromosome = chromosome => {
        this.chromosome = chromosome;
        this.generateValidHeads();
    };

    generateFitness = () => {
        for (let nodeId in this.chromosome) {
            if (this.isHead(nodeId)) {
                this.cummulativeHeadEnergy += nodes[nodeId].energy;
                this.cummulativeHeadToBase += nodes[nodeId].toBase;
            }
            if (!this.isHead(nodeId)) {
                let toNodeEnergy = Number.POSITIVE_INFINITY;
                for (let head of this.validHeads) {
                    if (nodes[nodeId].toNode[head] < toNodeEnergy) {
                        toNodeEnergy = nodes[nodeId].toNode[head];
                    }
                }
                this.cummulativeNodeToHead += toNodeEnergy;
            }
        }
        this.fitness = parseFloat(
            (this.cummulativeHeadEnergy / (this.cummulativeNodeToHead + this.cummulativeHeadToBase)).toFixed(2)
        );
        return this.fitness;
    };

    crossover = chromosome => {
        let newChromosome = {};
        for (let index = 0; index < this.numberOfNodes; index++)
            if (index % 2 == 0) newChromosome[index] = this.chromosome[index];
            else newChromosome[index] = chromosome[index];
        return newChromosome;
    };

    flip = index => {
        if (this.isHead(index)) this.chromosome[index] = 0;
        else this.chromosome[index] = 1;
    };
    mutate = () => {
        const r = Math.floor(random(0, this.numberOfNodes - 1));
        this.flip(r);
        this.generateValidHeads();
        return this;
    };
}

const random = (min, max) => parseFloat((Math.random() * (max - min + 1) + min).toFixed(2));

const generateNodes = () => {
    const nodes = {};

    for (let index = 0; index < numberOfNodes; index++) {
        const energy = random(2000, 3000);
        const toBase = random(800, 1000);
        const toNode = {};
        for (let j = 0; j < numberOfNodes; j++) {
            if (index !== j) toNode[j] = random(1, 10);
        }
        const node = new Node(index, energy, toBase, toNode);
        nodes[index] = node;
    }
    return nodes;
};

const generateChromosomes = () => {
    const chromosomes = {};
    for (let index = 0; index < populations; index++) {
        const chromosome = new Chromosome();
        chromosome.generateChromosome();
        chromosomes[index] = chromosome;
    }
    return chromosomes;
};

const fitness = () => {
    const fitnessChromosome = {};
    // Initial Population
    for (let index = 0; index < populations; index++) fitnessChromosome[index] = chromosomes[index].generateFitness();
    return fitnessChromosome;
};
const selection = (fitnessChromosome, number = parents) => {
    const parentsChromosomes = {};
    Object.keys(fitnessChromosome)
        .sort((a, b) => fitnessChromosome[b] - fitnessChromosome[a])
        .slice(0, number)
        .forEach((item, index) => (parentsChromosomes[index] = chromosomes[item]));
    return parentsChromosomes;
};

const crossover = parentsChromosomes => {
    const offspringsChromosomes = {};
    let index = 0;
    for (let i = 0; i < parents; i++)
        for (let j = i + 1; j < parents; j++) {
            const chromosome = new Chromosome();
            chromosome.generateNextChromosome(parentsChromosomes[i].crossover(parentsChromosomes[j].chromosome));
            offspringsChromosomes[index++] = chromosome;
        }
    return offspringsChromosomes;
};

const mutation = offspringsChromosomes => {
    const mutatedChromosomes = {};
    for (let index = 0; index < populations; index++) mutatedChromosomes[index] = offspringsChromosomes[index].mutate();
    return mutatedChromosomes;
};

const avg = fitnessChromosome => {
    let average = 0;
    Object.keys(fitnessChromosome).forEach(key => (average += fitnessChromosome[key]));
    average /= populations;
    return average;
};

const numberOfNodes = 100;
const populations = 21;
const parents = 7;
let generations = 5;
let nodes = {};
let chromosomes = {};

const init = () => {
    console.log('Genetic Algorithm');

    nodes = generateNodes();
    chromosomes = generateChromosomes();

    while (generations--) {
        // Fitness
        const fitnessChromosome = fitness(chromosomes);
        // const avgFitness = avg(fitnessChromosome);
        // Selection
        const parentsChromosomes = selection(fitnessChromosome);

        // CrossOver
        const offspringsChromosomes = crossover(parentsChromosomes);

        // Mutation
        const mutatedChromosomes = mutation(offspringsChromosomes);
        // Making offstring chromosomes as next generation
        chromosomes = mutatedChromosomes;
    }
    // Final Population
    const fitnessChromosome = fitness(chromosomes);
    // console.log(fitnessChromosome);

    // Selection
    const fittestChromosome = selection(fitnessChromosome, 1);
    console.log(fittestChromosome);
};

init();
