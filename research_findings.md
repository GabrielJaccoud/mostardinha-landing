# Descobertas da Pesquisa - Deploy Three.js/GSAP no Vercel

## Problemas Comuns:
- **404 para Assets**: Frequentemente relacionado a caminhos incorretos ou configurações de build que não copiam os assets para o diretório de saída esperado.
- **Tela em Branco/Loading Infinito**: Pode ser causado por falha no carregamento de scripts JS, assets 3D (modelos .glb, texturas), ou problemas de inicialização do Three.js/GSAP.
- **Incompatibilidade de Ambiente**: O Vercel pode ter um ambiente de execução diferente do local, afetando como certas bibliotecas (especialmente as que interagem com o DOM ou WebGL de forma mais profunda) se comportam.

## Soluções Potenciais e Melhores Práticas:

### 1. Carregamento de Assets:
- **Caminhos Absolutos/Relativos**: Garantir que os caminhos dos assets (imagens, modelos 3D, áudios) sejam consistentes. Para Vite, mover assets para a pasta `public` e referenciá-los com `/` (caminho absoluto da raiz) é uma prática comum.
- **`assetsDir` no Vite**: Configurar `build.assetsDir` para garantir que os assets sejam colocados em um subdiretório específico dentro de `dist`.
- **`base` no Vite**: Definir `base: '/'` no `vite.config.js` para deployments na raiz do domínio, ou `base: '/seu-repo/'` para GitHub Pages.

### 2. Configuração do Vercel:
- **`vercel.json`**: Usar `buildCommand` e `outputDirectory` para especificar explicitamente como o Vercel deve construir e onde encontrar os arquivos de saída.
  ```json
  {
    "buildCommand": "pnpm run build",
    "outputDirectory": "dist"
  }
  ```
- **Ignorar Build Step**: Em alguns casos, se o build já foi feito localmente e o `dist` está no Git, pode-se configurar o Vercel para não rodar o build novamente, mas isso não é recomendado para CI/CD.

### 3. Otimização e Lazy Loading:
- **Lazy Loading**: Para Three.js e GSAP, que são bibliotecas pesadas, considerar o lazy loading de componentes ou módulos que os utilizam. Isso pode evitar que o aplicativo trave durante o carregamento inicial.
- **Otimização de Modelos 3D**: Reduzir o tamanho de modelos .glb/.gltf e texturas. Usar formatos otimizados (ex: draco compression).

### 4. Debugging:
- **Logs do Vercel**: Acessar os logs de build e runtime do Vercel para identificar erros específicos durante o processo de deploy ou execução.
- **Console do Navegador**: Verificar o console em produção para erros 404 ou erros de JavaScript que possam estar impedindo a inicialização.

## Próximos Passos:
1. Reconfirmar que todos os assets estão na pasta `public` e sendo referenciados com caminhos absolutos (`/images/mostardinha.png`).
2. Verificar a inicialização do Three.js e GSAP. Pode haver um problema de ordem de carregamento ou de ambiente.
3. Implementar lazy loading para os componentes que usam Three.js/GSAP.
4. Testar o build localmente novamente com as configurações mais recentes.
5. Reimplantar no Vercel.

