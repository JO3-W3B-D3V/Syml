/**
 * @author    Joseph Evans
 * @version   1.0.0-alpha 
 * @date      20/08/2019
 * @classdesc The purpose of this class is to allow 
 *            for a base to implement exceptions.
 * @class
 */
export class Exception
{
  /**
   * @since  1.0.0
   * @access public
   * @param  {string} message
   * @desc   This constructor will simply create 
   *         a new Exception.
   */
  constructor(message: string) 
  {
    Error.call(this, message);
  }
}