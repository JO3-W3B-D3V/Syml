import { Syml } from './Syml';
import { expect } from 'chai';

const MockTrigger = {
  name: 'My test trigger',
  trigger: () => {}
};

const MockAction = {
  payload: {
    name: 'jay'
  },
  name: MockTrigger.name
};

describe('Syml', () => {
  beforeEach((done) => {
    Syml.destruct();
    done();
  });

  describe('#getState', () => {
    it('should be an empty object', () => {
      expect(Syml.getState()).to.be.empty;
    });
  });

  describe('#registerTrigger', () => {
    it ('should contain the "My test trigger" trigger', () => {
      Syml.registerTrigger(MockTrigger);
      expect(Syml.isTriggerNameRegistered(MockTrigger.name)).to.be.true;
      expect(Syml.isTriggerRegistered(MockTrigger)).to.be.true;
    });

    it('should throw exception', () => {
      Syml.registerTrigger(MockTrigger);
      expect(() => Syml.registerTrigger(MockTrigger)).to.throw();
    });
  });

  describe('#fireTrigger', () => {
    it('should fire trigger with no errors', () => {
      Syml.registerTrigger(MockTrigger);
      expect(() => Syml.fireTrigger(MockTrigger.name)).to.not.throw();
    });

    it('should throw exception', () => {
      expect(() => Syml.fireTrigger('test')).to.throw();
    });
  });

  describe('#getRegisteredTriggers', () => {
    it('should be an empty array', () => {
      expect(Syml.getRegisteredTriggers().length).to.equal(0);
    });

    it('should have a length of one', () => {
      Syml.registerTrigger(MockTrigger);
      expect(Syml.getRegisteredTriggers().indexOf(MockTrigger.name)).to.equal(0);
    });
  });

  describe('#isTriggerRegistered', () => {
    it('should find the refistereged trigger', () => {
      Syml.registerTrigger(MockTrigger);
      expect(Syml.isTriggerRegistered(MockTrigger)).to.be.true;
    });
  });

  describe('#isTriggerNameRegistered', () => {
    it ('should contain the "My test trigger" trigger', () => {
      Syml.registerTrigger(MockTrigger);
      expect(Syml.isTriggerRegistered(MockTrigger)).to.be.true;
    });
  });

  describe('#destruct', () => {
    it ('should contain the "My test trigger" trigger', () => {
      Syml.registerTrigger(MockTrigger);
      Syml.destruct();
      expect(Syml.getRegisteredTriggers().length).to.equal(0);
    });
  });

  describe('#updateState', () => {
    it('should not be empty state', () => {
      Syml.registerTrigger(MockTrigger);
      Syml.updateState(MockAction);
      expect(Syml.getState()).to.not.be.empty;
    });
  });
});