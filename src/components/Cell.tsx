import { css } from "@emotion/css";

const Cell = ({ value, onClick }) => (
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
