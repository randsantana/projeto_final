import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState } from "react";

const Cadastrar_Barber = () => {
  const { register, handleSubmit, reset} = useForm();
  const [aviso, setAviso] = useState("");

  const salvar = async (campos) => {
    try {
      const response = await api.post("barber/createBarber", campos);
      setAviso(`Barbeiro cadastrado(a) com sucesso!"`);
      reset();
    } catch (error) {
      setAviso("Erro ao cadastrar Barbeiro(a)!");
    }
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100 d-flex align-items-center">
      <div className="container p-5 bg-light text-dark rounded">
        <h4 className="fst-italic mb-3">Cadastrar Barbeiro</h4>
        <form onSubmit={handleSubmit(salvar)}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              autoFocus
              {...register("name")}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="img">Descrição</label>
            <input
              type="text"
              className="form-control"
              id="img"
              required
              {...register("img")}
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary mt-3"
            value="Enviar"
          />
          <input
            type="reset"
            className="btn btn-danger mt-3 ms-3"
            value="Limpar"
          />
        </form>
        <div className="alert mt-3">{aviso}</div>
      </div>
    </div>
  );
};

export default Cadastrar_Barber;