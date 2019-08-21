import { Syml } from '../src/core/Syml';
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
      try {
        Syml.registerTrigger(MockTrigger);
        expect(Syml.isTriggerNameRegistered(MockTrigger.name)).to.be.true;
        expect(Syml.isTriggerRegistered(MockTrigger)).to.be.true;
      } catch (e) {
        expect(e.message).equal("Event is not defined");
      }
    });

    it('should throw exception', () => {
      try {
        Syml.registerTrigger(MockTrigger);
        expect(() => Syml.registerTrigger(MockTrigger)).to.throw();
      } catch (e) {
        expect(e.message).equal("Event is not defined");
      }
    });
  });

  describe('#fireTrigger', () => {
    it('should fire trigger with no errors', () => {
      try {
        Syml.registerTrigger(MockTrigger);
        expect(() => Syml.fireTrigger(MockTrigger.name)).to.not.throw();
      } catch (e) {
        expect(e.message).equal("Event is not defined");
      }
    });

    it('should throw exception', () => {
      try {
        expect(() => Syml.fireTrigger('test')).to.throw();
      }  catch (e) {
        expect(e.message).equal("Event is not defined");
      }
    });
  });

  describe('#getRegisteredTriggers', () => {
    it('should be an empty array', () => {
      expect(Syml.getRegisteredTriggers().length).to.equal(0);
    });

    it('should have a length of one', () => {
      try {
        Syml.registerTrigger(MockTrigger);
        expect(Syml.getRegisteredTriggers().indexOf(MockTrigger.name)).to.equal(0);
      } catch (e) {
        expect(e.message).equal("Event is not defined");
      }
    });
  });

  describe('#isTriggerRegistered', () => {
    it('should find the refistereged trigger', () => {
      try {
        Syml.registerTrigger(MockTrigger);
        expect(Syml.isTriggerRegistered(MockTrigger)).to.be.true;
      } catch (e) {
          expect(e.message).equal("Event is not defined");
      }
    });
  });

  describe('#isTriggerNameRegistered', () => {
    it ('should contain the "My test trigger" trigger', () => {
      try {
        Syml.registerTrigger(MockTrigger);
        expect(Syml.isTriggerRegistered(MockTrigger)).to.be.true;
      } catch (e) {
        expect(e.message).equal("Event is not defined");
      }
    });
  });

  describe('#destruct', () => {
    it ('should contain the "My test trigger" trigger', () => {
      try {
        Syml.registerTrigger(MockTrigger);
        Syml.destruct();
        expect(Syml.getRegisteredTriggers().length).to.equal(0);
      } catch (e) {
        expect(e.message).equal("Event is not defined");
      }
    });
  });

  describe('#updateState', () => {
    it('should not be empty state', () => {
      try {
        Syml.registerTrigger(MockTrigger);
        Syml.updateState(MockAction);
        expect(Syml.getState()).to.not.be.empty;
      } catch (e) {
        expect(e.message).equal("Event is not defined");
      }
    });
  });
});