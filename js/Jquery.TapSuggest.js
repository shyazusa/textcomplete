/*--------------------------------------------------------------------------*
 *  
 *  TapSuggest.js
 *  
 *  MIT-style license. 
 *  
 *  2016 nocho
 *  http://kinocolog.com
 *  
 *--------------------------------------------------------------------------*/

(function($){
	
	var tsTimerFunction;
	var tsLastWord;
	
	$.fn.TapSuggest = function(options){
		
		$this = $(this);
		$this.css('width', '100%');
		
		var defaults = {
			tsArrayList : [],
			tsInputElement : $this.closest('input:text'),
			tsListCount : 10,
			tsReloadTimer : 300,
			tsCloseTimer : 500,
			tsFormAutoSubmit : false,
			tsUlClass : 'TapSuggest',
			tsAjaxUrl : '',
			tsAjaxParam : 'str',
			tsRegExpAll : false
		};

		var setting = $.extend(defaults, options);
		
		if(!$(setting.tsInputElement)) return;
		
		$tsInput = $(setting.tsInputElement);
		$tsResult = $('<ul class="' + setting.tsUlClass + '">');
		
		var tsArrayListConvert = [];
		
		if(setting.tsArrayList){
			$.each(setting.tsArrayList, function(i, value){
				if($.isArray(value)){
					var sub_array = [];
					$.each(value, function(i2, value2){
						sub_array.push(value2.toKatakanaCase().toHankakuCase());
					});
					tsArrayListConvert.push(sub_array);
				}else{
					tsArrayListConvert.push(value.toKatakanaCase().toHankakuCase());
				}
			});
		}
		
		$tsInput.on('click', function(){
					
			var position = $tsInput.offset().top;
			$('body,html').animate({scrollTop: (position - 10)}, 300);
			
			tsLastWord = "";
			
			$tsResult.on('click', function(e){
				var $form = $($tsInput.closest('form'));
				$tsInput.val($(e.target).text());
				tsLastWord = $(e.target).text();
				$tsResult.empty();
				if(setting.tsFormAutoSubmit) $form.submit();
				return false;
			});
			
			$tsResult.on('touchstart', function(e){
				$(e.target).addClass('totch');
			});
			$tsResult.on('touchend', function(e){
				$(e.target).removeClass('totch');
			});
		
			if(!tsTimerFunction){
				tsTimerFunction = setInterval(function(){
					
					if(tsLastWord == $tsInput.val()) return;
					if($tsInput.val() == ""){
						$tsResult.empty();
						tsLastWord = "";
						return;
					}
					
					tsLastWord = $tsInput.val();
					
					if(setting.tsArrayList.length > 0){
						
						var list = [];
						var regCheck;
						var now_word = $tsInput.val().toKatakanaCase().toHankakuCase();
						if(setting.tsRegExpAll){
							regCheck = new RegExp("(" + now_word + ")", "i");
						}else{
							regCheck = new RegExp("^(" + now_word + ")", "i");
						}
						
						$.each(tsArrayListConvert, function(i, value){
							if($.isArray(value)){
								$.each(value, function(i2, value2){
									if(value2.match(regCheck)){
										list.push(setting.tsArrayList[i][0]);
										return false;
									}
								});
							}else{
								if(value.match(regCheck)){
									list.push(setting.tsArrayList[i]);
								}
							}
							if(list.length >= setting.tsListCount) return false;
						});
						
						$tsResult.empty();
						$.each(list, function(i, value){
							$tsResult.append('<li>' + value + '</li>');
						});
						$this.append($tsResult);

					}else if(setting.tsAjaxUrl && setting.tsAjaxParam){
						var param = {};
						param[setting.tsAjaxParam] = $tsInput.val();
						$.ajax({
							url : setting.tsAjaxUrl,
							type : "POST",
							cache : false,
							dataType : "json",
							data : param,
							success : function(list){
								$tsResult.empty();
								$.each(list, function(i, value){
									if(i >= setting.tsListCount) return false;
									$tsResult.append('<li>' + value + '</li>');
								});
								$this.append($tsResult);
							}
						});
					}
					
				}, setting.tsReloadTimer);
				
			}
			$tsInput.on('blur', function(){
				clearInterval(tsTimerFunction);
				tsTimerFunction = 0;
				setTimeout(function(){
					$tsResult.empty();
				}, setting.tsCloseTimer);
			});
		});
	}
		
	// kanaXs
	// https://github.com/shogo4405/KanaXS.git
	String.prototype.toKatakanaCase=function(){for(var a,b=this.length,c=[];b--;)a=this.charCodeAt(b),c[b]=12353<=a&&12438>=a?a+96:a;return String.fromCharCode.apply(null,c)};String.prototype.toHankakuCase=function(){for(var a,b=this.length,c=[];b--;)switch(a=c[b]=this.charCodeAt(b),!0){case 65281<=a&&65374>=a:c[b]-=65248;break;case 12288==a:c[b]=32}return String.fromCharCode.apply(null,c)};
	
})(jQuery);