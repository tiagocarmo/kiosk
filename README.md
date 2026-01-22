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

Forçar porta (opções)

- Temporário (na sessão atual):

```bash
# no Linux/macOS
DEV_PORT=3000 npm run dev

# ou usar PORT (algumas infra-estruturas esperam PORT)
PORT=3000 npm run dev
```

- Via CLI do Vite:

```bash
npx vite --port 3000
```

- Permanente (projeto): o `vite.config.ts` já lê `DEV_PORT`/`PORT` e define `strictPort: true`, ou você pode alterar o script `package.json` para:

```json
"scripts": {
  "dev": "vite --port 3000"
}
```

Observação: com `strictPort: true` o servidor falhará se a porta estiver ocupada (não auto-incrementa). Isso evita que a porta mude automaticamente.

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

## Múltiplas Playlists (seleção via URL)

Este player carrega playlists dinamicamente no frontend por query param `?playlist=`. Para que o carregamento seja feito em runtime (sem necessidade de rebuild), coloque os JSONs de playlist em `public/playlists/`.

- Para usar a playlist padrão (arquivo `public/playlists/playlist.json`):
  - http://localhost:5173/
- Para usar uma playlist alternativa (ex.: `playlist-a.json`), abra a URL:
  - http://localhost:5173/?playlist=a

Exemplos incluídos no repositório (em `public/playlists/`):

- `public/playlists/playlist.json` — Default (defaultDuration: 10000ms)
- `public/playlists/playlist-a.json` — Destaques e comunicados curtos (defaultDuration: 8000ms)
- `public/playlists/playlist-b.json` — Comunicados e aniversariantes (defaultDuration: 12000ms)
- `public/playlists/playlist-c.json` — Resumo mensal e eventos (defaultDuration: 7000ms)

Observação de deploy:

- Arquivos em `public/` são servidos estaticamente tanto no dev (`vite`) quanto no build/host. Esse é o comportamento desejado quando você quer trocar playlists sem rebuild.

Se preferir playlists embutidas no bundle (menos dinâmico, mas sem necessidade de copiar para `public/`), podemos usar `import.meta.glob` — porém isso exige rebuild para qualquer mudança de arquivo.

## Tipos de slides (slide.type) e suas props

Cada item em `slides` no JSON deve conter um `type` que corresponde a um componente em `src/slides/registry.ts`. Abaixo estão os tipos suportados atualmente e as props que cada slide espera.

- cover — componente: `src/slides/CoverSlide.tsx`
  - props:
    - `monthLabel` (string) — texto pequeno exibido no canto (ex.: "Janeiro 2026"). **Obrigatório**.
    - `backgroundColor` (string) — cor de fundo CSS (ex.: `#00C800`). **Opcional** (default `#00C800`).
    - `title` (string) — título principal. **Opcional** (default `TV CORPORATIVA`).

- birthday — componente: `src/slides/BirthdaySlide.tsx`
  - props:
    - `title` (string) — texto do cabeçalho (ex.: "ANIVERSARIANTE DO DIA"). **Obrigatório**.
    - `personName` (string) — nome da pessoa. **Obrigatório**.
    - `area` (string) — área / time da pessoa. **Obrigatório**.
    - `dateLabel` (string) — data exibida (ex.: "22 de janeiro"). **Obrigatório**.
    - `photoAsset` (string) — URL da foto (opcional). Se ausente, mostra placeholder.

- tenure — componente: `src/slides/TenureSlide.tsx`
  - props:
    - `title` (string) — texto do cabeçalho. **Obrigatório**.
    - `personName` (string) — nome da pessoa. **Obrigatório**.
    - `area` (string) — área / time. **Obrigatório**.
    - `dateLabel` (string) — data/label exibido. **Obrigatório**.
    - `yearsNumber` (number) — anos de casa (badge grande). **Obrigatório**.
    - `photoAsset` (string) — URL da foto (opcional). Se ausente, mostra placeholder.

- news — componente: `src/slides/NewsSlide.tsx`
  - props:
    - `title` (string) — título da seção (ex.: "ACONTECEU NA MINU"). **Obrigatório**.
    - `monthLabel` (string) — label grande secundário (ex.: "Janeiro/26"). **Obrigatório**.
    - `bullets` (string[]) — array de itens de notícia a serem listados. **Obrigatório** (pelo menos vazio `[]`).
    - `themeColor` (string) — cor de destaque para a forma (opcional, default `#ff66b2`).

- area-info — componente: `src/slides/AreaInfoSlide.tsx`
  - props:
    - `title` (string) — título principal. **Obrigatório**.
    - `bodyText` (string) — texto longo do corpo; respeita quebras de linha (`\n`) e `whitespace-pre-line`. **Obrigatório**.
    - `themeColor` (string) — cor de fundo/tema para a metade direita (opcional, default `#87ceeb`).

