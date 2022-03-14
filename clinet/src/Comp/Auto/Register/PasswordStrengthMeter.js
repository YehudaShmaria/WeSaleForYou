import React, { useEffect } from 'react';
import zxcvbn from 'zxcvbn';

const PasswordStrengthMeter = (props) => {
  const testResult = zxcvbn(props.password);
  const num = testResult.score * 100/4;

  useEffect(()=>
  {
    if(num >= 75)
    {
      props.setStatus(true);
    }
    else
      props.setStatus(false);
  },[num])

  const createPassLabel = () => {
    switch(testResult.score) {
      case 0:
        return 'Very weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fear';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  }

  const funcProgressColor = () => {
    switch(testResult.score) {
      case 0:
        return '#828282';
      case 1:
        return '#EA1111';
      case 2:
        return '#FFAD00';
      case 3:
        return '#9bc158';
      case 4:
        return '#00b500';
      default:
        return 'none';
    }
  }

  const changePasswordColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: '7px'
  })

  return (
    <>
      <div style={{textAlign:"right"}} className="progress" style={{ height: '7px' }}>
        <div className="progress-bar" style={changePasswordColor()}></div>
      </div>
      <p style={{ color: funcProgressColor() }}>{createPassLabel()}</p>
    </>
  )
}

export default PasswordStrengthMeter
