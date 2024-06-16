// const fetch = require('node-fetch');
const API_KEY =
  "da111e485e53b573fe8b340db207a671ce635f2b96b9297b418e26d34d8ebacc";

async function fetchVirusTotalData(domain) {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-Apikey": API_KEY,
      },
    };

    const response = await fetch(
      `https://www.virustotal.com/api/v3/domains/${domain}`,
      options
    );
    const data = await response.json();
    console.log("#########virusTotal", typeof(data));
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  fetchVirusTotalData,
};
