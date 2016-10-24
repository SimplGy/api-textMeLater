


module.exports = {
  
  rowToObj: function(row) {
    return {
      phone: row[0],
      msg: row[1],
      cron: row[2]
    };
  },

  objToRow: function(obj) {
    return [obj.phone, obj.msg, obj.cron];
  }
  
}