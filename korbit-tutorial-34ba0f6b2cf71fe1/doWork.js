import { processWork } from 'korbit-tutorial-34ba0f6b2cf71fe1/util.js';

function doSomeWork(workToBeDone) {
    let finishedWork = []
    workToBeDone.forEach((workItem) => finishedWork.push(processWork(workItem)))
    return finishedWork
}

let workToBeDone = ["these", "are", "some", "words", null]
console.log(doSomeWork(workToBeDone))