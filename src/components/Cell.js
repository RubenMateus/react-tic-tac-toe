import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';

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

Cell.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Cell;
