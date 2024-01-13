const path = require('path');

module.exports = {
    UPLOAD_DIR: path.join(__dirname, '../../uploads/'),

    OPERATION_TYPES: {
        1: 'Total words',
        2: 'Total unique words',
        3: 'Topmost',
        'Topmost': 3,
        'Total unique words': 2,
        'Total words': 1
    }
}