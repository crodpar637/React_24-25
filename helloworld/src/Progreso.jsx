// eslint-disable-next-line react/prop-types
function Progreso({valor,color}) {
    return (
        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
            <div className={"progress-bar " + color} style={{ width: valor + '%' }} />
        </div>
    );
}

export default Progreso;