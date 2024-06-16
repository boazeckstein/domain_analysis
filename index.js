const express = require("express");
const bodyParser = require("body-parser");
const {
  createDomainTable,
  insertDomain,
  getServiceInfo,
} = require("./database/database");
const { updateAllDomains } = require("./analysis/analysis");

const app = express();
const port = 3000;

// Parse JSON request body
app.use(bodyParser.json());

// Initialize the database and create the table
createDomainTable();

// Run analysis when the server starts
updateAllDomains();
// Run analysis every 60 minuets
setInterval(updateAllDomains, 60 * 60 * 1000);

// Route to add a domain
app.post("/add_domain", (req, res) => {
  try {
    const { domain } = req.body;

    if (!domain) {
      return res.status(400).send({ error: "Domain is required" });
    }

    insertDomain(domain, (err, message) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(message);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// Route to get VirusTotal and Whois information for a domain
app.get("/domain", async (req, res) => {
  let domain;

  try {
    domain = req.query.domain;

    if (!domain) {
      return res.status(400).send({ error: "Domain is required" });
    }

    const virusTotalInfo = await getServiceInfo(domain, "virusTotal");
    const whoisInfo = await getServiceInfo(domain, "whois");

    if (virusTotalInfo == null && whoisInfo == null) {
      return res.status(200).send({ message: "Analysis not complete. Please check back later." });
    }

    res.send({
      virusTotal: JSON.parse(virusTotalInfo),
      whois: JSON.parse(whoisInfo),
    });
  } catch (err) {
    if (err.message === "Domain not found") {
      insertDomain(domain, (err, message) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send(`Domain not found. ${message}. please check back later.`);
      });
    } else {
      console.error(err);
      res.status(500).send({ error: "Internal server error" });
    }
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
