(function() {

    document.addEventListener('DOMContentLoaded', function() {

        var gridDiv = document.querySelector('#myGrid');

        var monthValueGetter = "ctx.selectedMonth<colDef.monthIndex ? data[colDef.field + '_bud'] : data[colDef.field + '_act']";
        var renewTypeClassRules = {
            'current-price': 'x=="current-price"',
            'current-term': 'x=="current-term"',
            'monthly':'x=="monthly"',
            'no-renew': 'x=="no-renew"',
            'renew': 'x=="renew"',
            'revised':'x=="revised"'
        };
      

        var gridOptions = {
            context: {selectedMonth: 0},
            enableRangeSelection:false,
            
            suppressMenuHide: true,
            pagination: false,
            enableColResize: true,
            enableSorting: true,
            enableFilter: true,
            enableFilter:false,
            defaultColDef: {
                editable: true,
                enableRowGroup: true,
                enablePivot: true,
                enableValue: false,
                autoHeight:true

            },
            singleClickEdit: false,
            suppressMovableColumns:true,
            suppressSizeToFit:true,
            

            rowSelection: 'single',
            columnDefs: [
                {headerName:'',children:[
                    {headerName: 'Term', field: 'term',checkboxSelection:true,suppressMenu: true,suppressSizeToFit:false,autoHeight:true},
                    {headerName: 'Primary Auto Renew type',monthIndex:0,  field: 'primary_auto_renew_type',cellClassRules: renewTypeClassRules,cellRenderer:renewTypeRenderer,autoHeight:true},
                    {headerName: 'Secondary Auto Renew type',monthIndex:1, field: 'secondary_auto_renew_type',cellClassRules: renewTypeClassRules,cellRenderer:renewTypeRenderer},
                    {headerName: 'Utility', field: 'utility'},
                    {headerName: 'previous Price', field: 'previous_price'},
                    {headerName: 'Basic Services Prices', field: 'basic_services_proces'},
                    {headerName: 'Basic Services Proces to', field: 'basic_services_process_to'},
                    {headerName: 'Schedule', field: 'schedule'},
                    {headerName: 'Price (c/kWh)', field: 'price'},
                    {headerName: 'Rate Code', field: 'rate_code'},
                    {headerName: 'ETF ($)', field: 'etf'},
                    {headerName: 'Cancellation Type', field: 'cancelation-type'},
                    
                ]},
                {headerName:'Aquisition Margins',children:[
                    {headerName: 'Margin ($/MWh)', field: 'margin'},
                    {headerName: 'COP', field: 'cop' },
                ],
                cellClass:'aquisition-margins-group'
            },
                {headerName:'Web CH',children:[
                    {headerName: 'AQ', field: 'web_aq',checkboxSelection:true},
                    {headerName: 'RL', field: 'web_rl',checkboxSelection:true},
                ],cellClass:'web-group'},
                {headerName:'IBTM CH',children:[
                    {headerName: 'AQ', field: 'ibtm_aq',checkboxSelection:true},
                    {headerName: 'RL', field: 'ibtm_rl',checkboxSelection:true},
                    {headerName: 'RT', field: 'ibtm_rt',checkboxSelection:true}
                ],cellClass:'ibtm-group'}
                
            
            ]
        };
        function renewTypeClassRules(params){
            return params.value;
        }

        gridOptions.getRowClass = function(params) {
            if (params.node.rowIndex % 2 === 0) {
                return 'grey-row';
            }
        }

        function renewTypeRenderer(params) {
            if (params.value =="auto-renew") {
                return '<i><i>';
            } else {
            //    return params.value.toLocaleString();
            }
        }

        new agGrid.Grid(gridDiv, gridOptions);

        jsonLoad( function(data) {
            gridOptions.api.setRowData(data);
            gridOptions.api.sizeColumnsToFit();
        });

    });

})();


function jsonLoad(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.myjson.com/bins/1d8ayg'); // by default async
    xhr.responseType = 'json'; // in which format you expect the response to be
    xhr.onload = function() {
        if(this.status == 200) {// onload called even on 404 etc so check the status
            callback(this.response);
        }
    };
    xhr.onerror = function() {
        console.log('loading data error');
    };

    xhr.send();
}