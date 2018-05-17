/**
 * Created by admin on 2017/7/4.
 */
import {RegexUtil} from 'RegexUtil'

export class  ValidateUtil{
    /**
     * ValidateUtil常用的表单的验证
     *
     */
    constructor(){

    };
    /**
     * 验证邮箱是否正确
     * @param val 传入获取的表单的值
     * @returns {boolean}
     */
    static regMail(val) {

        if (RegexUtil.mailReg.test(val)) {
            return true;
        } else {
            return false;
        }
    };
    /**
     * 验证手机号码是否正确
     * @param val 传入获取的表单的值
     * @returns {boolean}
     */
     static regPhone(val) {

        if (RegexUtil.mobileReg.test(val)) {
            return true;
        } else {
            return false;
        }
    };
    /**
     * 验证是否为中文的字符
     * @param val 传入获取的表单的值
     * @returns {boolean}
     */
    static regText(val){
        if(!RegexUtil.textReg.test(val)){
            return true;
        }else{
            return false;
        }
    }

    /**
     * 判断是否为空
     * @param val 传入获取的表单的值
     * @returns {boolean}
     */
    static regEmpty(val){
        if (!RegexUtil.emptyReg.test(val)) {
            return false;
        } else {
            return true;
        }
    }


    /**
     * 判断字数是否是在3-20之间
     * @param val 传入获取的表单的值
     * @param min 传入最小的字符数
     * @param max 传入最大的字符数
     * @returns {boolean}
     */
    static regFont(val,min,max){
        let fontReg=new RegExp("^[0-9&-]{"+min+","+max+"}$");
        if(fontReg.test(val,min,max)){
            return true;
        }else{
            return false;
        }
    }
}