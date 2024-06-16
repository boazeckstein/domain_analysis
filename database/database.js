const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "db.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database", err.message);
  }
  console.log("Connected to the database.");
});

function createDomainTable() {
  try {
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS domains (
                id INTEGER PRIMARY KEY,
                domainName TEXT,
                virusTotal TEXT,
                whois TEXT
            )`);
    });
  } catch (error) {
      console.error("Error creating table:", error);
  }
}

function insertDomain(domain, callback) {
  db.get(
    `SELECT * FROM domains WHERE domainName = ?`,
    [domain],
    (err, row) => {
      if (err) {
        return callback(err.message);
      } else if (row) {
        return callback("Domain already exists");
      } else {
        db.run(
          `INSERT INTO domains (domainName) VALUES (?)`,
          [domain],
          (err) => {
            if (err) {
              return callback(err.message);
            } else {
              return callback(null, `Inserted domain: ${domain}`);
            }
          }
        );
      }
    }
  );
}

function updateInfo(domain, sourceName, sourceInfo) {
  db.run(
    `UPDATE domains SET ${sourceName} =? WHERE domainName =?`,
    [sourceInfo, domain],
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`Updated virus total for ${domain}`);
      }
    }
  );
}

function getServiceInfo(domain, service) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT ${service} FROM domains WHERE domainName =?`,
      [domain],
      (err, row) => {
        if (err) {
          reject(err);
        } else if (row) {
          resolve(row[service]);
        } else {
          reject(new Error("Domain not found"));
        }
      }
    );
  });
}

function getAllDomains() {
  return new Promise((resolve, reject) => {
    db.all("SELECT domainName FROM domains", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = {
  createDomainTable,
  insertDomain,
  updateInfo,
  getServiceInfo,
  getAllDomains,
};
