# Landing Page - O Antipoderoso Mostardinha

## Descrição

Esta é uma landing page encantadora, interativa e responsiva criada para promover e vender o livro digital infantil "O Antipoderoso Mostardinha" de Gabriel Jaccoud. A página foi desenvolvida com foco na conversão e no encantamento de famílias, educadores e amantes de histórias transformadoras.

## Características

### Design e Estética
- **Paleta de cores**: Amarelo mostarda, azul celeste, vermelho coral e verde natureza
- **Tipografia**: Fonte Fredoka (arredondada e amigável)
- **Estilo visual**: Universo lúdico do Mostardinha com elementos dos mundos de Nostradia e Iberópolis
- **Animações**: Elementos flutuantes (estrelas, balões, notas musicais) com efeito parallax

### Funcionalidades
- **Trilha sonora**: Reprodução automática da música tema do Mostardinha com controle de play/pause
- **Design responsivo**: Adaptado para desktop, tablet e celular
- **Animações suaves**: Efeitos de scroll reveal e microinterações
- **Navegação intuitiva**: Scroll suave entre seções
- **Integração YouTube**: Embed do audiobook gratuito

### Seções Incluídas
1. **Header**: Logo animado e controle de áudio
2. **Hero Section**: Apresentação principal com call-to-action
3. **Sobre a História**: Descrição do livro e seus valores
4. **Galeria de Ilustrações**: Showcase das cenas marcantes
5. **Audiobook Gratuito**: Player do YouTube integrado
6. **Depoimentos**: Feedback de famílias e educadores
7. **Sobre o Autor**: Apresentação de Gabriel Jaccoud
8. **Chamada Final**: CTAs para compra e escuta
9. **Footer**: Links úteis e informações de contato

## Como Usar

### Visualização Local
1. Extraia todos os arquivos em uma pasta
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. A página funcionará completamente offline (exceto o vídeo do YouTube)

### Hospedagem
Para hospedar a landing page online:

1. **Hospedagem Simples**: Faça upload de todos os arquivos para qualquer servidor web
2. **GitHub Pages**: Crie um repositório e ative o GitHub Pages
3. **Netlify/Vercel**: Arraste a pasta para o painel de deploy
4. **Servidor próprio**: Configure um servidor web (Apache/Nginx)

### Personalização

#### Alterando Conteúdo
- Edite o arquivo `index.html` para modificar textos e estrutura
- Substitua imagens na pasta `assets/images/`
- Atualize links do YouTube nas seções correspondentes

#### Modificando Estilos
- Edite o arquivo `style.css` para alterar cores, fontes e layout
- As variáveis CSS estão definidas no `:root` para fácil customização
- Paleta de cores atual:
  ```css
  --amarelo-mostarda: #F4D03F;
  --azul-celeste: #85C1E9;
  --vermelho-coral: #F1948A;
  --verde-natureza: #82E0AA;
  --roxo-sonho: #D7BDE2;
  ```

#### Funcionalidades JavaScript
- Edite o arquivo `script.js` para modificar comportamentos
- Controle de áudio, animações e efeitos de scroll estão implementados

## Estrutura de Arquivos

```
mostardinha-landing/
├── index.html              # Página principal
├── style.css               # Estilos e responsividade
├── script.js               # Funcionalidades interativas
├── README.md               # Este arquivo
└── assets/
    ├── temamostardinha.wav  # Trilha sonora
    └── images/              # Todas as imagens do projeto
        ├── CAPA.png         # Capa do livro
        ├── 13-BANDA.png     # Banda de Nostradia
        ├── 28-ILHA.png      # Ilha da Empatia
        ├── 48-FESTIVAL.png  # Festival Final
        ├── 52-VINHETAFINAL.png # Mostardinha e a pedra
        ├── mago2.png        # Foto do autor
        └── [outras imagens] # Personagens e cenas
```

## Compatibilidade

- **Navegadores**: Chrome, Firefox, Safari, Edge (versões modernas)
- **Dispositivos**: Desktop, tablet, smartphone
- **Tecnologias**: HTML5, CSS3, JavaScript ES6+

## Otimizações Implementadas

- **Performance**: Lazy loading de imagens, debounce em eventos de scroll
- **SEO**: Meta tags apropriadas, estrutura semântica
- **Acessibilidade**: Contraste adequado, navegação por teclado
- **Mobile-first**: Design responsivo com breakpoints otimizados

## Próximos Passos Sugeridos

1. **Integração de Pagamento**: Implementar gateway de pagamento (Stripe, PagSeguro, etc.)
2. **Analytics**: Adicionar Google Analytics ou similar
3. **Formulário de Contato**: Implementar captura de leads
4. **Otimização SEO**: Adicionar schema markup e meta tags avançadas
5. **Testes A/B**: Testar diferentes versões dos CTAs

## Suporte

Para dúvidas ou modificações, consulte:
- Documentação HTML/CSS/JavaScript
- Guias de hospedagem web
- Tutoriais de personalização

---

**Desenvolvido com ❤️ para o Mundo do Mostardinha**

*Uma jornada de sensibilidade que transforma o mundo através do amor, não da força.*

