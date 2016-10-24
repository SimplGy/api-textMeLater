var getSheets = require('./syncWithSheets/getSheets');



module.exports = function(req, res) {
  console.log("Attempting to sync with Google Sheets...");
  getSheets(function(err, rows){
    if (err) {
      res.status(500).send("Error: " + err);
      return;
    }
    let output = rows.map( r => r.join('<br>') ).join('<br><br>');
    res.status(200).send('<pre>'+ output +'</pre>');
    console.log(`Got ${rows.length} rows`)
  });
}