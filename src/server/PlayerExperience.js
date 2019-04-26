import { Experience } from 'soundworks/server';
import setup from '../shared/setup';

function getGameSetupByName(gameName) {
  for (let i = 0; i < setup.length; i++) {
    const gameSetup = gameSetups[i];

    if (gameSetup.name === gameName)
      return gameSetup;
  }

  return null;
}

export default class PlayerExperience extends Experience {
  constructor() {
    super('player');

    this.checkin = this.require('checkin');
    this.sharedParams = this.require('shared-params');
  }

  start() {

  }

  enter(client) {
    super.enter(client);
    this.sharedParams.update('player-' + (client.index + 1), 'connected');
  }

  exit(client) {
    super.exit(client);
    this.sharedParams.update('player-' + (client.index + 1), '');
  }
}
