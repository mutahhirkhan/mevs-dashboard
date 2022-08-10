import { Switch } from 'antd'
import React from 'react'

const Toggle = ({onChange}: any) => {
  return (
    <Switch onChange={onChange} defaultChecked checkedChildren="Ethereum" unCheckedChildren="Polygon" />

  )
}

export default Toggle