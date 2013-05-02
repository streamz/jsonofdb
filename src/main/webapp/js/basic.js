
var jvmstore = new Ext.data.JsonStore({
    autoDestroy: true,
    url: './jvmstats.jsp',
    root: 'rows',
    idProperty: 'name',
    fields: ['name','version','arch','runtime','vendor','freemem','totalmem','maxmem','procs']
});

var jvmstatus = {
    id: 'jvm-status-panel',
    title: 'JVM Status',
    layout: 'fit',

    listeners: {
            beforeshow:function(){
                jvmstore.load();                
            }
    },
    
    defaults: {
        bodyStyle: 'padding:15px;',
        width: 200,
        height: 100,
        frame: true
    },
    items:[{
        xtype: 'grid',
        layout: 'fit',
        store: jvmstore,

        columns: [
            {header: 'OS Name', width: 100, sortable: false, dataIndex: 'name'},
            {header: 'OS Version', width: 100, sortable: false, dataIndex: 'version'},
            {header: 'OS Architecture', width: 100, sortable: false, dataIndex: 'arch'},
            {header: 'JVM Version', width: 150, sortable: false, dataIndex: 'runtime'},
            {header: 'JVM Vendor', width: 100, sortable: false, dataIndex: 'vendor'},
            {header: 'JVM Free Memory', width: 150, sortable: false, dataIndex: 'freemem'},
            {header: 'JVM Total Memory', width: 150, sortable: false, dataIndex: 'totalmem'},
            {header: 'JVM Max Memory', width: 150, sortable: false, dataIndex: 'maxmem'},
            {header: 'JVM Available Processors', width: 200, sortable: false, dataIndex: 'procs'}
        ]
    }]
};

var dbstatsstore = new Ext.data.JsonStore({
    autoDestroy: true,
    url: './dbstats.jsp',
    root: 'records',
    idProperty: 'VARIABLE_NAME',
    fields: ['VARIABLE_NAME','VARIABLE_VALUE']
});

var databasestatus = {
    id: 'db-server-status-panel',
    title: 'Database Status',
    layout: 'fit',

    listeners: {
            beforeshow:function(){
                dbstatsstore.load();
            }
    },

    defaults: {
        bodyStyle: 'padding:15px;',
        width: 200,
        height: 100,
        frame: true
    },
    items:[{
        xtype: 'grid',
        layout: 'fit',
        store: dbstatsstore,

        columns: [
            {header: 'Variable', width: 300, sortable: false, dataIndex: 'VARIABLE_NAME'},
            {header: 'Value', width: 300, sortable: false, dataIndex: 'VARIABLE_VALUE'}
        ]
    }]
};

var dbprocstore = new Ext.data.JsonStore({
    autoDestroy: true,
    url: './dbprocstats.jsp',
    root: 'records',
    idProperty: 'Id',
    fields: ['Id','User','Host','db','Command','Time','State','Info']
});
var processstatus = {
    id: 'db-proc-status-panel',
    title: 'Process Status',
    layout: 'fit',

    listeners: {
            beforeshow:function(){
                dbprocstore.load();
            }
    },

    defaults: {
        bodyStyle: 'padding:15px;',
        width: 200,
        height: 100,
        frame: true
    },
    items:[{
        xtype: 'grid',
        layout: 'fit',
        store: dbprocstore,

        columns: [
            {header: 'Process Id', width: 100, sortable: false, dataIndex: 'Id'},
            {header: 'Login', width: 100, sortable: false, dataIndex: 'User'},
            {header: 'Host', width: 150, sortable: false, dataIndex: 'Host'},
            {header: 'Schema', width: 100, sortable: false, dataIndex: 'db'},
            {header: 'Command', width: 150, sortable: false, dataIndex: 'Command'},
            {header: 'Time', width: 150, sortable: false, dataIndex: 'Time'},
            {header: 'State', width: 150, sortable: false, dataIndex: 'State'},
            {header: 'Info', width: 200, sortable: false, dataIndex: 'Info'}
        ]
    }]
};

