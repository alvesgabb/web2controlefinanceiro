//Funções das rotas

let transacoes=[]
let nextId= 1 


//GET
function getAll(req, res) {
  console.log("GET /transacoes -> retornando lista de trasacoes");
  return res.status(200).json(transacoes);
}


//POST 
function create(req,res){
const { descricao, tipo, data, valor } = req.body;

  
  if (!descricao || !tipo || !data || valor == null) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

    const transacao = { id : nextId++,
     descricao: descricao, 
     tipo : tipo,
     data: data,
     valor: valor };

  
  transacoes.push(transacao);

  console.log("Transação adicionada:", transacao);
  return res.status(201).json(transacao);
}

//DELETE deteletar por id
function deleteId(req,res){
  const id = Number(req.params.id);
  console.log(`DELETE /transacoes/${id} -> remover transacao`);

  const index = transacoes.findIndex(u => u.id === id);
  if (index === -1) {
    console.log(`DELETE /transacoes/${id} -> não encontrado`);
    return res.status(404).json({ erro: "Transação não encontrado" });
  }

  transacoes.splice(index, 1);
  console.log(`DELETE /transacoes/${id} -> removido. restantes:`, transacoes.length);
  // 204 No Content é apropriado para DELETE bem-sucedido sem corpo
  return res.status(204).send();

}

//GET Saldo
function getSaldo(req,res){
  const entradas = transacoes
  .filter(t=>t.tipo ==="entrada")
  .reduce((total,t)=>total+t.valor,0)

  const saidas = transacoes
  .filter(t=>t.tipo === "saida")
  .reduce((total,t)=>total+t.valor,0)
  const saldo = entradas-saidas;

  return res.json({
    entrada:entradas,
    saida: saidas,
    saldo: saldo

  })


}

module.exports = {
  getAll,
  create,
  deleteId,
  getSaldo
}
