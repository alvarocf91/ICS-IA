
const fs = require('fs');
const path = require('path');

const contenido = `
node_modules/
build/
.env
.DS_Store
.vscode/
`;

fs.writeFile(
  path.join(__dirname, '.gitignore'),
  contenido.trim(),
  (err) => {
    if (err) {
      console.error('❌ Error al crear el archivo .gitignore:', err);
    } else {
      console.log('✅ Archivo .gitignore creado exitosamente.');
    }
  }
);
