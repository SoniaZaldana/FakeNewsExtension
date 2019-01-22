const fs = require("fs");


module.exports = async (url = '') => {
  data = fs.readFileSync("./biased_data.json");
  return data;
};

 function get_host_name(url) {
    url_object = new url(url)
    return url.hostname
  }
  
  function is_present(url) {
    hostname = get_host_name(url)
  }
  