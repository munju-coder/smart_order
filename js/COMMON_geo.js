var COMMON = {};

//basic
COMMON.basic = {
    isMobile : function()
    {
        function isMobile() 
        {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }        
    },
    getVersionIE : function ()
    {
        var word; 

        var agent = navigator.userAgent.toLowerCase(); 
   
        // IE old version ( IE 10 or Lower ) 
        if ( navigator.appName == "Microsoft Internet Explorer" ) word = "msie "; 
   
        // IE 11 
        else if ( agent.search( "trident" ) > -1 ) word = "trident/.*rv:"; 
   
        // Microsoft Edge  
        else if ( agent.search( "edge/" ) > -1 ) word = "edge/"; 
   
        // 그외, IE가 아니라면 ( If it's not IE or Edge )  
        else return -1; 
   
        var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" ); 
   
        if (  reg.exec( agent ) != null  ) return parseFloat( RegExp.$1 + RegExp.$2 ); 
   
        return -1;
    },
    browserVersionChk : function ()
    {
        var verNumber = this.getVersionIE();
        return verNumber;
    },
    removeTag : function(txt) 
    {
         return txt.replace(/(<([^>]+)>)/gi, "");
    }    
};

/**
 * @brief 현재 날짜 시간 구하는 함수
 * @retruns  {string}    date string
 */
COMMON.date = {
    todayYMD : function()
    {
        var date    = new Date();

        var year    = date.getFullYear();
        var month   = date.getMonth() + 1;
        var day     = date.getDate();
        var hours   = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        
        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    }    
};

/**
 * @brief cookie object
 */
COMMON.cookie = {
    /**
     * @brief 쿠키값 가져오기
     * @param {string} cName 
     * @returns {string} unescape value
     */
    getCookie : function (cName)
    {
        cName = cName + '=';
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cName);
        var cValue = '';
        if(start != -1){
            start += cName.length;
            var end = cookieData.indexOf(';', start);
            if(end == -1)end = cookieData.length;
            cValue = cookieData.substring(start, end);
        }
        return unescape(cValue);
    },
    /**
     * @brief 쿠키 설정
     * @param {string} cName
     * @param {string} cValue
     * @param {number} cDay
     */
    setCookie : function (cName, cValue, cDay)
    {
        var expire = new Date();
        expire.setDate(expire.getDate() + cDay);
        cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
        if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
        document.cookie = cookies;
    },
    /**
     * @brief cookie delete
     * @param {string} name 
     */
    delCookie : function (name)
    {
        var today = new Date();

        today.setTime(today.getTime() - 1);
        var value = get_cookie(name);
        if(value != "")
        {
            document.cookie = name + "=" + value + "; path=/; expires=" + today.toGMTString();
        }
    }
};


/**
 * @brief   form data check & change
 */
COMMON.form = {
    /**
     * @brief 콤마찍기
     * @param {string} str 
     */
    comma : function(str)
    {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },
    /**
     * @brief   콤마 풀기
     * @param {string} str 
     */
    uncomma : function(str) 
    {
        str = String(str);
        return str.replace(/[^\d]+/g, '');        
    },
    inputNumComma : function(obj) //input num comma
    {
        obj.value = this.comma(this.uncomma(obj.value));
    },
    /**
     * @brief   숫자만 추출
     * @param {string} str 
     */
    str_num : function(str)
    {
        var res = str.replace(/[^0-9]/g,"");    
        return res;
    },
    /**
     * @biref 자리수 채우기
     * @param {string} n 
     * @param {number} width
     * @returns {string} 
     */
    left_pad : function(n, width)
    {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;        
    },
    /**
     * @brief   공백제거
     * @param {string} stringToTrim 
     * @returns {string} trim string
     */
    trim : function(stringToTrim)
    {
        var str = stringToTrim.replace(/^\s+|\s+$/g,"");
	
        if(str == "" || str == "undefined")
        {
            str = null;
        }
        
        return str;
    },
    /**
     * 
     * @param {string} str 
     * @param {number} limit 
     */
    limitText : function(str, limit)
    {        
        if(str.length > limit)
        {
            alert("글자수가 " + limit + " 자로 제한되어 있습니다.");
        }
    },
    /**
     * @brief input:text -> number check
     * @param {string} event 
     */
    onlyNumber : function(event)
    {
        event = event || window.event;
        var keyID = (event.which) ? event.which : event.keyCode;
        if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
            return;
        else
            return false;
    },
    /**
     * @brief input:text -> string remove
     * @param {string} event 
     */
    removeString : function(event)
    {
        event = event || window.event;
        var keyID = (event.which) ? event.which : event.keyCode;
        if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
            return;
        else
            event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }
};


