import { Exception } from './Exception';

/**
 * @author    Joseph Evans
 * @version   1.0.0-alpha 
 * @date      20/08/2019
 * @classdesc The purpose of this class is to allow 
 *            for a base to implement an exception, 
 *            stating that the required trigger does 
 *            not yet exist.
 * @class
 */
export class NoSuchTriggerException extends Exception {
  /**
   * @since    1.0.0
   * @access   private 
   * @property {string} NoSuchTriggerException.DEFAULT_MESSAGE
   */
  private static readonly DEFAULT_MESSAGE: string = "No such trigger exists.";

  /**
   * @since  1.0.0
   * @access public 
   * @param  {string} triggerName - This is the name of 
   *                  the Trigger that has already been 
   *                  registered.
   */
  constructor(triggerName?: string) 
  {
    let message: string = '';

    if (triggerName == null)
      message = NoSuchTriggerException.DEFAULT_MESSAGE;
    else 
      message = `No such trigger exists by the name of ${triggerName}.`;
      
    super(message);
  }
}