import fs from 'fs';
const questions = fs.readFileSync("data/questions.txt",'utf-8').split('\n').filter(Boolean);
const answers: Array<string> = fs.readFileSync("data/answers.txt",'utf-8').split('\n').filter(Boolean);
export function getQuestions(n=1): string[] {
    const qs = [];
    for (let index = 0; index < n; index++) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        qs.push(questions[randomIndex]);
    }
    return qs;
}
export function getAnswers(n=1): string[] {
    const as: Array<string> = [];
    for (let index = 0; index < n; index++) {
        const randomIndex = Math.floor(Math.random() * answers.length);
        as.push(answers[randomIndex]);
    }
    return as;
}