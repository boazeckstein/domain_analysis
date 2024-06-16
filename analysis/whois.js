const whois = require('whois');

async function fetchWhoisData(domain) {
  return new Promise((resolve, reject) => {
    whois.lookup(domain, (err, data) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      const parsedData = parseWhoisData(data);
      resolve(parsedData);
    });
  });
}

function parseWhoisData(whoisData) {
  const lines = whoisData.split('\n');
  const result = {};

  lines.forEach(line => {
    const [key, ...value] = line.split(':');
    if (key && value.length > 0) {
      result[key.trim().replace(/ /g, '_')] = value.join(':').trim();
    }
  });

  return result;
}


module.exports = {
  fetchWhoisData
}


module.exports = {
    fetchWhoisData
}
