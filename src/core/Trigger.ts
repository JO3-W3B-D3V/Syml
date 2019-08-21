/**
 * @author  Joseph Evans
 * @version 1.0.0-alpha 
 * @date    20/08/2019
 * @desc    The purpose of this interface is to 
 *          simply ensure that the state manager
 *          receives the expected argument(s).
 * @interface
 */
export interface Trigger 
{
  /**
   * @since  1.0.0
   * @access public 
   * @property {string} Trigger.name - This is the name
   *                    that you'd like to assign to the 
   *                    Trigger.
   */
  name: string;

  /**
   * @since 1.0.0
   * @access public 
   * @property {function} Trigger.trigger - This is essentially 
   *                      the callback method that you'd like 
   *                      to occur.
   */
  trigger: Function;
}