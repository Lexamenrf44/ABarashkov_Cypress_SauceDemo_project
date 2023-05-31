const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  e2e: {
    retries: {
      runMode: 2,
      openMode: 0
    },
    supportFile: 'cypress/support/e2e.js',
    baseUrl: "https://www.saucedemo.com/",
    defaultCommandTimeout: 5000,
    chromeWebSecurity: false,
    video: false,
    fixturesFolder: "cypress/fixtures",
    specPattern: "cypress/specs",
    viewportWidth: 1600,
    viewportHeight: 1200,
    reporter: "cypress-multi-reporters",
    trashAssetsBeforeRuns: true,
    testIsolation: false,
    reporterOptions: {
      reporterEnabled: "mochawesome",
      mochawesomeReporterOptions: {
        reportDir: "cypress/results",
        overwrite: false,
        html: false,
        json: true
      }
    },
    setupNodeEvents(on, config) {

      on('task', {
        log(message) {
          console.log(message);
          return null
        },
      });

      on("task", {
        parseXlsx({filePath}) {
          return new Promise((resolve, reject) => {
            try {
              const jsonData = xlsx.parse(fs.readFileSync(filePath));
              resolve(jsonData[0].data);
            } catch (e) {
              reject(e);
            }
          });
        }
      });

      on("task", {
        write_xlsx ({someData, filepath}) {
          return new Promise((resolve, reject) => {
            try {
              workbook.xlsx.readFile(path.resolve(__dirname, filepath))
                  .then(() => {
                    workbook.removeWorksheet(1)  //Clear sheet 1
                    workbook.addWorksheet('Sheet1')   //Add new sheet
                    const worksheet = workbook.getWorksheet(1);
                    worksheet.insertRows(1, someData);
                    workbook.xlsx.writeFile(path.resolve(__dirname, filepath))
                    resolve(true)
                  })
            } catch (e) {
              reject(e)
            }
          })
        }
      });

      on('after:run', async (results) => {
        console.log(`-------------GLOBAL TEARDOWN START---------------`)
        // Custom teardown code.
        console.log(`-------------GLOBAL TEARDOWN FINISHED---------------`)
      })

      // Change baseUrl if param is present
      async function getExtraConfig() {
        let conf = {}
        if (process.env.BASE_URL) {
          conf = {baseUrl: process.env.BASE_URL}
        }
        console.log(conf)
        return conf
      }

      return getExtraConfig()

    }
  }
})
