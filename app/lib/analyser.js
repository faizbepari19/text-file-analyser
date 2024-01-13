module.exports = {
    analyse: (data, operation, k) => {
        switch (operation) {
            case 1: {
                return countWords(data)
            }

            case 2: {
                return countUniqueWords(data)
            }

            case 3: {
                return findTopKWords(data, k)
            }

            default: {
                throw {
                    message: 'Invalid Operation'
                }
            }
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
