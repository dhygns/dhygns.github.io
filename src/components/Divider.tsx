import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'

export const Divider = () => {
  return (
    <div className="divider-custom">
      <div className="divider-custom-line"></div>
      <div className="divider-custom-icon">
        <FontAwesomeIcon icon={faCode}/>
      </div>
      <div className="divider-custom-line"></div>
    </div>
  );
};
