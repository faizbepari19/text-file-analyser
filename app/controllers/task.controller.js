module.exports = {
    /**
   * Use to start an analysis
   * @param {*} req 
   * @param {*} res 
   */
    startAnalysis: async (req, res) => {
        res.status(201).send({
            message: "Analysis completed"
        })
    },

    /**
   * Use to get saved analysis details
   * @param {*} req 
   * @param {*} res 
   */
    getAnalysis: async (req, res) => {
        res.status(200).send({
            message: "Task details"
        })
    }
}