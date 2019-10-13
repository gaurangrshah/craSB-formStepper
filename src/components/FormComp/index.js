import React from 'react'
import FormWrap from './FormWrap.js'
import { views } from '../../db/views'
import { newObject } from './utils/arrObjsConvert'


const FormComp = () => {
  return (
    <FormWrap inputs={newObject(views)} />
  )
}

export default FormComp
