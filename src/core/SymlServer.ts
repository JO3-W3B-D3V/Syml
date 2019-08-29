import { Trigger, Action } from './';
import { AlreadyRegisteredTriggerException, NoSuchTriggerException } from '../exceptions';
import { EventEmitter } from 'events';

/**
 * @author    Joseph Evans
 * @version   1.0.0-beta 
 * @date      20/08/2019
 * @classdesc The purpose of this class is to allow 
 *            for a relatively simplistic state management 
 *            interface. The reason for it being abstract, 
 *            and nearly everything being static is due to
 *            the fact that we want to allow all use cases 
 *            to interact with this single source of truth.
 * @class
 */
export abstract class SymlServer
{
  /**
   * @since    1.0.0
   * @access   private
   * @property {object} SymlServer.state - This is the current
   *                    state held within the state manager.
   */
  private static state: object = {};

  /** 
   * @since    1.0.0
   * @access   private 
   * @property {object} SymlServer.triggers - This is where all of 
   *                    the triggers will be stored.  
   */
  private static triggers: object = {};

  /**
   * @since   1.0.0
   * @access  private
   * @property {EventEmitter} SymlServer.emitter - This is essentially 
   *                          the replacement of add event listener, etc.
   */
  private static emitter: EventEmitter = new EventEmitter();

  /**
   * @since  1.0.0
   * @access public
   * @return {object} This is a copy of the state property.
   * @desc   This will return a copy of the state stored in 
   *         the state manager.
   */
  public static getState(): object 
  {
    return {...SymlServer.state};
  }

  /**
   * @since 1.0.0
   * @access public
   * @param  {Action} action - This action object should 
   *                  contain the name of the trigger 
   *                  that you'd like to fire & data 
   *                  that you'd like to apply to the 
   *                  state.
   * @desc   This will simply update the current state.
   */
  public static updateState(action: Action): void 
  {
    const newState: object = action.payload === null ? {} : {...action.payload};
    SymlServer.state = {...newState};
    SymlServer.fireTrigger(action.name);
  }

  /**
   * @since  1.0.0
   * @access public 
   * @param {Trigger} trigger - This is the trigger that 
   *                  you wish to register.
   */
  public static registerTrigger(trigger: Trigger): void 
  {
    // If trigger already exists, throw an exception.
    if (SymlServer.isTriggerRegistered(trigger)) 
    {
      throw new AlreadyRegisteredTriggerException(trigger.name);
    }

    // Add the trigger like so.
    Object.defineProperty(SymlServer.triggers, trigger.name, {
      value: new Event(trigger.name),
      writable: false
    });

    // Finally add an event listener. 
    SymlServer.emitter.on(trigger.name, <any>trigger.trigger);
  }

  /**
   * @since 1.0.0
   * @access public 
   * @param {string} triggerName - This is the trigger that you'd 
   *                 like to fire.
   */
  public static fireTrigger(triggerName: string): void 
  {
    // If trigger does not exist, throw an exception.
    if (!SymlServer.isTriggerNameRegistered(triggerName)) 
    {
      throw new NoSuchTriggerException(triggerName);
    }

    SymlServer.emitter.emit(triggerName);
  }

  /**
   * @since 1.0.0
   * @access public 
   * @return {array} - This will return an array of registered 
   *                   trigger names.
   */
  public static getRegisteredTriggers(): Array<string> 
  {
    return Object.getOwnPropertyNames(SymlServer.triggers);
  }

  /**
   * @since 1.0.0
   * @access public 
   * @return {boolean}
   */
  public static isTriggerRegistered(trigger: Trigger): boolean
  {
    return SymlServer.triggers.hasOwnProperty(trigger.name);
  }

  /**
   * @since 1.0.0
   * @access public 
   * @return {boolean}
   */
  public static isTriggerNameRegistered(triggerName: string): boolean
  {
    return SymlServer.triggers.hasOwnProperty(triggerName);
  }

  /**
   * @since  1.0.0
   * @access public 
   * @desc   This method can be used to undo everything.
   */
  public static destruct(): void 
  {
    SymlServer.state = {};
    
    Object.keys(SymlServer.triggers).forEach((n: string) => {
      const t: Trigger = SymlServer.triggers[n];
      SymlServer.emitter.removeEventListener(t.name, <any>t.trigger)
    });
    
    SymlServer.triggers = {};
  }
}
