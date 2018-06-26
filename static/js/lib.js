document.write('<scr' + 'ipt type="text/javascript" src="'+'../../static/js/jquery-3.2.1.min.js'+'"></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="'+'../../static/js/vue.min.js'+'"></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="'+'../../static/js/elementUI.js'+'"></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="'+'../../static/js/axios.min.js'+'"></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="'+'../../static/js/vue-resource.min.js'+'"></scr' + 'ipt>');



//公共方法-地址栏取参方法
window.getQueryString = function(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)",'i');
    var r = window.location.search.substr(1).match(reg);
    if(r!=null){
        return unescape(r[2]);
    } 
    return null;
}

//公共方法-详情页显示图片  
//参数1：图片类型，参数2：图片代码
window.doFindPhoto = function(picType, picValue){
    axios.get('/api/util/doFindPhoto/' + picType + '/' + picValue).then(function (res) {
        var photo64 = res.data.result;
        var photo = document.getElementById("photo");
        if(photo64 == "" || photo64 == null){
            photo.src = "../../static/images/nopicture.png";
        }else{
            photo.src = "data:image/png;base64,"+photo64;
        }
    }.bind(this), function (error) {
        console.log(error)
    });
}
                    
//面包屑
window.loadBreadcrumb = function(firstName,secondName){
    var breadcrumb = [];
    breadcrumb.push('<div class="row main-container-header">');
    breadcrumb.push('<div class="col-md-12 rel">');
    breadcrumb.push('<div class="main-container-header-line fix">');
    breadcrumb.push('<div class="row">');
    breadcrumb.push('<div class="col-xs-6 col-md-6">');
    breadcrumb.push('<a class="a-back"');
    if(secondName == "-1"){
        breadcrumb.push('href="javascript:;"');
    }else{
        breadcrumb.push('href="javascript:history.go(-1)"')
    }
    breadcrumb.push('>'+ firstName +'</a>');
    if(secondName != "-1"){
        breadcrumb.push('<span>&gt;</span>');
        breadcrumb.push('<a class="a-back-detail" href="javascript:;">'+ secondName +'</a>');
    }
    breadcrumb.push('</div></div></div></div></div>');
    $("#breadcrumb_box").html(breadcrumb.join(''));
}

//分页大小修改事件
window.pageSizeChange = function(val) {
    vue.pageSize = val;
    vue.loadingData(); //重新加载数据
}

//当前页修改事件
window.currentPageChange = function(val) {
    vue.currentPage = val;
    vue.searchClick('page');
}

//表格重新加载数据
window.loadingData = function () {
    vue.loading = true;
    setTimeout(function () {
        console.info("加载数据成功");
        vue.loading = false;
    }, 300);
}

//日期格式化
window.dateFormat = function(val){
    var date = new Date(val);
    if (date == undefined) {
        return val;
    }
    var month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    var newDate = [year, month, day].join('-');
    return newDate;
}

//table日期格式化
window.tableDateFormat =  function (row, column) {
    debugger;
    var rowDate = row[column.property];
    if (rowDate == null || rowDate == "") {
        return '';
    } else {
        return dateFormat(rowDate);
    }
}

//数据格式化
window.dataFormat = function (row, column) {
    var rowDate = row[column.property];
    if (rowDate == null || rowDate == "") {
        return '无';
    } else {
        return rowDate;
    }
}
