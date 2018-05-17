var that = null;
export class UploadImgUtil {
    /**
     * 指向自己的指针
     */

    /**
     *  UploadImgUtil 文件操作类，用于读取上传文件
     *  @param fileInputId {String} fileInputId 是表单的ID
     *  @param maxsize {int} maxsize 文件最大值
     *  @param suffix {String} fileExt 文件后缀名，用|分开
     *  @param callback {function} 回调函数，每次修改图片会调用callback函数，callback函数会接收一个img对象，
     *  @param errorhold {Object} 错误捕获函数，用于处理错误 对象包含overMaxError（超过最大限制）函数及suffixError（）非可接受文件类型错误函数
     */
    constructor(fileInputId, maxsize, suffix, callback, errorhold) {
        this.fileInput = UploadImgUtil.isDOMElement(fileInputId) ? fileInputId : document.getElementById(fileInputId);
        this.fileInput.onchange = this.onchange;
        this.maxsize = 1024 * 1024 * maxsize;
        this.suffixs = suffix.split('|');
        that = this;
        that.reader = new FileReader();
        that.reader.onload = that.onload;
        that.callback = callback;
        var _errorhold = {
            overMaxError: function (size) {
                alert("现在的文件大小是" + size + ",超过了最大限值，请选择其他文件！");
            },
            suffixError: function (suffix) {
                alert("现在的文件类型是" + suffix + ",不符合要求，请选择其他文件！");
            }
        };
        this.errorhold=Object.assign({}, _errorhold, errorhold);
    }



    /**
     *  判断是否为dom元素
     *  @param obj {Dom} obj 需要判断的对象
     *  return {Boolean} 是返回true  不是返回false
     */
    static isDOMElement(obj) {
        return !!(obj && typeof window !== 'undefined' && (obj === window || obj.nodeType));
    };

    onchange(event) {
        var file = that.file = this.files[0];
        if (file.size > that.maxsize) {
            that.errorhold.overMaxError(file.size);
            return false;
        }
        var suffix = this.value.substr(this.value.lastIndexOf(".")+1).toLowerCase();//获得文件后缀名
        var canSuffix = false;
        for (let i = 0; i < that.suffixs.length; i++) {
            if (suffix == that.suffixs[i]) {
                canSuffix = true;
                break;
            }
        }
        if (!canSuffix) {
            that.errorhold.suffixError(suffix);
            return;
        }

        that.readBlob();

    }

    readBlob() {
        var file = that.file,
            arr = [],
            loaded = 0,
            step = 1024 * 1024;
        while (loaded < file.size) {
            var blob = file.slice(loaded, loaded + step + 1);
            loaded = loaded + step + 1;
            arr.push(blob);
        }
        that.reader.readAsDataURL(new Blob(arr));
    }

    onload() {
        var simg = document.createElement('img');
        simg.src = that.reader.result;
        simg.onload = function () {
            that.callback(this);
        }
    }

    static previewStyle(img,_w ,_el){
        var el = UploadImgUtil.isDOMElement(_el) ? _el : document.getElementById(_el);
        el.src=img.src;
        var iw = img.width;
        var ih = img.height;
        if (iw < ih) {
            el.width = _w+'rem';
            var hhh = _w / iw * ih;
            el.style.height = hhh + 'rem';
            el.style.marginLeft = '-'+_w/2+'rem';
            el.style.marginTop = '-' + hhh / 2 + 'rem';
        } else {
            el.style.height =_w+'rem';
            var www = _w / ih * iw;
            el.style.width = www + 'rem';
            el.style.marginTop = '-'+_w/2+'rem';
            el.style.marginLeft = '-' + www / 2 + 'rem';
        }
    }
}
