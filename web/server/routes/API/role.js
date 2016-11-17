export default [
  {
		'name': 'role:list',
		'require': ['db'],
		'call': function(data, fc){
			fc(this.db.use('Roles').list());
		}
	}
];
