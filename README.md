# TV Corporativa Minu - Player Web

Uma aplicação React leve e performática desenvolvida para exibição de conteúdo corporativo em telas (modo kiosk). Baseada em designs específicos da Minu, com foco em responsividade e facilidade de manutenção.

## Stack Tecnológico

- **React 18+ (Vite)**: Core da aplicação.
- **TypeScript**: Segurança de tipos e intellisense.
- **Tailwind CSS**: Estilização utilitária e responsiva.
- **Lucide React**: Ícones leves.

## Instalação e Execução

1.  Instale as dependências:
    ```bash
    npm install
    # ou
    yarn
    ```

2.  Rode o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

3.  Acesse `http://localhost:5173` (ou a porta indicada).

## Funcionalidades Principais

### 1. Stage Escalável (`src/app/Stage.tsx`)
O coração da responsividade. Ao invés de usar media queries complexas para cada elemento, renderizamos o conteúdo em um container fixo de `1920x1080` (resolução base do design).
Este container é transformado via CSS `transform: scale(...)`. O cálculo é feito no hook `useEffect`:
- Captura `window.innerWidth` e `window.innerHeight`.
- Calcula o fator de escala: `Math.min(viewportW / 1920, viewportH / 1080)`.
- Aplica o scale no container centralizado.
Isso garante que o layout seja **pixel-perfect** em relação ao design original, independente se a TV é 720p, 1080p ou 4K.

### 2. Motor do Player (`src/app/Player.tsx`)
Gerencia o estado da apresentação:
- **Timer**: Usa `setTimeout` recursivo baseado na duração de cada slide definida no JSON.
- **Fullscreen**: Integração com a API nativa do navegador (`requestFullscreen`).
- **Atalhos de Teclado**:
  - `Setas`: Navegação manual.
  - `Espaço`: Pausar/Retomar.
  - `F`: Alternar Fullscreen.
- **Controles**: Uma barra flutuante aparece ao mover o mouse ou teclar, desaparecendo após 3 segundos.

### 3. Sistema de Slides
Os slides são componentes React isolados em `src/slides/`.
- **Registry**: `src/slides/registry.ts` mapeia strings (ex: `'birthday'`) para os componentes importados.
- **Playlist**: `src/content/playlist.json` define a ordem e as `props` passadas para cada slide.

## Adicionando Novos Slides

1.  **Crie o Componente**: Crie um novo arquivo em `src/slides/`, por exemplo `NewSlide.tsx`. Use Tailwind para estilizar seguindo o padrão 1920x1080.
2.  **Registre**: Adicione a importação e a chave no objeto `SLIDE_COMPONENTS` em `src/slides/registry.ts`.
3.  **Adicione à Playlist**: Edite `src/content/playlist.json` e adicione uma entrada no array `slides` com o `type` registrado e as `props` necessárias.

## Boas Práticas de Performance
- **Assets**: Imagens externas (fotos de colaboradores) são pré-carregadas 1 slide antes de aparecerem para evitar "piscas".
- **SVG Leve**: Formas complexas (ondas, arcos) são desenhadas via SVG (`src/components/Shapes.tsx`) ao invés de imagens PNG pesadas.
- **Zero Layout Shift**: O uso do Stage fixo evita que fontes carreguem em tamanhos errados e pulem na tela.

---
Desenvolvido para Minu - Pessoas & Cultura.
