const cfg = typeof window !== 'undefined' ? (window.OFERTA || {}) : {};
export const comercial = {
 price: 'R$37,00', checkoutUrl: cfg.checkoutUrl || '',
 access: 'Entrega digital pela Cakto após aprovação do pagamento. Confira o prazo de liberação no checkout.',
 guarantee: '', supportEmail: cfg.suporte || '', company: cfg.vendedor || '', document: cfg.documento || '',
 valueStack: [
 ['Manual com 12 receitas e orientações de preparo', 'Incluído'],
 ['Fichas, listas de compra e checklist', 'Incluído'],
 ['Planilha de precificação, compras, combos e produção', 'Incluído']
 ]
};