var dbtablestatusstore = new Ext.data.JsonStore({
    autoDestroy: true,
    url: './dbtablestats.jsp',
    root: 'records',
    idProperty: 'TABLE_NAME',
    fields: ['TABLE_NAME','ENGINE','VERSION','ROW_FORMAT','TABLE_ROWS','AVG_ROW_LENGTH',
             'DATA_LENGTH','MAX_DATA_LENGTH','INDEX_LENGTH','DATA_FREE','AUTO_INCREMENT',
             'CREATE_TIME','UPDATE_TIME','CHECK_TIME','TABLE_COLLATION','CHECKSUM','CREATE_OPTIONS','TABLE_COMMENT']
});

var tablestatus = {
    id: 'db-table-status-panel',
    title: 'Table Status',
    layout: 'fit',

    listeners: {
            beforeshow:function(){
                dbtablestatusstore.load();
            }
    },

    defaults: {
        bodyStyle: 'padding:15px;',
        width: 200,
        height: 100,
        frame: true
    },
    items:[{
        xtype: 'grid',
        layout: 'fit',
        store: dbtablestatusstore,

        columns: [
            {header: 'Table', width: 150, sortable: false, dataIndex: 'TABLE_NAME'},
            {header: 'Engine', width: 100, sortable: false, dataIndex: 'ENGINE'},
            {header: 'Rows', width: 100, sortable: false, dataIndex: 'TABLE_ROWS'},
            {header: 'Data Free', width: 100, sortable: false, dataIndex: 'DATA_FREE'},
            {header: 'Created', width: 150, sortable: false, dataIndex: 'CREATE_TIME'},
            {header: 'Updated', width: 150, sortable: false, dataIndex: 'UPDATE_TIME'},
            {header: 'Coallation', width: 150, sortable: false, dataIndex: 'TABLE_COLLATION'},
            {header: 'Comment', width: 200, sortable: false, dataIndex: 'TABLE_COMMENT'}
        ]
    }]
};

//DESCRIBE+{tbl name}
//{"COLUMN_NAME":"id","COLUMN_TYPE":"int(11)","IS_NULLABLE":"NO","COLUMN_KEY":"PRI",
//"COLUMN_DEFAULT":null,"EXTRA":"auto_increment"}

//SHOW+INDEX+FROM+{tbl name}
//{"TABLE_NAME":"venue","NON_UNIQUE":"0","INDEX_NAME":"PRIMARY","SEQ_IN_INDEX":"1",
//"COLUMN_NAME":"id","COLLATION":"A","CARDINALITY":"3948","SUB_PART":null,"PACKED":null,
//"NULLABLE":"","INDEX_TYPE":"BTREE","COMMENT":""}

//SHOW+KEYS+FROM+{tbl name}
//{"TABLE_NAME":"venue","NON_UNIQUE":"0","INDEX_NAME":"PRIMARY","SEQ_IN_INDEX":"1",
//"COLUMN_NAME":"id","COLLATION":"A","CARDINALITY":"3963","SUB_PART":null,"PACKED":null,
//"NULLABLE":"","INDEX_TYPE":"BTREE","COMMENT":""}

var schemastore = new Ext.data.JsonStore({
    autoDestroy: true,
    url: './dbtables.jsp',
    root: 'records',
    idProperty: 'TABLE_NAME',
    fields: ['TABLE_NAME']
});

var schemaexplorer = {
    id: 'db-schema-explorer-panel',
    title: 'Schema Explorer',
    layout: 'fit',

    listeners: {
            beforeshow:function(){
                schemastore.load();
            }
    },

    defaults: {
        bodyStyle: 'padding:15px;',
        width: 200,
        height: 100,
        frame: true
    },
    items:[{
        xtype: 'grid',
        layout: 'fit',
        store: schemastore,
        listeners: {

            rowclick:function(grid, row, e){
                var str = grid.store.data.keys[row];
                alert('click row:' + str)
            }
        },
        columns: [
            {header: 'Table Name', width: 300, sortable: false, dataIndex: 'TABLE_NAME'}
        ]
    }]
};

var describeStore = new Ext.data.JsonStore({
    autoDestroy: true,
    url: './describe.jsp',
    root: 'records',
    idProperty: 'field',
    fields: ['field', 'type', 'null', 'key', 'default', 'extra']
});

