// const DICKTIONARY = [
//     {
//         char: "ア",
//         spelling: "a"
//     },
//     {
//         char: "イ",
//         spelling: "i"
//     },
//     {
//         char: "ウ",
//         spelling: "u"
//     },
//     {
//         char: "エ",
//         spelling: "e"
//     },
//     {
//         char: "オ",
//         spelling: "o"
//     },
// ];

const DICKTIONARY = [
    {
        char: "ა",
        spelling: "а"
    },
    {
        char: "ბ",
        spelling: "б"
    },
    {
        char: "გ",
        spelling: "г"
    },
    {
        char: "დ",
        spelling: "д"
    },
    {
        char: "ე",
        spelling: "е"
    },
    {
        char: "ვ",
        spelling: "в"
    },
    {
        char: "ზ",
        spelling: "з"
    },
    {
        char: "თ",
        spelling: "тэ"
    },
    {
        char: "ი",
        spelling: "и"
    },
    {
        char: "კ",
        spelling: "кэ"
    },
    {
        char: "ლ",
        spelling: "л"
    },
    {
        char: "მ",
        spelling: "м"
    },
    {
        char: "ნ",
        spelling: "н"
    },
    {
        char: "ო",
        spelling: "о"
    },
    {
        char: "პ",
        spelling: "п"
    },
    {
        char: "ჟ",
        spelling: "ж"
    },
    {
        char: "რ",
        spelling: "р"
    },
    {
        char: "ს",
        spelling: "с"
    },
    {
        char: "ტ",
        spelling: "т"
    },
    {
        char: "უ",
        spelling: "у"
    },
    {
        char: "ფ",
        spelling: "пэ"
    },
    {
        char: "ქ",
        spelling: "к"
    },
    {
        char: "ღ",
        spelling: "гэ"
    },
    {
        char: "ყ",
        spelling: "кʼ"
    },
    {
        char: "შ",
        spelling: "ш"
    },
    {
        char: "ჩ",
        spelling: "ч"
    },
    {
        char: "ც",
        spelling: "тс"
    },
    {
        char: "ძ",
        spelling: "дз"
    },
    {
        char: "წ",
        spelling: "ц"
    },
    {
        char: "ჭ",
        spelling: "чʼ"
    },
    {
        char: "ხ",
        spelling: "х"
    },
    {
        char: "ჯ",
        spelling: "джэ"
    },
    {
        char: "ჰ",
        spelling: "хʼ"
    },
];

// const DICKTIONARY = [
//     {
//         char: ":3",
//         spelling: "myau"
//     },
//     {
//         char: "O_o",
//         spelling: "o m g"
//     },
//     {
//         char: "__̴ı̴̴̡̡̡ ̡͌l̡̡̡ ̡͌l̡*̡̡ ̴̡ı̴̴̡ ̡̡͡|̲̲̲͡͡͡ ̲▫̲͡ ̲̲̲͡͡π̲̲͡͡ ̲̲͡▫̲̲͡͡ ̲|̡̡̡ ̡ ̴̡ı̴̡̡ ̡͌l̡̡̡̡.___",
//         spelling: "house"
//     },
//     {
//         char: "٩(̾●̮̮̃̾•̃̾)۶",
//         spelling: "monster"
//     },
//     {
//         char: "@('_')@",
//         spelling: "monkey"
//     }
// ]

export function getRandomElementFromArray(arr = []) {
    const len = arr.length;
    const index = Math.round(Math.random() * (len - 1));
    const result = arr[index] || {};
    return result;
}

export function getWhatcharData() {
    const answerChar = getRandomElementFromArray(DICKTIONARY);
    const wrongChars = [];

    let att = 0;
    const ignoredChars = [answerChar.char];
    const maxIgChars = 3;

    while (true) {
        if (att === maxIgChars) {
            break;
        }
        let stop = false;
        const _char = getRandomElementFromArray(DICKTIONARY);
        
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

