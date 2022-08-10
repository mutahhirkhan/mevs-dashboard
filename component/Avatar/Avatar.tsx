import React from 'react'
import { Avatar as UserAvatar, Image } from 'antd';

const Avatar = () => {
  return (
    <UserAvatar  src={<Image src="https://joeschmoe.io/api/v1/random" />} />

  )
}

export default Avatar