import {useForm} from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "../config_axios";
import ItemLista from "./ItemLista";  

const ManutencaoProduct = () => {
    //servem para manipular os dados do formulário
    const {register, handleSubmit, reset} = useForm();
    //guardar e setar as informações do objeto
    const [Product, setProduct] = useState([]);

    const obterLista = async () => {
        try{
            const lista = await api.get("product/all");
            setProduct(lista.data);
        }catch(error){
            alert(`Erro: ..Não foi possível obter os dados: ${error}`);
        }
    }


//define o método que será executado assim que o componente
// for renderizado
useEffect(() => {
    obterLista();
},[]);

const filtrarLista = async (campos) => {
    try{
        const lista = await api.get(`product/filtro/${campos.palavra}`);
        lista.data.length
        ? setProduct(lista.data)
        : alert("Não há produtos cadastradas com a palavra chave pesquisada");
    }catch(error){
        alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    }
}

const excluir = async(id,name) => {
    if(!window.confirm(`Confirma a exclusão do produto ${name}?`)){
        return;
    }
    try{
        console.log("id é:"+id)
        await api.delete(`product/deleteProduct/${id}`);
        //formar uma nova lista de tarefas sem a tarefa que foi excluida
        setProduct(Product.filter(Product => Product.id !== id));
        location.reload();
    }catch(error){
        alert(`Erro: ..Não foi possível excluir o produto ${name}: ${error}`);
    }
}

//alterar os registros
const alterar = async (id,name,index) => {
    const novoStatus = prompt(`Digite o novo status do produto ${name}`);
    if (novoStatus == "" ) {
        alert('Digite um status válido!(status em branco)')
        return;
    }
    try{//captura os erros 
        //chamando o backend e passando os dados
        await api.put(`product/updateProduct/${id}`,{name: novoStatus});
        const ProductAtualizadas = [...Product];
        const indiceProduct = ProductAtualizadas.find(Product => Product.id === id);
        console.log("indice Produto:"+indiceProduct);
        ProductAtualizadas[indiceProduct.id].name = novoStatus;
        setProduct(ProductAtualizadas);
        obterLista();
        location.reload();
    }catch(error){
        alert(`Erro: ..Não foi possível alterar o produto ${name}: ${error}`);
    }
}

    return (
       <div className="container">
        <div className="row ">
            <div className="col-sm-7 ">
                <h4 className="fst-italic mt-3 ">Manutenção de Produto</h4>
            </div>
            <div className="col-sm-5 ">
                <form onSubmit={handleSubmit(filtrarLista)}>
                    <div className="input-group mt-3">
                        <input type="text" className="form-control" placeholder="Titulo" required {...register("palavra")} />
                        <input type="submit" className="btn btn-primary" value="Pesquisar" />
                        <input type="button" className="btn btn-danger" value="Todos" onClick={()=>{reset({palavra:""});obterLista();}}/>
                    </div>
                </form>
            </div>
        </div>

        <table className="table table-striped mt-3 ">
            <thead>
                <tr>
                    <th>Cód.</th>
                    <th>Corte</th>
                    <th>Descrição</th>
                    <th>Preço</th>
                    <th>Ações</th>
                
                </tr>
            </thead>
            <tbody>
                {Product.map((Product) => (
                    <ItemLista
                        key={Product.id}
                        id={Product.id}
                        name={Product.name}
                        description={Product.description}
                        price={Product.price}
                        excluirClick={()=>excluir(Product.id,Product.name)}
                        alterarClick={()=>alterar(Product.id,Product.name)}
                    />
                ))}
            </tbody>
        </table>

       </div> 
    );
};

export default ManutencaoProduct;