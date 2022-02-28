import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

export interface IDividerProps {
  className?: string;
}

export const Divider = (props: IDividerProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <div className="divider-custom">
        <div className="divider-custom-line"></div>
        <div className="divider-custom-icon">
          <FontAwesomeIcon icon={faCode} />
        </div>
        <div className="divider-custom-line"></div>
      </div>
    </div>
  );
};
