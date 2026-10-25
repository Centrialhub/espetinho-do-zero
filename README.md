# Espetinho do Zero

Página de vendas exclusiva da oferta **Espetinho do Zero — Receitas, Produção e Preço Certo**.

## Executar

Site estático, sem dependências ou etapa de build. Abra `index.html` no navegador ou execute `python3 -m http.server 8080` nesta pasta.

Para hospedagem estática, publique a raiz deste repositório.

## Estrutura

- `index.html`: página principal com a oferta de R$37, calculadora demonstrativa e FAQ.
- `upsell.html`: oferta opcional Operação Espetinho, de R$67.
- `styles.css`: estilos e regras de layout responsivo.
- `app.js`: calculadora, aviso de prévia e redirecionamento ao checkout principal com UTMs.
- `config.js`: configuração dos links da Cakto e identificação do vendedor.
- `politicas.html`: informações da compra e texto-base de privacidade a completar.
- `assets/`: fotografia ilustrativa gerada por IA e marca tipográfica do produto.

## Antes de ativar vendas

1. Preencha `checkoutUrl`, `upsellCheckoutUrl`, `vendedor`, `documento` e `suporte` em `config.js`.
2. Complete `politicas.html` com as condições reais de entrega, suporte, acesso e reembolso.
3. Configure na Cakto o produto principal, o order bump opcional de R$12,90 e o upsell opcional de R$67.
4. Confira as dimensões dos banners nos campos atuais da plataforma e teste compra e entrega por oferta.
5. Faça um lote piloto das receitas e ajuste os rendimentos estimados antes de alegar validação culinária.
6. Confira o layout em celular e desktop na hospedagem escolhida.

Enquanto o link do checkout principal estiver vazio, o botão exibe aviso de prévia. O upsell também não realiza compra sem link configurado. A página não foi publicada por este envio ao GitHub.

## Materiais pagos

PDFs, planilhas comerciais e pacotes de entrega ficam fora deste repositório público. Entregue-os pela área de membros ou pelo acesso controlado da plataforma de vendas. Nunca coloque esses arquivos na raiz pública do site.

## Validação realizada

Sintaxe do JavaScript conferida. A calculadora foi testada no navegador com custos de R$4 e R$8, taxas de 5% e margem de 30%, e bloqueio quando taxas mais margem chegam a 100%. O botão sem checkout mostrou o aviso de prévia. Não houve compra real nem teste de viewport móvel.

Fotografia ilustrativa gerada por IA. Sem depoimentos fictícios, escassez artificial ou garantia de renda.