- pdf — componente: `src/slides/PdfSlide.tsx`
  - props:
    - `url` (string) — URL pública para o arquivo PDF que será incorporado. **Obrigatório**.
    - `title` (string) — título exibido acima do PDF. **Opcional** (default: "Documento").
    - `backgroundColor` (string) — cor de fundo do slide (opcional, default `#FEFEF5`).

  Observações para o `pdf` slide:

  - O PDF é incorporado com um `<iframe src="..." />`. Para funcionar corretamente, a URL deve apontar para um arquivo que permita embed (alguns servidores bloqueiam via headers `X-Frame-Options`).
  - Para servir PDFs localmente, coloque-os em `public/assets/docs/` e use uma URL como `/assets/docs/manual.pdf`.

  Exemplo de entrada no JSON de playlist:

  ```json
  {
    "type": "pdf",
    "props": {
      "url": "/assets/docs/manual.pdf",
      "title": "Manual de Processos",
      "backgroundColor": "#ffffff"
    }
  }
  ```

- image — componente: `src/slides/ImageSlide.tsx`
  - props:
    - `url` (string) — URL pública da imagem a ser exibida em tela cheia. **Obrigatório**.
    - `alt` (string) — texto alternativo da imagem (opcional).
    - `mode` (string) — `cover` | `contain` (opcional, default `cover`). `cover` preenche a tela mantendo proporção (pode cortar), `contain` mostra a imagem inteira com possível letterbox.
    - `backgroundColor` (string) — cor de fundo enquanto a imagem carrega ou em áreas vazias (opcional, default `#000000`).
    - `title` (string) — título pequeno opcional exibido no topo (opcional).

  Observações para o `image` slide:

  - O slide usa `<img>` com `object-fit` para ajustar a imagem na tela. Por padrão `mode: "cover"` é usado para preencher a tela de forma visualmente agradável.
  - Se a imagem falhar ao carregar, é exibido um placeholder com a mensagem "Imagem não disponível".

  Exemplo de entrada no JSON de playlist:

  ```json
  {
    "type": "image",
    "props": {
      "url": "https://cdn.prod.website-files.com/5f81e0a696115863da6ee0ef/616f011302cb8854fcd0e17a_img_hero3-(1)%20(1).png",
      "title": "Imagem Exemplo",
      "mode": "cover",
      "backgroundColor": "#000000"
    }
  }
  ```

- iframe — componente: `src/slides/IframeSlide.tsx`
  - props:
    - `url` (string) — URL pública que será carregada no iframe. **Obrigatório**.
    - `title` (string) — título exibido no topo do slide (opcional).
    - `backgroundColor` (string) — cor de fundo do slide (opcional, default `#000000`).
    - `allow` (string) — lista de permissões para o iframe (`allow` attribute), opcional.
    - `allowFullScreen` (boolean) — permitir fullscreen no iframe (default: `true`).

  Observações para o `iframe` slide:

  - O slide posiciona um `<iframe>` full-bleed ocupando toda a área do slide. Para funcionar, o destino deve permitir embed (sem `X-Frame-Options: DENY/SAMEORIGIN`).
  - URLs que exigem autenticação ou tokens (dashboards internos, ferramentas SaaS) podem não funcionar corretamente sem configuração de CORS/cookies/autenticação apropriada.
  - Caso o iframe não carregue por restrições do servidor destino, é recomendado hospedar a página/visualização em um local que permita embed ou usar integrações específicas (ex.: APIs, PDF.js para documentos).

  Exemplo de entrada no JSON de playlist:

  ```json
  {
    "type": "iframe",
    "props": {
      "url": "https://app.datadoghq.com/dashboard/git-tn6-wh6/acompanhamento-de-servios?fromUser=false&refresh_mode=sliding&from_ts=1768917393367&to_ts=1769090193367&live=true",
      "title": "Dash Exemplo",
      "backgroundColor": "#000000",
      "allowFullScreen": true
    }
  }
  ```

Observações gerais:

- Todas as props são serializáveis (JSON-safe). Evite passar funções ou valores não-serializáveis na playlist.
- Se uma prop obrigatória estiver ausente, o slide tenta renderizar um placeholder simples (por exemplo, "FOTO" quando `photoAsset` estiver ausente). Ainda assim é recomendável validar o JSON antes de publicar.
- Para adicionar novos tipos de slide: crie `src/slides/NovoSlide.tsx`, exporte o componente e registre em `src/slides/registry.ts` com a chave desejada.

## Boas Práticas de Performance
- **Assets**: Imagens externas (fotos de colaboradores) são pré-carregadas 1 slide antes de aparecerem para evitar "piscas".
- **SVG Leve**: Formas complexas (ondas, arcos) são desenhadas via SVG (`src/components/Shapes.tsx`) ao invés de imagens PNG pesadas.
- **Zero Layout Shift**: O uso do Stage fixo evita que fontes carreguem em tamanhos errados e pulem na tela.

---
Desenvolvido para Minu - Eng. de Software.
