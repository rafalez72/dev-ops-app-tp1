#!/usr/bin/env node

console.log('🔍 Validando estructura del proyecto...\n');

const fs = require('fs');
const path = require('path');

// Archivos que deben existir
const requiredFiles = [
  'docker-compose.yml',
  'docker-compose.prod.yml',
  'api/server.js',
  'api/package.json',
  'api/Dockerfile',
  'frontend/server.js',
  'frontend/package.json',
  'frontend/Dockerfile',
  'frontend/public/index.html',
  'frontend/public/app.js',
  '.github/workflows/ci-cd.yml',
  'setup.md',
  'README.md'
];

let allValid = true;

console.log('📁 Verificando archivos requeridos:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`   ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allValid = false;
});

console.log('\n🐳 Validando Dockerfiles:');
const dockerfiles = ['api/Dockerfile', 'frontend/Dockerfile'];
dockerfiles.forEach(dockerfile => {
  try {
    const content = fs.readFileSync(dockerfile, 'utf8');
    const hasFrom = content.includes('FROM node:18-alpine');
    const hasWorkdir = content.includes('WORKDIR /app');
    const hasExpose = content.includes('EXPOSE');
    const hasCmd = content.includes('CMD');

    console.log(`   📄 ${dockerfile}:`);
    console.log(`      ${hasFrom ? '✅' : '❌'} FROM node:18-alpine`);
    console.log(`      ${hasWorkdir ? '✅' : '❌'} WORKDIR /app`);
    console.log(`      ${hasExpose ? '✅' : '❌'} EXPOSE`);
    console.log(`      ${hasCmd ? '✅' : '❌'} CMD`);

    if (!hasFrom || !hasWorkdir || !hasExpose || !hasCmd) allValid = false;
  } catch (error) {
    console.log(`   ❌ Error leyendo ${dockerfile}`);
    allValid = false;
  }
});

console.log('\n🚀 Validando sintaxis JavaScript:');
const jsFiles = ['api/server.js', 'frontend/server.js'];
jsFiles.forEach(file => {
  try {
    require(path.resolve(file));
    console.log(`   ✅ ${file} - Sintaxis válida`);
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND' && error.message.includes('express')) {
      console.log(`   ✅ ${file} - Sintaxis válida (dependencias no instaladas)`);
    } else {
      console.log(`   ❌ ${file} - Error de sintaxis: ${error.message}`);
      allValid = false;
    }
  }
});

console.log('\n📦 Validando package.json:');
const packageFiles = ['api/package.json', 'frontend/package.json'];
packageFiles.forEach(file => {
  try {
    const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
    const hasName = !!pkg.name;
    const hasVersion = !!pkg.version;
    const hasDependencies = !!pkg.dependencies;
    const hasScripts = !!pkg.scripts;

    console.log(`   📄 ${file}:`);
    console.log(`      ${hasName ? '✅' : '❌'} name`);
    console.log(`      ${hasVersion ? '✅' : '❌'} version`);
    console.log(`      ${hasDependencies ? '✅' : '❌'} dependencies`);
    console.log(`      ${hasScripts ? '✅' : '❌'} scripts`);

    if (!hasName || !hasVersion || !hasDependencies || !hasScripts) allValid = false;
  } catch (error) {
    console.log(`   ❌ Error leyendo ${file}: ${error.message}`);
    allValid = false;
  }
});

console.log('\n🌐 Validando frontend:');
try {
  const indexHtml = fs.readFileSync('frontend/public/index.html', 'utf8');
  const appJs = fs.readFileSync('frontend/public/app.js', 'utf8');

  const hasTitle = indexHtml.includes('ToDo');
  const hasInput = indexHtml.includes('input');
  const hasScript = indexHtml.includes('app.js');
  const hasApiCalls = appJs.includes('fetch');
  const hasLocalhost = appJs.includes('localhost:3000');

  console.log(`   ${hasTitle ? '✅' : '❌'} Título ToDo en HTML`);
  console.log(`   ${hasInput ? '✅' : '❌'} Input para nuevas tareas`);
  console.log(`   ${hasScript ? '✅' : '❌'} Referencia a app.js`);
  console.log(`   ${hasApiCalls ? '✅' : '❌'} Llamadas fetch() a la API`);
  console.log(`   ${hasLocalhost ? '✅' : '❌'} URL de API configurada`);

  if (!hasTitle || !hasInput || !hasScript || !hasApiCalls || !hasLocalhost) allValid = false;
} catch (error) {
  console.log(`   ❌ Error validando frontend: ${error.message}`);
  allValid = false;
}

console.log(`\n🎯 Resultado final: ${allValid ? '✅ PROYECTO VÁLIDO' : '❌ NECESITA CORRECCIONES'}`);

if (allValid) {
  console.log('\n🚀 El proyecto está listo para:');
  console.log('   • Ejecutar con Docker Compose');
  console.log('   • Activar GitHub Actions');
  console.log('   • Desplegar en producción');
  console.log('\n📖 Consulta setup.md para instrucciones detalladas');
}

process.exit(allValid ? 0 : 1);