import * as soundworks from 'soundworks/client';
import setup from '../../shared/setup';

const client = soundworks.client;

const template = `
  <p id="description" class="locked"><%= description %></p>
`;

const model = {
  description: '',
};

class PlayerExperience extends soundworks.Experience {
  constructor(assetsDomain) {
    super();

    this.platform = this.require('platform', { showDialog: false });
    this.checkin = this.require('checkin', { showDialog: false });
    this.sharedParams = this.require('shared-params');

    this.stream = null;

    this.updateStream = this.updateStream.bind(this);
    this.onTouch = this.onTouch.bind(this);
  }

  start() {
    super.start();

    this.view = new soundworks.View(template, model, {}, { id: 'player' });

    this.show().then(() => {
      const stream = new Audio('sounds/empty.mp3');
      stream.autoplay = true;

      stream.addEventListener('canplay', () => {
        this.setStatus('ready');
      });

      stream.addEventListener('playing', () => {
        this.setStatus('playing');
      });

      stream.addEventListener('stalled', (e) => {
        this.setStatus('stalled');
      });

      this.stream = stream;

      this.sharedParams.addParamListener('stream-' + (client.index + 1), this.updateStream);

      window.addEventListener('touchstart', this.onTouch, false);
      window.addEventListener('click', this.onTouch, false);
    });
  }

  setStatus(status) {
    this.sharedParams.update('player-' + (client.index + 1), status);
  }

  unlockDescription() {
    const elem = document.getElementById('description');
    elem.classList.remove('locked');
  }

  resetStream() {
    this.stream.src = 'sounds/empty.mp3';
    this.stream.loop = false;
    this.enabled = false;

    this.view.model.description = '#' + (client.index + 1);
    this.view.render('#description');
  }

  testStream() {
    this.stream.src = 'sounds/noise.mp3';
    this.stream.loop = true;
    this.enabled = false;

    this.view.model.description = '#' + (client.index + 1);
    this.view.render('#description');
  }

  setStream(stream) {
    this.stream.src = stream.url;
    this.stream.loop = false;
    this.enabled = true;

    this.view.model.description = stream.description;
    this.view.render('#description');
  }

  updateStream(name) {
    this.setStatus('connected');

    if (name === 'off') {
      this.resetStream();
    } else if (name === 'test') {
      this.testStream();      
    } else {
      for (let stream of setup.streams) {
        if (stream.name === name) {
          this.setStream(stream);
          break;
        }
      }
    }
  }

  onTouch(evt) {
    if (true || this.enabled) {
      this.stream.play();
      this.unlockDescription();
    }
  }

  reload() {
    window.location.reload();
  }
}

export default PlayerExperience;