/**
 * @brief member register & modify validation
 */
COMMON.mbChk = {
    minLength : 8,  //password minlength
    maxLength : 15, //password maxlength
    /**
     * @brief email check
     * @param {string} email 
     */
    emailChk : function(email){
        var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;	

        if(exptext.test(email) == false)
        {
            return false;
        }        
    },
    /**
     * @brief member regist -> password chk
     * @param {boolean} password 
     */
    passwdChk : function(password)
    {
        var pw = password;
        var num = pw.search(/[0-9]/g);
        var eng = pw.search(/[a-z]/ig);
        var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
        var _bool = true;
    
        if(pw.length < this.minLength || pw.length > this.maxLength)
        {
            alert("8자리 ~ 15자리 이내로 입력해주세요.");
            _bool = false;
        }
    
        if(pw.search(/₩s/) != -1)
        {
            alert("비밀번호는 공백업이 입력해주세요.");
            _bool = false;
        } 
        
        if(num < 0 || eng < 0 || spe < 0 )
        {
            alert("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
            _bool = false;
        }	
        
        return _bool;
    }
};

/**
 * @brief   operation
 */
COMMON.arrOperator = {
    /**
     * @brief args plus
     * @param {numer} val
     * @returns {Array<number>}  args sum
     */
    arrPlus : function (val)
    {
        var sum = null;
        for(var i = 0; i < val.length; i++)
        {
            if(val[i] == null || isNaN(val[i]) == true)
            {
                val[i] = 0;
            }
            sum += val[i];
        }
        
        return sum;
    },
    /**
     * @brief args minus
     * @param {number} val 
     * @returns {Array<number>}  args sum
     */
    arrMinus : function (val)
    {
        var sum = null;
        for(var i = 0; i < val.length; i++)
        {
            if(val[i] == null || isNaN(val[i]) == true)
            {
                val[i] = 0;
            }
            sum -= val[i];
        }
        
        return sum;        
    },
    /**
     * @brief   args multiplication
     * @param {number} val 
     * @param {number} amount 
     * @returns {Array<number>}  args sum
     */
    arrMuliplication : function(val, amount)
    {
        var sum = null;
        for(var i = 0; i < val.length; i++)
        {
            if(val[i] == null)
            {
                val[i] = null;										
            }
            sum += val[i] * amount;            
        }
        
        return sum;
    },
    /**
     * @brief   배열 빈값 제거
     * @param {array} actual 
     * @returns {Array<*>}  args sum
     */
    cleanArray : function (actual)
    {
        var newArray = new Array();
        for (var i = 0; i < actual.length; i++) 
        {
            if(actual[i])
            {
                newArray.push(actual[i]);
            }
        }
        return newArray;        
    }
};

/**
 * @brief   url Object
 */
COMMON.url = {
    /**
     * @brief   url parameter 가져오기
     * @param {string} parameter 
     */
    urlParameter : function (parameter)
    {
        var results = new RegExp('[\?&]' + parameter + '=([^&#]*)').exec(window.location.href);
        if(results==null)
        {
           return null;
        }
        else
        {
           return results[1] || 0;
        }
    },
    urlFileName : function ()
    {
        var filename = document.location.href.split("/").slice(-1).pop();
        var newName = filename.split("?");
        
        return newName[0];
    }
};

COMMON.popup = {
    /**
     * @brief   popup open
     * @param {string} url 
     * @param {number} _top 
     * @param {number} _left 
     * @param {number} width 
     * @param {number} height 
     */
    windowOpen : function (url, _top, _left, width, height) 
    {
        window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=" + _top +",left=" + _left +",width=" + width + ",height=" + height);
    }    
};

/**
 * @brief restapi ajax call
 */
COMMON.ajax = {
    /**
     * @brief   ajax call
     * @param {string} _method 
     * @param {string} dir 
     * @param {object} dataObject 
     */
    restfulAjax : function(_method, dir, dataObject){
        $.ajax({
            type: _method,
            cache : false,
            dataType: "json",
            url: URL + "/REST/"+ dir +"/index.php",
            data: JSON.stringify(dataObject),
            success: function(data)
            {
                alert(data['return_msg']);
    
                if(_method != "DELETE")
                {
                    location.reload();
                }
            },
            error: function(r) {
                alert("통신실패...");
            }
        });
    },
    /**
     * @brief product row call, index call
     * @param {string} sca 
     * @param {string} sfl 
     * @param {string} stx 
     * @param {string} sst 
     * @param {string} sod
     * @param {string} page      
     * @param {string} limit 
     * @param {number} pd_category 
     * @param {string} region
     * @param {string} city
     */
    productList : function(sca, sfl, stx, sst, sod, page, limit, p_seq, pd_category, pd_sub_category)
    {

        $.ajax({
            type : "GET",
            dataType: "json",
            url: URL + "/REST/product/user/",
            cache : false,		
            data: {'api_key':API_KEY, 'sca' : sca, 'sfl' : sfl, 'stx' : decodeURI(stx), 'sst' : sst, 'sod' : sod, 'page' : page, 'limit' : limit, 'p_seq' : p_seq, 'pd_category' : pd_category, 'pd_sub_category' : pd_sub_category },
            success : function(data)
            {
                console.log(data['return_msg']);
                var html = new Array();
                var IMG_SRC = null;

                for(let i = 0; i < data['rows'].length; i++)
                {
                    if(data['rows'][i]['img_1'] == "")
                    {
                        IMG_SRC = data['rows'][i]['thumb'];
                    }
                    else
                    {
                        IMG_SRC = IMAGES_URL + "/images/product/" + data['rows'][i]['img_1'];
                    }

                    html[i] = '<li class="col-xs-6 col-sm-3 t_center pt3per">';
                        html[i] += '<div class="pbl_img">';
                            html[i] += '<a href="' + URL + '/product/view.php?seq=' + data['rows'][i]['seq'] + '">';
                                html[i] += '<img class="img-thumbnail" src="'+IMG_SRC+'" alt="' + data['rows'][i]['pd_name'] + '" width="230" height="230">';
                            html[i] += '</a>';
                        html[i] += '</div>';

                        html[i] += '<div class="pbl_subject pb10px t_center mt10px text_ellipsis">';
                            html[i] += '<a href="' + URL + '/product/view.php?seq=' + data['rows'][i]['seq'] + '">' + data['rows'][i]['pd_name'] + '</a>';
                        html[i] += '</div>';

                        html[i] += '<div class="pbl_cost fw_bold mb10px">' + COMMON.form.comma(data['rows'][i]['pd_price']) + ' 원</div>';
                        html[i] += '<div class="pbl_point"><span>' + COMMON.form.comma(data['rows'][i]['pd_max_point']) + ' P</span></div>';

                    html[i] += '</li>';
                    $(html[i]).appendTo(".product_box");
                }

                if(data['count'] < 1)
                {
                    $(".list_null").remove();
                    $('<li class="list_null">검색된 자료가 없습니다.</li>').appendTo(".product_box");
                }
                else
                {
                    $(".list_null").remove();
                }

                /**
                 * @brief product detail page move
                 */
                $(".pdb_top").click(function(){
                    var seq = COMMON.form.trim($(this).siblings(".pdb_bottom").attr("seq"));
                    location.href = MOBILE_URL + "/product/view.php?seq=" + seq;
                });

                //order btn
                $(".order_btn").click(function(){
                    var orderObject = new Object();
                    orderObject['seq'] = $(this).parents(".pdb_bottom").attr("seq");

                    if(MB_ID == "")
                    {
                        alert("로그인 후 구매 가능합니다.");
                    }
                    else
                    {
                        location.href = MOBILE_URL + "/order/order.php?seq=" + orderObject['seq'] + "&u_amount=1" ;
                    }
                    
                });

                //cart btn
                $(".cart_btn").click(function(){

                    if(MB_ID == "")
                    {
                        alert("로그인 후 사용가능합니다.");
                    }
                    else
                    {
                        var cartObject = {};
                        cartObject['api_key'] = API_KEY;
                        cartObject['mb_id'] = MB_ID;
                        cartObject['pd_seq'] = $(this).parents(".pdb_bottom").attr("seq");
                        cartObject['ct_amount'] = 1;
                        
                        $.ajax({
                            method : "PUT",
                            type : "json",
                            cache : false,
                            url : URL + "/REST/cart/",
                            data : JSON.stringify(cartObject),
                            success : function(data)
                            {
                                alert(data['return_msg']);
                            },
                            error : function(r)
                            {
                                alert("통신실패.");
                            }
                        });
                    }
                });

                //btn_more hide
                /* if(data['total_page'] == page )
                {
                    $(".pd_more_btn").hide();
                }
                else
                {
                    $(".pd_more_btn").show();
                } */
                
                if(data['count'] == 0)
                {
                    //$(".pd_in_box").html("검색된 상품이 없습니다.").css("font-size","100px");
                    $(".pd_more_btn").hide();
                }
                
            },          
            error: function(r) {
                alert("index_board error~~~");
            }
        });	
    }
};

COMMON.selectBox = {
    /**
     *
     * @param {string} category_name 
     * @param {string} val 
     * @param {string} sfl 
     * @param {string} stx 
     * 
     * @return {string} html selectBox
     */
    categorySelect : function(category_name, val, sfl, stx)
    {
        $.ajax({
            type: 'GET',
            cache : false,
            dataType: "json",
            url: URL + "/REST/"+ dir +"/index.php",
            data: {'api_key' : '123456789'},
            success: function(data)
            {

            },
            error: function(r) {
                alert("통신실패...");
            }
        });
    }
}

/**
 * @brief   kakao api
 */
COMMON.kakao = {
    /**
     * @param {string} devide   구분값으로 사용
     */
    DaumPostcode : function (devide){
        daum.postcode.load(function () {
            new daum.Postcode({
                oncomplete: function (data) {
                    
                    var fullAddr = ''; 
                    var extraAddr = '';    
                    
                    if (data.userSelectedType === 'R') 
                    { 
                        fullAddr = data.roadAddress;    
                    } else 
                    { 
                        fullAddr = data.jibunAddress;
                    }    
                    
                    if (data.userSelectedType === 'R') 
                    {                        
                        if (data.bname !== '') 
                        {
                            extraAddr += data.bname;
                        }
                        
                        if (data.buildingName !== '') 
                        {
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        
                        fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
                    }				
                    
                    if(devide == "mb_zip_btn")
                    {
                        document.getElementById('mb_zip').value = data.zonecode;
                        document.getElementById('mb_addr_1').value = fullAddr;
                        document.getElementById('mb_addr_2').focus();
                    }
                    else if(devide == "o_zip_btn")
                    {
                        document.getElementById('mb_zip').value = data.zonecode;
                        document.getElementById('mb_addr_1').value = fullAddr;
                        document.getElementById('mb_addr_2').focus();
                    }
                }
            }).open();
        });
    },
    /**
     * @brief 주소로 좌표구하기
     * @todo kakao api key change
     */
    addrSearch : function (){
        $.ajax({
            url : "https://dapi.kakao.com/v2/local/search/address.json",
            type : "GET",
            headers : {"Authorization":"KakaoAK e0df51e5220bc10bd8d606c35bd2c9eb"},
            data : {query : decodeURI(addr)},
            cache : false,	
            success : function(data){
                //console.log(data['documents'][0]['x']);
                $("#mb_coodr_x").val(data['documents'][0]['x']);
                $("#mb_coodr_y").val(data['documents'][0]['y']);
                console.log(data['documents'][0]['x']);
            },
            error: function(error) {
                console.log(error);
            }
        });	        
    }

};

/**
 * @biref formdata serializeObject change
 */
$.fn.serializeObject = function() {
    var obj = null;
    try {
        if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") 
        {
            var arr = this.serializeArray();
            if (arr) 
            {
                obj = {};
                jQuery.each(arr, function() {
                    obj[this.name] = this.value;
                });
            }
        }
    } 
    catch (e) 
    {
        alert(e.message);
    } 
    finally { }
 
    return obj;
};

/**
 * @brief formdata file object change
 */
$.fn.serializeFiles = function() {
    var form = $(this),
        formData = new FormData()
        formParams = form.serializeArray();

    $.each(form.find('input[type="file"]'), function(i, tag) {
        $.each($(tag)[0].files, function(i, file) {
            formData.append(tag.name, file);
        });
    });

    $.each(formParams, function(i, val) {
        formData.append(val.name, val.value);
    });

    return formData;
};




