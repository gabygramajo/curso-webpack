import Template from '@templates/Template.js';
// importando los estilos
import '@styles/main.css';
// importando stylus
import '@styles/vars.styl';


(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
