import fs from 'fs';

export function loadSettingsSync() {
  const env = process.env.NODE_ENV || 'dev';
  const filename = `${__dirname}/../settings.${env}.json`;
  console.log(`loading settings from '${filename}''`);
  const data = fs.readFileSync(filename, 'utf8');
  return JSON.parse(data);
}
