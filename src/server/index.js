import 'source-map-support/register'; // enable sourcemaps in node
import path from 'path';
import * as soundworks from 'soundworks/server';
import PlayerExperience from './PlayerExperience';
import ControllerExperience from './ControllerExperience';
import setup from '../shared/setup';

const configName = process.env.ENV || 'default';
const configPath = path.join(__dirname, 'config', configName);
let config = null;

const streamNames = ['off', 'test'];

for(let stream of setup.streams)
  streamNames.push(stream.name);

// rely on node `require` as the path is dynamic
try {
  config = require(configPath).default;
} catch(err) {
  console.error(`Invalid ENV "${configName}", file "${configPath}.js" not found`);
  process.exit(1);
}

process.env.NODE_ENV = config.env;

if (process.env.PORT) {
  config.port = process.env.PORT;
}

soundworks.server.init(config);

soundworks.server.setClientConfigDefinition((clientType, config, httpRequest) => {
  return {
    clientType: clientType,
    env: config.env,
    appName: config.appName,
    websockets: config.websockets,
    defaultType: config.defaultClient,
    assetsDomain: config.assetsDomain,
  };
});

const sharedParams = soundworks.server.require('shared-params');

for(let i = 0; i < setup.maxPlayers; i++){
  sharedParams.addText('player-' + (i + 1), 'player #' + (i + 1), '');
  sharedParams.addEnum('stream-' + (i + 1), 'stream', streamNames, 'off');
}

const experience = new PlayerExperience();
const controller = new ControllerExperience();

soundworks.server.start();
