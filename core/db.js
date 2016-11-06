var fs = require('fs');
var ext = '.js';
var pathTable = {};

module.exports = (pathDb) => {
  return new Db({pathDb: pathDb});
}


/**
 * Class manage Database
 */
class Db{
  constructor(config){

    Object.assign(this, config);

    this.tables = {};

    // check if path is ok, and Load tables of database, if not create it
    try {
      fs.accessSync(this.pathDb, fs.F_OK);

      let files = fs.readdirSync(this.pathDb);
      files.forEach(file => {
        this.tables[file.replace(ext, '')] = createTable(this.pathDb, file.replace(ext, ''));
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   * get table, if not exists, create it
   */
  use(table){
    if(undefined === this.tables[table]){
      this.tables[table] =  createTable(this.pathDb, table);
    }
    return this.tables[table];
  }
}


/**
 * create instance class Table
 * @param  {string} path  Path to table file
 * @param  {string} table name of table
 * @return {Class Table}  return instance of table
 */
function createTable(path, table){
  return new Table(path, table)
}


/**
 * Check if file of database exists
 * If not create it
 * @param  {string} path Path of table to check
 */
function checkPathTable(path){
  try {
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    fs.writeFileSync(path, "{}");
  }
}


/**
 * Sort object in order alphabelic on first floor
 * @param  {object} param Object to sort
 * @return {object}       object sorting
 */
function sortObject(param){
  let result = {};
  for(let item of Object.keys(param)){
    result[item] = param[item];
  }
  return result;
}


/**
 * Class table for manage table independently
 */
class Table{
  constructor(path, table){
    this.name = table;
    pathTable[table] = path + '/' + table + ext;

    checkPathTable(pathTable[this.name]);
    this.datas = JSON.parse(fs.readFileSync(pathTable[table]).toString('utf-8'));
    return this;
  }

  /**
   * Find one entry by id
   */
  findById(id){
    if(this.datas[id]){
      return this.datas[id];
    }
    return false;
  }

  /**
   * return all table
   */
  list(){
    let result = [];
    for(let key in this.datas){
      result.push(Object.assign({}, this.datas[key], {id: key}));
    }
    return result;
  }

  /**
   * Find several entry by params
   */
  find(param){
    let results = [];

    // change json format on regexp format
    let paramString = JSON.stringify(sortObject(param)).replace('{', '(').replace('}', ')').replace('","', '").("');
    for(let key in this.datas){
      let item = this.datas[key];
      let itemString = JSON.stringify(item);
      let reg = new RegExp(paramString, 'g');
      if(reg.test(itemString)){
        results.push(Object.assign(item, {id: key}));
      }
    }
    return (results.length) ? results : false;
  }

  /**
   * Delete one entry
   */
  del(id){
    delete this.datas[id];
    return this;
  }


  /**
   * set data by id
   */
  set(id, data){
    if(this.datas[id]){
      if(data.id){
        delete data.id;
      }
      this.datas[id] = data;
    }
  }

  /**
   * Save file and data
   */
  save(){
    fs.writeFileSync(pathTable[this.name], JSON.stringify(this.datas), 'utf-8');
  }

  /**
   * Create one entry
   */
  push(data){
    // check id for increment
    let id = parseInt(Object.keys(this.datas)[Object.keys(this.datas).length - 1], 10) + 1

    // set data
    this.datas[id] = data;
    return this;
  }
}
