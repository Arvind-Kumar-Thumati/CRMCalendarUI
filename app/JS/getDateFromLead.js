var id, module;
ZOHO.embeddedApp.on("PageLoad", function (data) {        
    module = data.Entity;                  
    id = data.EntityId;                                
    // console.log("Id "+id+" entity "+entity);

    ZOHO.CRM.API.getRecord({
        Entity: module,
        RecordID: id
    })        
    .then( function (record){

        // {data: Array(1), $responseHeaders: {…}}
        // $responseHeaders: {x-ratelimit-remaining: null, x-ratelimit-limit: null, x-ratelimit-reset: null}
        // data: [{…}]
        // [[Prototype]]: Object

        // data: Array(1)
        // 0: {Owner: {…}, Company: 'from terminal', Email: null, $currency_symbol: '$', $field_states: null, …}
        // length: 1
        // [[Prototype]]: Array(0)

        return record.data[0];
    })
    .then(function (record) {        
        modified_time = new Date(record["Modified_Time"])                                
        if(cal === undefined){
            var ele = document.getElementById('calendar');
            var opts = { abbrDay: true };  
            cal = new calendar(ele, opts);         
        }
        cal.month = modified_time.getMonth();
        cal.year = modified_time.getFullYear();
        cal.drawCalendar();                                                               
    })
    .then(function(){
        cal.selectDate(modified_time);
    })  
})                                    

ZOHO.embeddedApp.init();