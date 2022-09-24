// Here we import all events
const { EventDispatcher } = require('event-dispatch');
const UserSubscriber = require('../subscribers/user.subscriber');

const eventDispatcher = new EventDispatcher();

const initializeEvents = () => {
  UserSubscriber(eventDispatcher);
  // const userss = new UserSubscriber(eventDispatcher);
  // const userss = new UserSubscriber(eventDispatcher);
};

module.exports = { initializeEvents, eventDispatcher };
