var moment = require('moment');
module.exports = {
  createdAt: {
    type: Date,
    type: Date, 
    default: Date.now, 
    get: v => moment(v).format('YYYY-MM-DD HH:mm:ss') 
  },
  updateAt: {
    type: Date,
    type: Date, 
    default: Date.now, 
    get: v => moment(v).format('YYYY-MM-DD HH:mm:ss') 
  },
};
