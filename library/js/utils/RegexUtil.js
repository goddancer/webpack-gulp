/**
 * Created by admin on 2017/7/4.
 */
export class RegexUtil{
    constructor() {
    };
    mailReg = new RegExp(/^[0-9|A-z|_]{1,17}[@][0-9|A-z]{1,3}.(com)$/);
    mobileReg=new RegExp(/^((\(\d{3}\))|(\d{3}\-))?1[0-9][0-9]\d{8}|15[89]\d{8}/);
    textReg=new RegExp(/[u4e00-u9fa5]/);

    emptyReg=new RegExp(/\n\s*\r /);

}