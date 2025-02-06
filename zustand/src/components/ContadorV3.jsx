import useContadorV3Store from '../stores/useContadorV3Store';

const ContadorV3 = () => {
  const { count, increase, decrease } = useContadorV3Store();
  
  return (
    <div>
      <h5>{count}</h5>
      <button onClick={increase}>➕ Incrementar</button>
      <button onClick={decrease}>➖ Decrementar</button>
    </div>
  );
};

export default ContadorV3;
