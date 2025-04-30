console.log("Running set-env.js... Creating env.js");
require('dotenv').config();
const fs = require('fs');
const path = require('path');

try {
  const distPath = path.resolve(__dirname, 'dist', 'EXMART-ECOMMERCE', 'browser');
  const destEnvPath = path.resolve(distPath, 'env.js');
  const envContent = `
  (function(window) {
    window["env"] = window["env"] || {};
    window["env"]["clientId"] = "${process.env.clientId || ''}";
    window["env"]["clientSecret"] = "${process.env.clientSecret || ''}";
    window["env"]["tenantId"] = "${process.env.tenantId || ''}";
    window["env"]["authority"] = "${process.env.authority || ''}";
    window["env"]["redirectUri"] = "${process.env.redirectUri || ''}";
    console.log("Environment loaded:", window["env"]);
  })(this);
  `;

    if (!fs.existsSync(distPath)) {
      fs.mkdirSync(distPath, { recursive: true });
    }

    fs.writeFileSync(destEnvPath, envContent);
    console.log('env.js generated successfully');
  } catch (error) {
    console.error('Error generating env.js:', error);
    process.exit(1);
  }
