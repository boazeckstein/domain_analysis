const { getAllDomains, updateInfo } = require('../database/database');
const { fetchVirusTotalData } = require('./virusTotal');
const { fetchWhoisData } = require('./whois');

async function updateAllDomains() {
    try {
        const domains = await getAllDomains();
        for (const { domainName } of domains) {
            console.log(`Updating ${domainName}`);
            
            const virusTotalInfo = await fetchVirusTotalData(domainName);
             updateInfo(domainName, 'virusTotal', JSON.stringify(virusTotalInfo));
            //  console.log(virusTotalInfo);

            const whoisInfo = await fetchWhoisData(domainName);
            // console.log(whoisInfo);
            updateInfo(domainName, 'whois', JSON.parse(JSON.stringify(whoisInfo)));

            // const whoisInfo = fetchWhoisData(domainName).then((data) => {

            // }).catch((err) => {});
            //  updateInfo(domainName, 'whois', whoisInfo);
        }
        console.log('All domains updated successfully.');

        return "return All domains updated successfully.";
    } catch (error) {
        console.error('Error updating domains:', error);
    }
}

module.exports = {
    updateAllDomains
}