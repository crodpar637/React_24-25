import useContadorV2Store from '../stores/useContadorV2Store';

const ContadorV2 = () => {
  const { count, increase, decrease } = useContadorV2Store();
  
  return (
    <div>
      <h5>{count}</h5>
      <button onClick={increase}>➕ Incrementar</button>
      <button onClick={decrease}>➖ Decrementar</button>
    </div>
  );
};

export default ContadorV2;
