/**
 * name : jysSelectbox
 * make : parkjonghcan
 * version : 1.0
 * date : 2016.10.20
 * e-mail:idpjc1@gamil.com //korea
 * @param  {[string]} $ [classNaming:classname],[valNaming:inputValuename]
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
    ckNaming:'forId_', // delete
    valNaming:'value_' // value setting
};
selectJys.prototype._initOptions=function(options){
    this._options = $.extend({}, selectJys.defaultOptions, options);
};
selectJys.prototype._init=function(selector){
    this.$jySselect = $(selector);
    this._$cntWidth = this.$jySselect.width() - 2;
    this._$selectBox = this.$jySselect.find('.option');
    this._$textval = this.$jySselect.find("a.selecttext");
    //this._$arrow =  this.$jySselect.find('.select-arrow');
    this._$boxHeight = this.$jySselect.outerHeight();
    this._$sublist = this._$selectBox.find('ul');
    this._$sublistLi = this._$selectBox.find('ul li');
    this._$sublistLabel = this._$sublistLi.find('a');
    this._$sublist.css({'width':this._$cntWidth});
    this._$sublistLabel.css({opacity:0});

};
selectJys.prototype._onLoad = function(){
	var val = this._$sublistLi.eq(0).find('a').text();
	var s1 = this._$sublistLi.eq(0).find("input:checkbox").prop('checked', true);
	this._$textval.children().text(val);
};
selectJys.prototype._addList = function(){
	var objthis =this;
	this._$addcheck = this._$sublistLi;
	$(this._$addcheck).each(function( index ) {
	 	$(this).children().children().attr('for', objthis._options.ckNaming + index);
	 	$(this).children().append("<input type='checkbox' class=" + objthis._options.classNaming + " name=" + objthis._options.classNaming + " value=" + objthis._options.valNaming + index + " id=" + objthis._options.ckNaming + index + ">");
    $(this).children().append("<span class='bg_move'></span>");
  });
	this._onLoad();
};
selectJys.prototype._initEvent=function(){
  var objThis = this;
  this._$textval.on('click',function(e){
    e.preventDefault();
      if(objThis._$textval.hasClass('down')){
          objThis._$textval.removeClass('down');
          objThis._$textval.addClass('up');
          objThis._$selectBox.css({'top':objThis._$boxHeight});
          objThis._$sublist.slideDown(300);
          objThis.showText();
      }else{
          objThis._$textval.removeClass('up');
          objThis._$textval.addClass('down');
          objThis._$sublist.delay(500).slideUp(300);
          objThis.hideText();
      }
  });

  this._$sublistLabel.on('click',function(e){
    e.preventDefault();
    e.stopPropagation();
    objThis._$sublistLabel.children();
    objThis._$sublistLabel.children().prop('checked',false);
    $(this).children().prop('checked',true);
    var val = $(this).text();
    objThis._$textval.children().text(val);
    objThis._$textval.removeClass('up');
    objThis._$textval.addClass('down');
    objThis._$sublist.delay(800).slideUp(300);
    objThis.selectText(objThis._$sublistLabel.index(this));

    });
    this._$sublistLi.on('mouseover',function(e){
        $(this).find('.bg_move').stop(true).animate({width:'100%'});
    }).mouseout(function(){
      $(this).find('.bg_move').stop(true).animate({width:'0%'});
    });
};
selectJys.prototype.chbrF=function(ar){
	var UserAgent = navigator.userAgent;
	if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson|X11/i) != null ||UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
	{
		return 1;
	}else{
		return 0;
	}
};
selectJys.prototype.showText=function(ar){
  for(i=0; i < this._$sublistLabel.length; i++){
    var duration = 100 * i;
    this._$sublistLabel.eq(i).delay(duration).animate({opacity:1});
  }
};
selectJys.prototype.hideText=function(ar){
  for(i=0; i < this._$sublistLabel.length; i++){
    var duration = 100 * i;
    this._$sublistLabel.eq(i).delay(duration).animate({opacity:0});
  }
};
selectJys.prototype.selectText=function(idx){
  var objThis = this;
  this._$sublistLabel.eq(idx).stop(true).animate({'padding-left':'110%'},500,function(){
    objThis._$sublistLabel.animate({opacity:0},function(){
      objThis._$sublistLabel.attr('style','');
    });
  });
  objThis._$textval.children().animate({'margin-left': - objThis._$cntWidth},function(){
    objThis._$textval.children().delay(500).animate({'margin-left': 0});
  });
};
selectJys.prototype._selected=function(ar){
  var val = this._$sublistLi.eq(ar).text();
  if(ar !== undefined){

  }
  else{
    return;
  }
};
