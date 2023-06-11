import Spinner from "../Spinner";

const ButtonMore = ({ clickMore,currentPage, isSpinner }) => {

  if (isSpinner) {
    return <Spinner isVisible={isSpinner} />
  }
  
  return (currentPage >= 10 ? null : <button onClick={clickMore} className="more">Показать еще</button>)
}
  
export default ButtonMore;
