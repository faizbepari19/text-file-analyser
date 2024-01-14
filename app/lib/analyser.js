const { TASK_STATUS } = require('../lib/constants')

module.exports = {
    analyseV2: (operation) => {
        const wordFrequency = {};
        const uniqueWordsSet = new Set();
        let totalWords = 0;

        switch (operation) {
            case 1: {
                return function (data) {
                    const words = data.split(/\s+/);
                    const nonEmptyWords = words.filter(word => word !== '');
                    totalWords += nonEmptyWords.length;
                    return totalWords
                }

            }

            case 2: {
                return function (data) {
                    const words = data.toLowerCase().replace(/[.,]/g, '').split(/\s+/);
                    const nonEmptyWords = words.filter(word => word !== '');
                    nonEmptyWords.forEach((word) => {
                        uniqueWordsSet.add(word);
                    });
                    return uniqueWordsSet
                }

            }

            case 3: {
                return function (data) {
                    const words = data.toLowerCase().replace(/[.,]/g, '').split(/\s+/);
                    // Count the frequency of each word
                    words.forEach((word) => {
                        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
                    });

                    return wordFrequency
                }
            }
        }

    },

    processFinalResults: (processedData, operation, topK) => {
        let analysedData = {
            result: null,
            status: TASK_STATUS.PENDING
        }
        try {
            switch (operation) {
                case 1: {
                    analysedData.result = processedData;
                    analysedData.status = TASK_STATUS.COMPLETE;
                    return analysedData;
                }

                case 2: {
                    analysedData.result = processedData.size;
                    analysedData.status = TASK_STATUS.COMPLETE;
                    return analysedData;
                }

                case 3: {
                    analysedData.result = findTopKWords(processedData, topK);
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

const findTopKWords = (wordFreq, k) => {
    const wordFreqArray = Object.entries(wordFreq).map(entry => {
        const [word, frequency] = entry;
        return { word, frequency };
    });

    wordFreqArray.sort((a, b) => b.frequency - a.frequency);
    const topKWords = wordFreqArray.slice(0, k).map(topWord => topWord.word).join(',');

    return topKWords;
}
