const { EventDispatcher } = require('event-dispatch');
const logger = require('../loaders/logger');

class EventSubscriber {
  events = [];

  constructor(eventDispatcher) {
    this.eventDispatcher = eventDispatcher;
  }

  subscribe() {
    this.events.forEach(event => {
      logger.info(`👣 Subscribing to "${event.name}" event...`);
      this.eventDispatcher.attach(this, event.name, event.callback);
    });
  }

  on(name, callback) {
    logger.info(`👣 Subscribing to "${name}" event...`);
    this.eventDispatcher.attach(this, name, callback);
  }
}

module.exports = EventSubscriber;
