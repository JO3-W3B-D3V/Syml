import { Exception } from './Exception';

/**
 * @author    Joseph Evans
 * @version   1.0.0-alpha 
 * @date      20/08/2019
 * @classdesc The purpose of this class is to allow 
 *            for a base to implement an exception for 
 *            having found the trigger already within the 
 *            state manager.
 * @class
 */
export class AlreadyRegisteredTriggerException extends Exception 
{
  /**
   * @since    1.0.0
   * @access   private 
   * @property {string} AlreadyRegisteredTriggerException.DEFAULT_MESSAGE
   */
  private static readonly DEFAULT_MESSAGE: string = "A trigger by that name has already been registered.";

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
      message = AlreadyRegisteredTriggerException.DEFAULT_MESSAGE;
    else 
      message = `A trigger by the name of ${triggerName} has already been redistered.`;
      
    super(message);
  }
}