/**
 * @author  Joseph Evans
 * @version 1.0.0-alpha 
 * @date    20/08/2019
 * @desc    The purpose of this interface is to 
 *          simply ensure that the state manager
 *          receives the expected argument(s).
 * @interface
 */
export interface Action 
{
  /**
   * @since  1.0.0
   * @access public 
   * @property {string} Action.name - This is the name
   *                    that you'd like to assign to the 
   *                    Action.
   */
  name: string;

  /**
   * @since 1.0.0
   * @access public 
   * @property {object} Action.payload - This is essentially 
   *                    the data that you'd like to send to the 
   *                    state manager.
   */
  payload: object;
}