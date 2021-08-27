import React from 'react';

const SelectInputComponent = ({
  containerRef,
  birthDate,
  setDate,
  changeBorder,
  changeBorder2,
  OptionArr,
  smallText,
  classname,
}) => {
  return (
    <div className={classname} ref={containerRef}>
      <small>{smallText}</small>
      <select
        className='Months'
        name='months'
        value={birthDate}
        onChange={(e) => setDate(e.target.value)}
        onFocus={() => changeBorder(containerRef)}
        onBlur={() => changeBorder2(containerRef)}
      >
        {OptionArr.map((mnth, i) => (
          <option key={i} value={mnth}>
            {mnth}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInputComponent;
