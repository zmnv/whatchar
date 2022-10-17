import { getRandomElementFromArray } from "./random";

export function getWhatcharData(dic) {
    const answerChar = getRandomElementFromArray(dic);
    const wrongChars = [];

    let att = 0;
    const ignoredChars = [answerChar.char];
    const maxIgChars = 3;

    while (true) {
        if (att === maxIgChars) {
            break;
        }
        let stop = false;
        const _char = getRandomElementFromArray(dic);
        
        ignoredChars.forEach(e => {
            if (_char.char === e) {
                stop = true;
            }
        });

        if (stop) {
            continue;
        }

        att += 1;
        ignoredChars.push(_char.char);
        wrongChars.push(_char);
    }

    // console.log('ignoredChars', ignoredChars);
    // console.log('---')
    // console.log('Answer Char:', answerChar);
    // console.log('Wrong Chars:', wrongChars);
    return {
        answer: answerChar,
        wrong: wrongChars,
        variants: [answerChar, ...wrongChars],
    }
}

