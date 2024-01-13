const { TASK_STATUS } = require('../lib/constants')

module.exports = {
    analyse: (data, operation, k) => {
        let analysedData = {
            result: null,
            status: TASK_STATUS.PENDING
        }
        try {
            switch (operation) {
                case 1: {
                    analysedData.result = countWords(data);
                    analysedData.status = TASK_STATUS.COMPLETE;
                    return analysedData;
                }

                case 2: {
                    analysedData.result = countUniqueWords(data);
                    analysedData.status = TASK_STATUS.COMPLETE;
                    return analysedData;
                }

                case 3: {
                    analysedData.result = findTopKWords(data, k);
                    analysedData.status = TASK_STATUS.COMPLETE;
                    return analysedData;
                }

                default: {
                    analysedData.status = TASK_STATUS.ERROR;
                    return analysedData;
                }
            }
        } catch (err) {
            analysedData.status = TASK_STATUS.ERROR;
            return analysedData;
        }

    }
}


const countWords = (data) => {
    const words = data.split(/\s+/);
    const nonEmptyWords = words.filter(word => word !== '');
    return nonEmptyWords.length;
}

const countUniqueWords = (data) => {
    const words = data.split(/\s+/);
    const uniqueWords = new Set();
    words.forEach((word) => {
        const lowerCase = word.toLowerCase();
        uniqueWords.add(lowerCase);
    });

    return uniqueWords.size;
}

const findTopKWords = (data, k) => {
    const words = data.split(/\s+/);
    const wordFreq = words.reduce((acc, word) => {
        const lowerCase = word.toLowerCase();
        acc[lowerCase] = (acc[lowerCase] || 0) + 1;
        return acc;
    }, {});


    const wordFreqArray = Object.entries(wordFreq).map(entry => {
        const [word, frequency] = entry;
        return { word, frequency };
    });

    wordFreqArray.sort((a, b) => b.frequency - a.frequency);
    const topKWords = wordFreqArray.slice(0, k).map(topWord => topWord.word).join(',');

    return topKWords;
}
