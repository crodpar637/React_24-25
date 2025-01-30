function logMensaje(mensaje) {
  console.log(mensaje);
}

function logErrorSQL(err){
  console.error('Error de MySQL:');
  console.error('Code:', err.code);
  console.error('Errno:', err.errno);
  console.error('SQL Message:', err.sqlMessage);
  console.error('SQL State:', err.sqlState);
}

module.exports = { logMensaje, logErrorSQL };