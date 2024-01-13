module.exports = {

    /**
     * 
     * @param {*} data - Object to be validated
     * @param {*} keys - array of keys to be validated
     * @returns true or throw error
     */
    validation: (data, keys) => {
        if (keys.length != 0) {
            for (index in keys) {

                if (!data.hasOwnProperty(keys[index])) {
                    throw {
                        message: keys[index] + " is Mandatory",
                        code: 400
                    };
                } else if (Array.isArray(data[keys[index]])) {
                    if (data[keys[index]].length == 0) {
                        throw {
                            message: keys[index] + " can not be empty",
                            code: 400
                        };
                    }
                } else {
                    if (
                        data[keys[index]] === "" ||
                        data[keys[index]] == undefined ||
                        data[keys[index]] == "undefined" ||
                        data[keys[index]] == null ||
                        new RegExp("^\\s+$").test(data[keys[index]])
                    ) {
                        throw {
                            message: keys[index] + " can not be empty",
                            code: 400
                        };
                    }

                }

            }
        } else {
            throw {
                message: "Input empty",
                code: 400
            };
        }
        return true
    }
}