angular.module('RFio')
.factory('WebsqlService', WebsqlService);

function WebsqlService($rootScope, $webSql, Const) {
	
	var _db = $webSql.openDatabase(Const.DATABASE.name, Const.DATABASE.version, Const.DATABASE.description, Const.DATABASE.size);
	$rootScope.hasWebSql = !!_db;
	var noop = angular.noop;
		return {
			createTable: !!_db ? createTable : noop,
			del: !!_db ? del : noop,
			dropTable: !!_db ? dropTable : noop,
			insert: !!_db ? insert : noop,
			select: !!_db ? select : noop,
			selectAll: !!_db ? selectAll : noop,
			update: !!_db ? update : noop
		};
	
	
	function createTable(tableName, fields) {
		_db.createTable(tableName, fields);
	}
	
	function del(tableName, where) {
		return _db.update(tableName, where);
	}
	
	function dropTable(tableName) {
		_db.dropTable(tableName);
	}
	
	function insert(tableName, fields, replace) {
		return _db.insert(tableName, fields, replace);
	}
	
	function select(tableName, where) {
		return _db.select(tableName, where);
	}
	
	function selectAll(tableName) {
		return _db.select(tableName);
	}
	
	function update(tableName, where) {
		return _db.update(tableName, where);
	}
	
	
}