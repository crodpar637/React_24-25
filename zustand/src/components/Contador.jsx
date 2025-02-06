import useContadorStore from '../stores/useContadorStore';

const Contador = () => {
  const { count, increase, decrease } = useContadorStore();
  
  return (
    <div>
      <h5>{count}</h5>
      <button onClick={increase}>➕ Incrementar</button>
      <button onClick={decrease}>➖ Decrementar</button>
    </div>
  );
};

export default Contador;
