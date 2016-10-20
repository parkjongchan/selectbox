/**
 * name : jysSelectbox
 * make : parkjonghcan
 * version : 0.2
 * date : 2016.10.20
 * e-mail:idpjc1@gamil.com //korea
 * @param  {[string]} $ [classNaming:classname],[ckNaming:lable-Id & forname],[valNaming:inputValuename]
 */
(function($){
    $.fn.jySselect=function(options){
        this.each(function(index){
            var jySselect = new selectJys(this,options);
            $(this).data("jySselect", jySselect);
        });
        return this;
    };
})(jQuery);
function selectJys(selector, options){
    this.$jySselect = null;
    this._$listBox = null;
    this._$textval = null;
    this._$arrow = null;
    this._$boxHeight = null;
    this._$sublist = null;
    this._$addcheck = null;
    this._options = null;
    this._init(selector);
    this._initOptions(options);
    this._initEvent();   
    this._addList();
}
selectJys.defaultOptions = {
    classNaming:'className', // class name setting
    ckNaming:'forId_', // id,for,name setting
    valNaming:'value_' // value setting
};
selectJys.prototype._initOptions=function(options){
    this._options = $.extend({}, selectJys.defaultOptions, options);
};
selectJys.prototype._init=function(selector){
    this.$jySselect = $(selector);
    this._$cntWidth = this.$jySselect.width() - 2;
    this._$selectBox = this.$jySselect.find('.select');
    this._$textval = this.$jySselect.find(".selecttext");
    this._$arrow =  this.$jySselect.find('.select-arrow');
    this._$boxHeight = this.$jySselect.outerHeight();
    this._$sublist = this._$selectBox.find('ul');
    this._$sublistLi = this._$selectBox.find('ul li');
    this._$sublistLabel = this._$sublistLi.find('label')
    this._$sublist.css({'width':this._$cntWidth})

};
selectJys.prototype._onLoad = function(){
	var val = this._$sublistLi.eq(0).find('label').text();
	var s1 = this._$sublistLi.eq(0).find("input:checkbox").prop('checked', true);
	this._$textval.text(val);
	this._$textval.attr('value',val);
}
selectJys.prototype._addList = function(){
	var objthis =this;
	this._$addcheck = this._$sublistLi;
	$(this._$addcheck).each(function( index ) {
	 	$(this).children().children().attr('for', objthis._options.ckNaming + index)
	 	$(this).children().append("<input type='checkbox' class=" + objthis._options.classNaming + " name=" + objthis._options.classNaming + " value=" + objthis._options.valNaming + index + " id=" + objthis._options.ckNaming + index + ">")
	});
	this._onLoad(); 
}
selectJys.prototype._initEvent=function(){
    var objThis = this;
    this._$textval.on('click',function(){
        if(objThis._$arrow.hasClass('down')){
            objThis._$arrow.removeClass('down');
            objThis._$arrow.addClass('up');
            objThis._$selectBox.css({'top':objThis._$boxHeight});
            objThis._$sublist.slideDown(300);
        }else{
            objThis._$arrow.removeClass('up');
            objThis._$arrow.addClass('down');
            objThis._$sublist.slideUp(300);
        }
    });
    this._$arrow.on('click',function(){
        if(objThis._$arrow.hasClass('down')){
            objThis._$arrow.removeClass('down');
            objThis._$arrow.addClass('up');
            objThis._$sublist.css({'top':objThis._$boxHeight});
            objThis._$sublist.slideDown(300);
        }else{
            objThis._$arrow.removeClass('up');
            objThis._$arrow.addClass('down');
            objThis._$sublist.slideUp(300);

        }
    });
    this._$sublistLabel.on('click',function(){
    	  unique = '.'+objThis._options.classNaming;
    	  $(unique).filter(':checked').not(this).removeAttr('checked');
          var val = $(this).text();
          objThis._$textval.text(val);
          objThis._$textval.attr('value',val);
          objThis._$arrow.removeClass('up');
          objThis._$arrow.addClass('down');
          objThis._$sublist.slideUp(300);
    });
};
selectJys.prototype.chbrF=function(ar){
	var UserAgent = navigator.userAgent;
	if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson|X11/i) != null ||UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
	{
		return 1
	}else{
		return 0
	}
}
selectJys.prototype._selected=function(ar){
  var val = this._$sublistLi.eq(ar).text();
  if(ar !== undefined){
    this._$textval.text(val);
    this._$textval.attr('value',val);
  }
  else{
    return;
  }
};
