import { css } from "@emotion/css";

type CellProps = {
  value: string | null;
  onClick: () => void;
};

const Cell = ({ value, onClick }: CellProps) => (
  <div
    className={css`
      background-color: #fff;
      width: 100px;
      height: 100px;
    `}
  >
    <button
      type="button"
      onClick={onClick}
      className={css`
        width: 100%;
        height: 100%;
      `}
    >
      {value}
    </button>
  </div>
);

export default Cell;