var describeExplorer = {
    id: 'db-schema-explorer-panel2',
    layout: 'fit',

    listeners: {
            beforeshow:function(){
                schemastore.load();
            }
    },

    defaults: {
        bodyStyle: 'padding:15px;',
        width: 200,
        height: 100,
        frame: true
    },
    items:[{
        xtype: 'grid',
        layout: 'fit',
        store: schemastore,
        listeners: {

            rowclick:function(grid, row, e){
                var str = grid.store.data.keys[row];
                alert('click row:' + str)
            }
        },
        columns: [
            {header: 'Field', width: 150, sortable: false, dataIndex: 'field'},
            {header: 'Type', width: 150, sortable: false, dataIndex: 'type'},
            {header: 'Null', width: 75, sortable: false, dataIndex: 'null'},
            {header: 'Key', width: 75, sortable: false, dataIndex: 'key'},
            {header: 'Default', width: 75, sortable: false, dataIndex: 'default'},
            {header: 'Extra', width: 75, sortable: false, dataIndex: 'extra'}
        ]
    }]
};

var jsonquery = {
    id: 'json-query-panel',
    title: 'Query Results',
    layout: 'fit',
    autoScroll:true,
    xtype: 'box',
        autoEl: {id: 'myId'},
        html: '',
        width: 300
};

function getData(params){
    Ext.Ajax.request({
       url: 'http://localhost:8080/jsonofdb/query/sql/raw?' + Ext.urlEncode(params),
       success: function(response, request) {
            return response.responseText;
       },
       failure: function(results, request) {
            alert('Error');
            return response.responseText;
       }
    });
}

function getKeys(o) {

    var accumulator = [];
    for (var propertyName in o) {
        accumulator.push(propertyName);
    }

    return accumulator;
}

function getValues(o) {

    var accumulator = [];
    for (var propertyName in o) {
        accumulator.push(o[propertyName]);
    }

    return accumulator;
}

function getColumns(json){
    var records = json.records;
    var keys = getKeys(records[0]);
    var columns = [];

    for (i = 0; i < keys.length; ++i) {
        columns.push({header: keys[i], width: 200, dataIndex: keys[i]});
    }

    return columns;
}

function getFields(json){
    var records = json.records;
    var keys = getKeys(records[0]);
    var fields = [];

    for (i = 0; i < keys.length; ++i) {
        fields.push({name: keys[i]});
    }

    return fields;
}

function getRecords(json){
    var records = json.records;
    var recs = [];

    for (i = 0; i < records.length; ++i) {
        recs.push(getValues(records[i]));
    }

    return recs;
}

function createGrid(json) {
    
    var arrayStore = new Ext.data.ArrayStore({
        storeId  : 'arrayStore',
        autoDestroy : true,
        fields: getFields(json)
    });

    var grid = new Ext.grid.GridPanel({
        store: arrayStore,
        colModel: new Ext.grid.ColumnModel({
            defaults: {
                width: 120,
                sortable: true
            },
            columns: getColumns(json)
        })});

    jsonquery.items = [grid];
    arrayStore.loadData(getRecords(json));
}

var sqlpanel = new Ext.FormPanel({
        id:'sql-panel',
        anchor: '100%',
        collapsible:true,
        layout:'fit',
        defaultType:'textfield',
        items:[{
                fieldLabel:'SQL Query',
                name:'sql',
                allowBlank:false
            }],
        buttons:[{
            cls:'x-btn-text-icon',
            icon: './img/drop-yes.gif',
            text:'Submit',
            // Function that fires when user clicks the button
            handler:function(){
                var params = {sql: sqlpanel.getForm().findField('sql').getRawValue()};
                Ext.Ajax.request({
                   url: 'http://localhost:8080/jsonofdb/query/sql/raw?' + Ext.urlEncode(params),
                   success: function(response, request) {
                        var jsonData = Ext.util.JSON.decode(response.responseText);
                        Ext.get('myId').update(response.responseText);

                   },
                   failure: function(results, request) {
                        alert('Error');
                   }
                });
            } 
        }]
    });