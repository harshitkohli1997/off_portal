const moment = require('moment');

module.exports = {
formatDate: function(date, format){
    return moment(date).format(format);
  },

  ifcond:function(v1, v2, options) {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  }
}