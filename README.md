# Espetinho do Zero

Página principal reconstruída com a skill PaginaPro V1 fornecida pelo usuário. Oferta: R$37.

## Estrutura

- Raiz: build estática pronta para hospedagem, com index.html, assets/ e fonts/.
- pagina-de-vendas/: projeto React + Vite, copy, estratégia, manifesto visual e auditoria.
- config.js: links de checkout e dados comerciais, carregados em tempo de execução.
- upsell.html: complemento opcional Operação Espetinho, R$67.
- politicas.html: condições da compra a completar antes da ativação comercial.

## Desenvolvimento

Instale as dependências dentro de pagina-de-vendas com pnpm install --frozen-lockfile. Na raiz, npm run dev abre o projeto. npm run build recompila e sincroniza a build na raiz. O build ignora assets/originais no espelhamento para hospedagem; as amostras originais ficam no projeto fonte.

## Configuração comercial

Preencha checkoutUrl, upsellCheckoutUrl, vendedor, suporte e documento em config.js e também em pagina-de-vendas/public/config.js antes de recompilar. O botão de compra permanece desabilitado sem checkout HTTPS. O hero leva a #previas e os demais CTAs a #oferta; somente o botão da oferta acessa o checkout. UTMs são preservadas.

Não foi conectada a Cakto nem publicada uma página pública por este commit. Confirme garantia, prazo de acesso, suporte e condições legais antes de vender. Os complementos pagos não são bônus gratuitos.

## Conteúdo e imagens

Páginas reais selecionadas do manual e captura real da planilha, compostas em CSS segundo as referências da skill. Não há alegação de uso de modelo de imagem específico. A fotografia da capa é ilustrativa. Receitas e rendimentos exigem lote piloto.

PDFs integrais, planilhas pagas e pacotes de entrega não estão neste repositório público.

## Validação

Build concluída; hero, CTAs, galeria, pausa, FAQ e checkout não configurado conferidos. Larguras 320, 375, 430, 768 e 1440 verificadas sem overflow horizontal. Limites e pendências em pagina-de-vendas/07-auditoria-design.md. Lighthouse e compra real não executados.
