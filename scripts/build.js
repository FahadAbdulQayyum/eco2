const fs = require('fs');
const path = require('path');

// Get current timestamp
const buildTimestamp = Date.now();

// Create the build info content
const buildInfo = `// This file is auto-generated during build time
// Do not edit manually
export const BUILD_TIMESTAMP = ${buildTimestamp};
export const BUILD_DATE = new Date(${buildTimestamp}).toISOString();
`;

// Write to a file that can be imported
const buildInfoPath = path.join(__dirname, '..', 'src', 'lib', 'buildInfo.ts');
fs.writeFileSync(buildInfoPath, buildInfo);

console.log(`✅ Build timestamp generated: ${new Date(buildTimestamp).toISOString()}`);
console.log(`📁 Build info written to: ${buildInfoPath}`);

// Also create a .env.local file for Next.js
const envContent = `NEXT_PUBLIC_BUILD_TIMESTAMP=${buildTimestamp}
NEXT_PUBLIC_BUILD_DATE=${new Date(buildTimestamp).toISOString()}
`;

const envPath = path.join(__dirname, '..', '.env.local');
fs.writeFileSync(envPath, envContent);

console.log(`🌍 Environment file created: ${envPath}`);
