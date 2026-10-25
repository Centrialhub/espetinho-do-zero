import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const dist=path.join(root,'pagina-de-vendas/dist');
const copy=async(source,target)=>{
 await fs.mkdir(target,{recursive:true});
 for(const e of await fs.readdir(source,{withFileTypes:true})){
  if(e.name==='originais')continue;
  const s=path.join(source,e.name),t=path.join(target,e.name);
  if(e.isDirectory())await copy(s,t);else await fs.copyFile(s,t);
 }
};
await copy(dist,root);
console.log('Build sincronizada na raiz. PDFs e planilhas pagos não são copiados.');
