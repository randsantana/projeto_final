import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState } from "react";

const Agendamento = () => {
  const { register, handleSubmit, reset} = useForm();
  const [aviso, setAviso] = useState("");

  const salvar = async (campos) => {
    try {
      const response = await api.post("agenda/createAgenda", campos);
      setAviso(`Agenda cadastrado(a) com sucesso!"`);
      reset();
    } catch (error) {
      setAviso("Erro ao agendar horário(a)!");
    }
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100 d-flex align-items-center">
      <div className="container ">
        <h4 className="fst-italic mb-3">Agenda</h4>
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
          <div className="form-group">
            <label htmlFor="data">Data</label>
            <input
              type="date"
              className="form-control"
              id="data"
              required
              autoFocus
              {...register("data")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hora">Hora</label>
            <input
              type="LocalTime"
              className="form-control"
              id="hora"
              required
              autoFocus
              {...register("hora")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              className="form-control"
              id="telefone"
              required
              autoFocus
              {...register("telefone")}
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

export default Agendamento;