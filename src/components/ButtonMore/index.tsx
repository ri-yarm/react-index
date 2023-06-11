import Spinner from "../Spinner";

type buttonMoreProps = {
  clickMore: () => void;
  currentPage: number;
  isSpinner: boolean
};

const ButtonMore: React.FC<buttonMoreProps> = ({ clickMore,currentPage, isSpinner }) => {

  if (isSpinner) {
    return <Spinner isVisible={isSpinner} />
  }
  
  return (currentPage >= 10 ? null : <button onClick={clickMore} className="more">Показать еще</button>)
}
  
export default ButtonMore;
